"use server";
import bcrypt from "bcryptjs";

import { isTokenValid, PasswordResetFormSchema } from "@/features/auth";
import { FormPasswordStates } from "@/features/auth/types";
import { prisma } from "@/lib/prisma";
import { PasswordReset } from "@prisma/client";

export async function passwordReset(
  previousState: FormPasswordStates,
  formData: FormData,
): Promise<FormPasswordStates> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const validatedFields = PasswordResetFormSchema.safeParse({
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
