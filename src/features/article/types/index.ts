import { z } from "zod";

import { ArticleDetailsFormSchema } from "@/features/article";
import { NotificationFormStates } from "@/features/product/types/globalTypes";
import { Article } from "@prisma/client";

export type ArticleProps = Article;

export type ArticleFormDataProps = z.infer<typeof ArticleDetailsFormSchema>;

export type ArticleFormFieldErrors = {
  articlePrio?: string[];
  articleNumber?: string[];
  articleName?: string[];
  descriptionArticle1?: string[];
  descriptionArticle2?: string[];
  descriptionArticle3?: string[];
  descriptionArticle4?: string[];
  vpe1?: string[];
  vpe2?: string[];
  vpe3?: string[];
  vpe4?: string[];
};

export type ArticleNotificationFormStates = NotificationFormStates & {
  errors?: ArticleFormFieldErrors; // field specific errors
};
