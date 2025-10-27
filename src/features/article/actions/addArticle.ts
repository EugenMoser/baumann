"use server";

import { ArticleDetailsFormSchema } from "@/features/article";
import {
  ArticleFormDataProps,
  ArticleNotificationFormStates,
} from "@/features/article/types";
import createTimestamps from "@/lib/helpers/createTimestamps";
import { requireAuth } from "@/lib/helpers/requireAuth";

// ********************* article details actions *********************

export async function addArticleAction(
  productId: number,
  previousState: ArticleNotificationFormStates,
  formData: FormData,
): Promise<ArticleNotificationFormStates> {
  // Require authentication
  try {
    await requireAuth();
  } catch (error) {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  //* ------create timestamp
  // create timestamps for product, article and color
  const timestamps = createTimestamps("Article");
  // *------get form data
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
  // *----- validated article fields
  const validatedArticleFields = ArticleDetailsFormSchema.safeParse({
    ...articleFormData,
  });

  const articleErrors = !validatedArticleFields.success && {
    ...validatedArticleFields.error.flatten().fieldErrors,
  };

  // *------return errors if validation fails
  if (articleErrors) {
    return {
      success: false,
      errors: articleErrors || {},
      globalError: "Artikel konnte nicht hinzugefügt werden.",
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
  } = validatedArticleFields.data!;

  // *------add article to database
  try {
    // await prisma.article.create({
    //   data: {
    console.log({
      productId: productId,
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
      createdAt: timestamps.createdAtProduct,
      updatedAt: timestamps.updatedAtProduct,
      // },
    });

    console.info("Article details successfully saved in the database.");
    return { message: "Artikel erfolgreich hinzugefügt", success: true };
  } catch (error: any) {
    console.error("Errors due to adding article details:", error);
    return {
      success: false,
      globalError: `Artikel konnten nicht gespeichert werden. Bitte versuche es erneut: ${error.message}`,
    };
  }
}
