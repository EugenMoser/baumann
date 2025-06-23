import { z } from "zod";

const PasswordFormSchema = z.object({
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

export const ProductDetailsFormSchema = z.object({
  category: z.enum(["moebel", "halterung", "wasser", "lueftung", "elektro"], {
    required_error: "Kategorie ist erforderlich.",
  }),
  productPrio: z
    .number({ required_error: "Produktprio ist erforderlich." })
    .positive("Produktprio muss mindestens 100 sein.")
    .int("Produktprio muss eine ganze Zahl sein.")
    .gte(100, "Produktprio muss mindestens 100 sein.")
    .lte(9999999, "Produktprio darf maximal 9999999 sein."),
  productName: z.string().trim().min(1, "Produktname ist erforderlich."),
  descriptionProduct1: z.string().trim().nullable(),
  descriptionProduct2: z.string().trim().nullable(),
  descriptionProduct3: z.string().trim().nullable(),
  descriptionProduct4: z.string().trim().nullable(),
  material: z.string().trim().min(1, "Material ist erforderlich."),
});

export const ImageSmallFormSchema = z.object({
  imageSmall: z
    .custom(
      (file) =>
        file && typeof file === "object" && "type" in file && "size" in file,
      {
        message: "Bitte lade ein Bild hoch.",
      },
    )
    // validate image file type
    .refine((file: any) => file?.type === "image/webp", {
      message: "Nur .webp Bilddateien sind erlaubt.",
    })
    // validate image file size
    .refine((file: any) => file?.size <= 5 * 1024 * 1024, {
      message: "Bild ist zu groß (max. 5MB).",
    }),
});

export const ArticleDetailsFormSchema = z.object({
  articlePrio: z
    .number()
    .int("Die Priorität muss eine ganze Zahl sein.")
    .positive(),

  articleName: z.string().trim().min(1, "Produktname ist erforderlich."),
  descriptionArticle1: z.string().trim().optional(),
  descriptionArticle2: z.string().trim().optional(),
  descriptionArticle3: z.string().trim().optional(),
  descriptionArticle4: z.string().trim().optional(),
  vpe1: z.string().trim(),
  vpe2: z.string().trim(),
  vpe3: z.string().trim(),
  vpe4: z.string().trim(),
});
