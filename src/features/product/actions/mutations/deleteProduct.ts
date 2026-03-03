"use server";

import { revalidatePath } from "next/cache";

import { NotificationFormStates } from "@/features/product/types/globalTypes";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to delete a product and all related articles and color connections.
 * Uses a transaction to ensure atomicity.
 */
export async function deleteProductAction(
  productId: number,
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
    await prisma.$transaction(async (tx) => {
      // Delete all related color connections first
      await tx.productColor.deleteMany({
        where: { productId },
      });

      // Delete all related articles
      await tx.article.deleteMany({
        where: { productId },
      });

      // Delete the product itself
      await tx.product.delete({
        where: { productId },
      });
    });

    revalidatePath("/dashboard");

    return {
      message: "Produkt und alle zugehörigen Daten erfolgreich gelöscht.",
      success: true,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Produkt konnte nicht gelöscht werden: ${message}`,
    };
  }
}
