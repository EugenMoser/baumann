import { z } from "zod";

export const ColorDetailsFormSchema = z.object({
  colorId: z.string().trim().min(1, "Farben - ID ist erforderlich."),
  colorName: z.string().trim().min(1, "Farbname ist erforderlich."),
  colorCode: z
    .string()
    .trim()
    .min(1, "Farbcode ist erforderlich.")
    .regex(/^#/, "Code must start with #."),
  colorSuffix: z
    .number()
    .min(1, "Farb-Suffix muss mindestens 1 sein.")
    .optional(),
});
