import { z } from "zod";

export const ColorDetailsFormSchema = z.object({
  colorId: z.string().trim().min(1, "Farben - ID ist erforderlich."),
  colorName: z.string().trim().min(1, "Farbname ist erforderlich."),
  colorCode: z
    .string()
    .trim()
    .min(1, "Farbcode ist erforderlich.")
    .regex(
      /^#[0-9a-fA-F]{6}$/,
      "Farbcode muss im Format HEX-Format sein (z.B. #FF5733).",
    ),
  colorSuffix: z
    .number()
    .min(0, "Farb-Suffix muss mindestens 0 sein.")
    .optional(),
});
