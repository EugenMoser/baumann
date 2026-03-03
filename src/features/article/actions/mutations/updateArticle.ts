"use server";

import { revalidatePath } from "next/cache";

import { ArticleDetailsFormSchema } from "@/features/article";
import {
  ArticleFormDataProps,
  ArticleNotificationFormStates,
} from "@/features/article/types";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to update an existing article.
 * Validates form data and updates the article in the database.
 */
export async function updateArticleAction(
  articleId: string,
  previousState: ArticleNotificationFormStates,
  formData: FormData,
): Promise<ArticleNotificationFormStates> {
  try {
    await requireAuth();
  } catch {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  const articleFormData: ArticleFormDataProps = {
    articlePrio: Number(formData.get("articlePrio")),
    articleNumber: formData.get("articleNumber") as string,
    articleName: formData.get("articleName") as string,
    descriptionArticle1:
      (formData.get("descriptionArticle1") as string) || undefined,
    descriptionArticle2:
      (formData.get("descriptionArticle2") as string) || undefined,
    descriptionArticle3:
      (formData.get("descriptionArticle3") as string) || undefined,
    descriptionArticle4:
      (formData.get("descriptionArticle4") as string) || undefined,
    vpe1: (formData.get("vpe1") as string) || undefined,
    vpe2: (formData.get("vpe2") as string) || undefined,
    vpe3: (formData.get("vpe3") as string) || undefined,
    vpe4: (formData.get("vpe4") as string) || undefined,
  };

  const validated = ArticleDetailsFormSchema.safeParse(articleFormData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      globalError: "Validierung fehlgeschlagen.",
    };
  }

  const {
    articlePrio,
    articleNumber,
    articleName,
    descriptionArticle1,
    descriptionArticle2,
    descriptionArticle3,
    descriptionArticle4,
    vpe1,
    vpe2,
    vpe3,
    vpe4,
  } = validated.data;

  try {
    await prisma.article.update({
      where: { id: articleId },
      data: {
        prio: articlePrio,
        number: articleNumber,
        name: articleName,
        description1: descriptionArticle1,
        description2: descriptionArticle2,
        description3: descriptionArticle3,
        description4: descriptionArticle4,
        vpe1: vpe1?.toString() || "",
        vpe2: vpe2?.toString() || "",
        vpe3: vpe3?.toString() || "",
        vpe4: vpe4?.toString() || "",
      },
    });

    revalidatePath("/dashboard");

    return { message: "Artikel erfolgreich aktualisiert.", success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Artikel konnte nicht aktualisiert werden: ${message}`,
    };
  }
}
