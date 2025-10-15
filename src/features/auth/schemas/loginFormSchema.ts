import { PasswordFormSchema } from "./passwordSchema";

export const LoginFormSchema = PasswordFormSchema.pick({
  email: true,
  password: true,
});
