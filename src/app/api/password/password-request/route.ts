import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (email) {
      // reset link send
      const user = await prisma.admin.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json(
          {
            message:
              "Falls deine Email berechtigt ist, wurde eine Nachricht gesendet.",
          },
          { status: 200 },
        );
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

      const resetLink = `http://localhost:3000/password-reset?token=${resetToken}`;

      // send email
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL_SCHEN,
        to: email,
        subject: "Passwort zurücksetzen",
        html: `<p>Klicke auf diesen <a href="${resetLink}">Link</a>, um dein Passwort zurückzusetzen.</p>`,
      });

      return NextResponse.json(
        {
          message:
            "Falls deine Email existiert, wurde eine Nachricht gesendet. 222",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Fehler:", error);
    return NextResponse.json(
      { message: "Interner Serverfehler" },
      { status: 500 },
    );
  }
}
