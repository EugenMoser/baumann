"use server";

import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { AuthError } from "next-auth";
import nodemailer from "nodemailer";
import { signIn } from "src/auth";

import { prisma } from "@/lib/prisma";
import { FormState } from "@/types/FormState";
import {
  Admin,
  PasswordReset,
} from "@prisma/client";

import isTokenValid from "./helpers/isTokenValid";
import {
  LoginFormSchema,
  PasswordRequestForm,
  PasswordResetForm,
} from "./schemas";

// ********************* login actions *********************

//todo: add in database.ts
export async function loginAction(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Login fehlgeschlagen.",
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const result: any = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (result?.error) {
      return {
        message: "Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.",
      };
    }
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message:
              "Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.",
          };
        default:
          return { message: "Etwas ist schief gelaufen!" };
      }
    }

    throw error;
  }
  return { message: "Login erfolgreich", actionSuccess: true };
}

// ********************* password actions *********************

export async function passwordRequestAction(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = PasswordRequestForm.safeParse({
    email: formData.get("email"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
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
    //if user not found return undefined
    if (!user) {
      //todo passende Nachricht zurueckgeben
      return {
        message:
          "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet. muss später entfernt werden -->>(!!!!!!!kein User gefunden)",
        actionSuccess: true,
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
        expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 min valid
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
    actionSuccess: true,
  };
}

export async function passwordResetAction(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = PasswordResetForm.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // if form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Passwort konnte nicht zurückgesetzt werden.",
    };
  }
  const { token, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      message: "Passwörter stimmen nicht überein.",
    };
  }

  let resetEntry: PasswordReset | null = null;

  try {
    // check if token is valid
    resetEntry = await prisma.passwordReset.findUnique({
      where: { token },
    });

    // if token is not valid
    if (!resetEntry || !isTokenValid(resetEntry.expiresAt)) {
      return { message: "Token ist ungültig oder abgelaufen." };
    }
  } catch (error) {
    console.error("Faild to find token :", error);
    throw new Error("Interner Serverfehler");
  }

  try {
    // update password at database collection admin
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.update({
      where: { email: resetEntry.email },
      data: { password: hashedPassword },
    });
  } catch (error) {
    console.error("Faild to update password:", error);
    throw new Error("Interner Serverfehler");
  }

  try {
    // delete database entry (and token)
    await prisma.passwordReset.delete({ where: { token } });
  } catch (error) {
    console.error("Faild to delete token:", error);
    throw new Error("Interner Serverfehler");
  }
  return {
    message: "Passwort erfolgreich zurückgesetzt!",
    actionSuccess: true,
  };
}
