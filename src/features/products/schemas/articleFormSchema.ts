import { z } from "zod";

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
