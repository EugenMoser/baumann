"use server";

import { AuthError } from "next-auth";
import { signIn } from "src/auth";

import { FormPasswordStates } from "@/types/formProps";

import { LoginFormSchema } from "../schemas/loginFormSchema";

export async function loginAction(
  previousState: FormPasswordStates,
  formData: FormData,
): Promise<FormPasswordStates> {
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

  // Check if user exists in database
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
