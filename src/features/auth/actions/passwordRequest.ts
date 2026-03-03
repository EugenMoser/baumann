"use server";

import nodemailer from "nodemailer";

import { resetPasswordUrl } from "@/constants/config";
import { FormPasswordStates, PasswordRequestFormSchema } from "@/features/auth";
import { prisma } from "@/lib/prisma";
import { Admin } from "@prisma/client";

/**
 * Generates a cryptographically secure hex token using the Web Crypto API.
 * Compatible with both Node.js and Edge runtimes.
 */
function generateResetToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function passwordRequest(
  previousState: FormPasswordStates,
  formData: FormData,
): Promise<FormPasswordStates> {
  const validatedFields = PasswordRequestFormSchema.safeParse({
    email: formData.get("email"),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Link konnte nicht angefordert werden.",
    };
  }
  const { email } = validatedFields.data;

  try {
    const user: Admin | null = await prisma.admin.findUnique({
      where: { email },
    });

    // Return generic message regardless of whether user exists (security best practice)
    if (!user) {
      return {
        message:
          "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet.",
        actionSuccess: true,
      };
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Interner Serverfehler");
  }

  // Generate token using Web Crypto API (edge-compatible)
  const resetToken = generateResetToken();

  try {
    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 min valid
      },
    });
  } catch (error) {
    console.error("Failed to create reset token:", error);
    throw new Error("Interner Serverfehler");
  }

  // Set up email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL_SCHEN,
      pass: process.env.GMAIL_PASSWORD_SCHEN,
    },
  });

  // Create reset link with token
  const resetLink = `${resetPasswordUrl}${resetToken}`;

  try {
    // Send email with reset link to authorised user
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL_SCHEN,
      to: email,
      subject: "Passwort zurücksetzen",
      html: `<p>Klicke auf diesen <a href="${resetLink}">Link</a>, um dein Passwort zurückzusetzen.</p>`,
    });
  } catch (error) {
    console.error("Failed to send reset email:", error);
    throw new Error("Interner Serverfehler");
  }

  return {
    message: "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet.",
    actionSuccess: true,
  };
}
