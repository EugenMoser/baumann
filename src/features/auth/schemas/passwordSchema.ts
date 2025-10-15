import { z } from "zod";

export const PasswordFormSchema = z.object({
  token: z.string(),
  email: z.coerce
    .string()
    .trim()
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z
    .string()
    .trim()
    .min(6, "Passwort muss mindestens 6 Zeichen lang sein."),
  confirmPassword: z
    .string()
    .trim()
    .min(6, "Passwort muss mindestens 6 Zeichen lang sein."),
});

export const PasswordRequestForm = PasswordFormSchema.pick({
  email: true,
});
export const PasswordResetForm = PasswordFormSchema.omit({
  email: true,
});
