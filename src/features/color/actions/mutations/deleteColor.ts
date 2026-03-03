"use server";

import { revalidatePath } from "next/cache";

import { NotificationFormStates } from "@/features/product/types/globalTypes";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to delete a color.
 * Checks that the color is not linked to any products before deleting.
 */
export async function deleteColor(
  colorId: string,
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
    // Check if color is linked to any products
    const linkedProducts = await prisma.productColor.count({
      where: { colorId },
    });

    if (linkedProducts > 0) {
      return {
        success: false,
        globalError:
          "Diese Farbe ist noch mit Produkten verknüpft und kann nicht gelöscht werden. Bitte entfernen Sie zuerst die Verknüpfungen.",
      };
    }

    await prisma.color.delete({
      where: { colorId },
    });

    revalidatePath("/dashboard");

    return {
      message: "Farbe erfolgreich gelöscht.",
      success: true,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Farbe konnte nicht gelöscht werden: ${message}`,
    };
  }
}
