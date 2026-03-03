"use server";

import { revalidatePath } from "next/cache";

import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Adds a color connection to an existing product.
 */
export async function addColorToProductAction(
  productId: number,
  colorId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { success: false, error: "Nicht autorisiert." };
  }

  try {
    // Determine next colorSuffix index
    const existingCount = await prisma.productColor.count({
      where: { productId },
    });

    await prisma.productColor.create({
      data: { productId, colorId, colorSuffix: existingCount },
    });

    revalidatePath(`/dashboard/products/${productId}`);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    return { success: false, error: message };
  }
}
