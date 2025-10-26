import { z } from "zod";

import { ArticleDetailsFormSchema } from "@/features/article";
import { Article } from "@prisma/client";

export type ArticleProps = Article;

export type ArticleFormDataProps = z.infer<typeof ArticleDetailsFormSchema>;
