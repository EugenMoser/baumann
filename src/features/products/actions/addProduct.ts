"use server";

import { CategoryProps } from "@/constants/productCategories";
import { prisma } from "@/lib/prisma";
import {
  ImageUploadState,
  ProductNotificationFormStates,
} from "@/types/formProps";
import { ProductFormDataProps } from "@/types/productProps";

import createTimestamps from "../../../lib/helpers/createTimestamps";
import { ImageSmallFormSchema } from "../schemas/imageFormSchema";
import { ProductDetailsFormSchema } from "../schemas/productSchema";
import uploadSingleImageAction from "./uploadImage";

// *----------- add product actions
//todo: bei update Funktion, wenn Bilder bereits in der Datenbank sind, sollte eine Fehlermeldung zurückgegeben werden

export async function addProductAction(
  previousState: ProductNotificationFormStates,
  formData: FormData,
): Promise<ProductNotificationFormStates> {
  // count products and articles in database and increment by 1
  const nextProductId: number = (await prisma.product.count()) + 1;

  //* ------create timestamp
  // create timestamps for product, article and color
  const timestamps = createTimestamps("Product", "Article", "Color");

  //* get form data
  const productFormData: ProductFormDataProps = {
    category: formData.get("category") as CategoryProps["category"],
    productPrio: Number(formData.get("productPrio")), //convert to number
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
  const fileFormData = formData.get("imageSmall");

  //*------create images name
  //todo: take the first article-number and put it in the createImageUrlName, when article function is ready (example imageName ; imageUrlBig1 "/b1_Artikelnummer-Produktname")
  //!mock data for image name
  const mockArticleNumber = "9999";
  const createdSmallImageName = `a_${mockArticleNumber}-TEST`;
  let addProductDetailsResult: ProductNotificationFormStates = {};
  // //*------add produkt to database
  // addProductDetailsResult = await addProductDetailsAction({
  //   productFormData,
  //   nextProductId,
  //   fileFormData: fileFormData as File,
  //   imageName: createdSmallImageName,
  //   createdAtProduct: timestamps.createdAtProduct,
  //   updatedAtProduct: timestamps.updatedAtProduct,
  // });

  // Validate product fields
  const validatedProductFields = ProductDetailsFormSchema.safeParse({
    ...productFormData,
  });

  // Validate image file
  const uploadedImageSmall: File | undefined =
    fileFormData instanceof File && fileFormData.size > 0
      ? fileFormData
      : undefined;
  const validatedImageFile = ImageSmallFormSchema.safeParse({
    imageSmall: uploadedImageSmall,
  });

  // Validation
  const productErrors = !validatedProductFields.success && {
    ...validatedProductFields.error.flatten().fieldErrors,
  };

  const imageErrors = !validatedImageFile.success && {
    ...validatedImageFile.error.flatten().fieldErrors,
  };

  if (productErrors || imageErrors) {
    return {
      success: false,
      errors: {
        ...(productErrors || {}),
        ...(imageErrors || {}),
      },
      globalError: "Produkt konnte nicht hinzugefügt werden.",
    };
  }
  // upload image to cloudinary
  const uploadedImageResult: ImageUploadState = await uploadSingleImageAction({
    fileFormData: fileFormData as File,
    imageName: createdSmallImageName,
  });
  if (!uploadedImageResult.success) {
    console.error("Error uploading image:", uploadedImageResult.errors);
    return {
      success: false,
      globalError: uploadedImageResult.globalError,
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

  try {
    await prisma.product.create({
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
        imageUrlBig1: "test big image 1", // TODO: add big images
        imageUrlBig2: "test big image 2",
        imageUrlBig3: "test big image 3",
        createdAt: timestamps.createdAtProduct,
        updatedAt: timestamps.updatedAtProduct,
      },
    });
    console.info("Product details successfully saved in the database.");
    return { message: "Produkt erfolgreich hinzugefügt", success: true };
  } catch (error: any) {
    console.error("Errors due to adding product details:", error);
    return {
      errors: addProductDetailsResult.errors,
      globalError: addProductDetailsResult.globalError,
    };
  }
}
