"use server";

import { revalidatePath } from "next/cache";

import {
  ProductFormDataProps,
  ProductNotificationFormStates,
} from "@/features/product/types";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

import { ProductDetailsFormSchema } from "../../schema/productSchema";

/**
 * Server Action to update an existing product.
 * Validates form data and updates the product in the database.
 */
export async function updateProductAction(
  productId: number,
  previousState: ProductNotificationFormStates,
  formData: FormData,
): Promise<ProductNotificationFormStates> {
  try {
    await requireAuth();
  } catch {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  const productFormData: ProductFormDataProps = {
    category: formData.get("category") as ProductFormDataProps["category"],
    productPrio: Number(formData.get("productPrio")),
    productName: formData.get("productName") as string,
    descriptionProduct1:
      (formData.get("descriptionProduct1") as string) || null,
    descriptionProduct2:
      (formData.get("descriptionProduct2") as string) || null,
    descriptionProduct3:
      (formData.get("descriptionProduct3") as string) || null,
    descriptionProduct4:
      (formData.get("descriptionProduct4") as string) || null,
    material: formData.get("material") as string,
  };

  const validated = ProductDetailsFormSchema.safeParse(productFormData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      globalError:
        "Validierung fehlgeschlagen. Bitte überprüfen Sie alle Felder.",
    };
  }

  const {
    category,
    productPrio,
    productName,
    descriptionProduct1,
    descriptionProduct2,
    descriptionProduct3,
    descriptionProduct4,
    material,
  } = validated.data;

  try {
    await prisma.product.update({
      where: { productId },
      data: {
        category,
        prio: productPrio,
        name: productName,
        description1: descriptionProduct1,
        description2: descriptionProduct2,
        description3: descriptionProduct3,
        description4: descriptionProduct4,
        material,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/products/${category}`);

    return {
      message: "Produkt erfolgreich aktualisiert.",
      success: true,
      productId,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Produkt konnte nicht aktualisiert werden: ${message}`,
    };
  }
}
