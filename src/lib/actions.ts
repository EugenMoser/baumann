"use server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma";
import { Admin } from "@prisma/client";

//todo: zod schema implementiert, noch testen....

const PasswordFormSchema = z.object({
  token: z.string(),
  email: z.coerce.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string(),
  expiresAt: z.date(),
});

const PasswordRequest = PasswordFormSchema.omit({
  token: true,
  password: true,
  expiresAt: true,
});
const PasswordReset = PasswordFormSchema.omit({
  email: true,
  expiresAt: true,
});

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message: string;
  redirect: boolean;
};

// ********************* password actions *********************

export async function passwordRequest(
  previousState: State,
  formData: FormData,
) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = PasswordRequest.safeParse({
    email: formData.get("email"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Link konnte nicht angefordert werden.",
      redirect: false,
    };
  }
  const { email } = validatedFields.data;

  try {
    const user: Admin | null = await prisma.admin.findUnique({
      where: { email },
    });
    //if user not found return undefined
    if (!user) {
      //todo passende Nachricht zurueckgeben
      return {
        message:
          "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet. muss später entfernt werden -->>(!!!!!!!kein User gefunden)",
        redirect: true,
      };
    }
  } catch (error) {
    console.error("Failed to fetch user:");
    throw new Error("Interner Serverfehler");
  }

  // generate token
  const resetToken = randomBytes(32).toString("hex");

  try {
    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
        expiresAt: new Date(Date.now() + 600000), // 10 min valid
      },
    });
  } catch (error) {
    console.error("Failed to create reset token:", error);
    throw new Error("Interner Serverfehler");
  }

  // generate email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL_SCHEN,
      pass: process.env.GMAIL_PASSWORD_SCHEN,
    },
  });

  //create reset link with token
  const resetLink = `http://localhost:3000/password-reset?token=${resetToken}`;

  try {
    // send email with reset link to authorised user
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL_SCHEN,
      to: email,
      subject: "Passwort zurücksetzen",
      html: `<p>Klicke auf diesen <a href="${resetLink}">Link</a>, um dein Passwort zurückzusetzen.</p>`,
    });
    //todo passende Nachricht zurueckgeben
  } catch (error) {
    console.error("Failed to send reset email:", error);
    throw new Error("Interner Serverfehler");
  }

  return {
    message:
      "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet. muss später entfernt werden -->>(!!!!!!! User gefunden und reset mail gesendet)",
    redirect: true,
  };
}

export async function passwordReset(
  previousState: string | null | undefined,
  formData: FormData,
) {
  try {
    const { token, password } = PasswordReset.parse({
      token: formData.get("token"),
      password: formData.get("password"),
    });

    console.log("token", token, "password", password);
    // if token or password is missing
    if (!password) {
      return "Passwort erforderlich.";
    }
    if (!token) {
      return "Die Gültigkeit des Links ist bereits abgelaufen.";
    }

    // check if token is valid
    const resetEntry = await prisma.passwordReset.findUnique({
      where: { token },
    });

    //if token is not valid
    if (!resetEntry || resetEntry.expiresAt < new Date()) {
      return "Token ist ungültig oder abgelaufen.";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // update password at database collection admin
    await prisma.admin.update({
      where: { email: resetEntry.email },
      data: { password: hashedPassword },
    });

    // delete database entry (and token)
    await prisma.passwordReset.delete({ where: { token } });

    return "Passwort erfolgreich zurückgesetzt!";
  } catch (error) {
    console.error("Fehler:", error);
    return "Interner Serverfehler";
  }
}

export async function isPasswordAlreadyReset(token: string) {
  try {
    const tokenExists: boolean =
      (await prisma.passwordReset.findUnique({
        where: { token },
      })) !== null;

    return tokenExists;
  } catch (error) {
    console.error("Fehler:", error);
    return false;
  }
}
