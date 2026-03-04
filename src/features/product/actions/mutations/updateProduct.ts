"use server";

import { revalidatePath } from "next/cache";

import {
  ImageUploadState,
  ProductFormDataProps,
  ProductNotificationFormStates,
} from "@/features/product/types";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

import { ProductDetailsFormSchema } from "../../schema/productSchema";
import { deleteImageAction } from "../upload/deleteImage";
import uploadSingleImageAction from "../upload/uploadImage";

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
    const imageBaseName = `${productId}-${productName.replace(/ /g, "-").substring(0, 30)}`;

    // Fetch current image URLs from DB to detect which ones were removed
    const currentProduct = await prisma.product.findUnique({
      where: { productId },
      select: { imageUrlsSmall: true, imageUrlsBig: true },
    });

    // --- Small images ---------------------------------------------------
    // Kept URLs are sent as keepSmall-0, keepSmall-1, ... hidden form values
    const keptSmallUrls: string[] = [];
    for (let i = 0; i < 20; i++) {
      const url = formData.get(`keepSmall-${i}`);
      if (typeof url === "string" && url) keptSmallUrls.push(url);
    }

    // Delete removed images from Cloudinary
    const keptSmallSet = new Set(keptSmallUrls);
    const removedSmall = (currentProduct?.imageUrlsSmall ?? []).filter(
      (url) => !keptSmallSet.has(url),
    );
    for (const url of removedSmall) {
      await deleteImageAction(url);
    }

    // Upload newly added small images
    const newSmallFiles: File[] = [];
    for (let i = 0; i < 10; i++) {
      const file = formData.get(`imageSmall-${i}`);
      if (file instanceof File && file.size > 0) newSmallFiles.push(file);
    }
    const uploadedSmallUrls: string[] = [];
    for (let i = 0; i < newSmallFiles.length; i++) {
      const idx = keptSmallUrls.length + i;
      const result: ImageUploadState = await uploadSingleImageAction({
        fileFormData: newSmallFiles[i],
        imageName: `a${idx + 1}_${imageBaseName}`,
      });
      if (!result.success) {
        return {
          success: false,
          globalError:
            result.globalError || "Fehler beim Hochladen des kleinen Bildes.",
        };
      }
      if (result.url) uploadedSmallUrls.push(result.url);
    }
    const imageUrlsSmall = [...keptSmallUrls, ...uploadedSmallUrls];

    // --- Big images -----------------------------------------------------
    const keptBigUrls: string[] = [];
    for (let i = 0; i < 20; i++) {
      const url = formData.get(`keepBig-${i}`);
      if (typeof url === "string" && url) keptBigUrls.push(url);
    }

    const keptBigSet = new Set(keptBigUrls);
    const removedBig = (currentProduct?.imageUrlsBig ?? []).filter(
      (url) => !keptBigSet.has(url),
    );
    for (const url of removedBig) {
      await deleteImageAction(url);
    }

    const newBigFiles: File[] = [];
    for (let i = 0; i < 10; i++) {
      const file = formData.get(`imageBig-${i}`);
      if (file instanceof File && file.size > 0) newBigFiles.push(file);
    }
    const uploadedBigUrls: string[] = [];
    for (let i = 0; i < newBigFiles.length; i++) {
      const idx = keptBigUrls.length + i;
      const result: ImageUploadState = await uploadSingleImageAction({
        fileFormData: newBigFiles[i],
        imageName: `b${idx + 1}_${imageBaseName}`,
      });
      if (!result.success) {
        return {
          success: false,
          globalError:
            result.globalError || "Fehler beim Hochladen des großen Bildes.",
        };
      }
      if (result.url) uploadedBigUrls.push(result.url);
    }
    const imageUrlsBig = [...keptBigUrls, ...uploadedBigUrls];

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
        imageUrlsSmall,
        imageUrlsBig,
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
