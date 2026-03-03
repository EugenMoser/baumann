"use server";

import { revalidatePath } from "next/cache";

import { CategoryProps } from "@/constants/productCategories";
import { ArticleDetailsFormSchema } from "@/features/article";
import { ArticleFormDataProps } from "@/features/article/types";
import {
  ImageUploadState,
  ProductFormDataProps,
  ProductNotificationFormStates,
} from "@/features/product/types";
import createTimestamps from "@/lib/helpers/createTimestamps";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

import { ImageSmallFormSchema } from "../../schema/imageFormSchema";
import { ProductDetailsFormSchema } from "../../schema/productSchema";
import uploadSingleImageAction from "../upload/uploadImage";

export async function addProductWithArticleAction(
  previousState: ProductNotificationFormStates,
  formData: FormData,
): Promise<ProductNotificationFormStates> {
  // Require authentication
  try {
    await requireAuth();
  } catch (error) {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  // Count products to get next ID
  const nextProductId: number = (await prisma.product.count()) + 1;

  // Create timestamps
  const timestamps = createTimestamps("Product", "Article");

  // Extract product form data
  const productFormData: ProductFormDataProps = {
    category: formData.get("category") as CategoryProps["category"],
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

  // Extract article form data
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

  const fileFormData = formData.get("imageSmall");

  // Validate product fields
  const validatedProductFields = ProductDetailsFormSchema.safeParse({
    ...productFormData,
  });

  // Validate article fields
  const validatedArticleFields = ArticleDetailsFormSchema.safeParse({
    ...articleFormData,
  });

  // Validate image file
  const uploadedImageSmall: File | undefined =
    fileFormData instanceof File && fileFormData.size > 0
      ? fileFormData
      : undefined;
  const validatedImageFile = ImageSmallFormSchema.safeParse({
    imageSmall: uploadedImageSmall,
  });

  // Collect all validation errors
  const productErrors = !validatedProductFields.success && {
    ...validatedProductFields.error.flatten().fieldErrors,
  };

  const articleErrors = !validatedArticleFields.success && {
    ...validatedArticleFields.error.flatten().fieldErrors,
  };

  const imageErrors = !validatedImageFile.success && {
    ...validatedImageFile.error.flatten().fieldErrors,
  };

  // Return if any validation failed
  if (productErrors || articleErrors || imageErrors) {
    return {
      success: false,
      errors: {
        ...(productErrors || {}),
        ...(articleErrors || {}),
        ...(imageErrors || {}),
      },
      globalError:
        "Validierung fehlgeschlagen. Bitte überprüfen Sie alle Felder.",
    };
  }

  // Create image name using article number
  const createdSmallImageName = `a_${articleFormData.articleNumber}-${productFormData.productName.substring(0, 20)}`; // e.g., a_1234-Produktname

  // Upload image to cloudinary
  const uploadedImageResult: ImageUploadState = await uploadSingleImageAction({
    fileFormData: fileFormData as File,
    imageName: createdSmallImageName,
  });

  if (!uploadedImageResult.success) {
    console.error("Error uploading image:", uploadedImageResult.errors);
    return {
      success: false,
      globalError:
        uploadedImageResult.globalError || "Fehler beim Hochladen des Bildes.",
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
  } = validatedProductFields.data!;

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

  try {
    // Use transaction to ensure atomicity - both product and article are created or none
    await prisma.$transaction(async (tx) => {
      // Create product
      await tx.product.create({
        data: {
          category,
          productId: nextProductId,
          prio: productPrio,
          name: productName,
          description1: descriptionProduct1,
          description2: descriptionProduct2,
          description3: descriptionProduct3,
          description4: descriptionProduct4,
          material,
          imageUrlSmall: uploadedImageResult.url!,
          imageUrlBig1: "",
          createdAt: timestamps.createdAtProduct,
          updatedAt: timestamps.updatedAtProduct,
        },
      });

      // Create article linked to the product
      await tx.article.create({
        data: {
          productId: nextProductId,
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
          createdAt: timestamps.createdAtArticle,
          updatedAt: timestamps.updatedAtArticle,
        },
      });
    });

    revalidatePath("/dashboard");
    revalidatePath(`/products/${category}`);

    return {
      message: "Produkt mit Artikel erfolgreich hinzugefügt",
      success: true,
      productId: nextProductId,
    };
  } catch (error: any) {
    console.error("Error adding product with article:", error);
    return {
      success: false,
      globalError: `Produkt und Artikel konnten nicht gespeichert werden. Bitte versuche es erneut: ${error.message}`,
    };
  }
}
