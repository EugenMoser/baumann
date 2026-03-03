import { z } from "zod";

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
