"use server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/db/prisma";

export async function passwordRequest(
  previousState: string | null | undefined,
  formData: FormData,
) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const email = formData.get("email") as string;
  try {
    if (email) {
      // find authorised user
      const user = await prisma.admin.findUnique({ where: { email } });

      // if authorised user not found
      if (!user) {
        //todo passende Nachricht zurueckgeben

        return "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet. (!!!!!!!kein User gefunden)";
      }

      // generate token
      const resetToken = randomBytes(32).toString("hex");

      await prisma.passwordReset.create({
        data: {
          email,
          token: resetToken,
          expiresAt: new Date(Date.now() + 600000), // 10 min valid
        },
      });

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

      // send email with reset link to authorised user
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL_SCHEN,
        to: email,
        subject: "Passwort zurücksetzen",
        html: `<p>Klicke auf diesen <a href="${resetLink}">Link</a>, um dein Passwort zurückzusetzen.</p>`,
      });
      //todo passende Nachricht zurueckgeben

      return "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet. (!!!!!!! User gefunden und reset mail gesendet)";
    }
  } catch (error: any) {
    //todo passende Nachricht zurueckgeben

    console.error("Fehler:", error);
    throw new Error("Fehler beim Senden der E-Mail", error);
  }
}

export async function passwordReset(
  previousState: string | null | undefined,
  formData: FormData,
) {
  try {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;

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
