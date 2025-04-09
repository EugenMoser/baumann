import { z } from "zod";

const PasswordFormSchema = z.object({
  token: z.string(),
  email: z.coerce.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein."),
  confirmPassword: z
    .string()
    .min(6, "Passwort muss mindestens 6 Zeichen lang sein."),
});
export const LoginFormSchema = PasswordFormSchema.pick({
  email: true,
  password: true,
});
export const PasswordRequestForm = PasswordFormSchema.pick({
  email: true,
});
export const PasswordResetForm = PasswordFormSchema.omit({
  email: true,
});
