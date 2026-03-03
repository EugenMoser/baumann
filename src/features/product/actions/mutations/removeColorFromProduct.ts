"use server";

import { revalidatePath } from "next/cache";

import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Removes a color connection from a product.
 */
export async function removeColorFromProductAction(
  productId: number,
  colorId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { success: false, error: "Nicht autorisiert." };
  }

  try {
    await prisma.productColor.deleteMany({
      where: { productId, colorId },
    });

    revalidatePath(`/dashboard/products/${productId}`);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    return { success: false, error: message };
  }
}
