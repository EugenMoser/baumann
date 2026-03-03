"use server";

import { prisma } from "@/lib/prisma";
import { Admin } from "@prisma/client";

// ********************* get admin *********************

export async function getAdminByEmail(email: string) {
  let admin: Admin | null = null;
  try {
    admin = await prisma.admin.findUnique({
      where: {
        email: email as string,
      },
    });
  } catch (error) {
    console.error("Keinen Admin gefunden:", error);
    return null;
  }
  if (!admin) return null;

  return admin;
}
