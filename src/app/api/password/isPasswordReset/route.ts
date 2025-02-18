import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const tokenExists: boolean =
      (await prisma.passwordReset.findUnique({
        where: { token },
      })) !== null;

    return NextResponse.json({ isPasswordReset: tokenExists }, { status: 200 });
  } catch (error) {
    console.error("Fehler:", error);
    return NextResponse.json(
      { message: "Interner Serverfehler" },
      { status: 500 },
    );
  }
}
