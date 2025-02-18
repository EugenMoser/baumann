import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // if token or password is missing
    if (!token || !password) {
      return NextResponse.json(
        { message: "Token und Passwort erforderlich." },
        { status: 400 },
      );
    }

    // check if token is valid
    const resetEntry = await prisma.passwordReset.findUnique({
      where: { token },
    });

    //if token is not valid
    if (!resetEntry || resetEntry.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Token ist ungültig oder abgelaufen." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // update password at database collection admin
    await prisma.admin.update({
      where: { email: resetEntry.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({ where: { token } });

    return NextResponse.json(
      { message: "Passwort erfolgreich zurückgesetzt!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fehler:", error);
    return NextResponse.json(
      { message: "Interner Serverfehler" },
      { status: 500 },
    );
  }
}
