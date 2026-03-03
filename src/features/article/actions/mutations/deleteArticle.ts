"use server";

import { revalidatePath } from "next/cache";

import { NotificationFormStates } from "@/features/globalTypes";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to delete an article.
 * Ensures that the product retains at least one article.
 */
export async function deleteArticle(
  articleId: string,
): Promise<NotificationFormStates> {
  try {
    await requireAuth();
  } catch {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  try {
    // First, get the article to find its productId
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return {
        success: false,
        globalError: "Artikel nicht gefunden.",
      };
    }

    // Check how many articles this product has
    const articleCount = await prisma.article.count({
      where: { productId: article.productId },
    });

    // A product must always have at least 1 article
    if (articleCount <= 1) {
      return {
        success: false,
        globalError:
          "Dieser Artikel kann nicht gelöscht werden, da das Produkt mindestens einen Artikel haben muss.",
      };
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: articleId },
    });

    revalidatePath("/dashboard");

    return {
      message: "Artikel erfolgreich gelöscht.",
      success: true,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Artikel konnte nicht gelöscht werden: ${message}`,
    };
  }
}
