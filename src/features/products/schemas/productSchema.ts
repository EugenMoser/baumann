import { z } from "zod";

export const ProductDetailsFormSchema = z.object({
  category: z.enum(["moebel", "halterung", "wasser", "lueftung", "elektro"], {
    required_error: "Kategorie ist erforderlich.",
  }),
  productPrio: z
    .number({ required_error: "Produktprio ist erforderlich." })
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
