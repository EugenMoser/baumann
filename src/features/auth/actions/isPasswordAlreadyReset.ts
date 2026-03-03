import { isTokenValid } from "@/features/auth";
import { prisma } from "@/lib/prisma";
import { PasswordReset } from "@prisma/client";

// ********************* check password reset *********************

export async function isPasswordAlreadyReset(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  let data: PasswordReset | null = null;
  try {
    data = await prisma.passwordReset.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error("Fehler:", error);
    return false;
  }
  //if token is not found return false
  if (!data) return false;

  //if expiresAt is older than now return false
  return isTokenValid(data.expiresAt);
}
