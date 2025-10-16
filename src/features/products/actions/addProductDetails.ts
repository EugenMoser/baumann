import { log } from "console";

import { prisma } from "@/lib/prisma";
import { ImageUploadState, ProductNotificationFormStates } from "@/types/form";
import { ProductFormDataProps } from "@/types/product";

import { ImageSmallFormSchema } from "../schemas/imageFormSchema";
import { ProductDetailsFormSchema } from "../schemas/productSchema";
import uploadSingleImageAction from "./uploadImage";

interface AddProductDetailsActionProps {
  productFormData: ProductFormDataProps;
  nextProductId: number;
  fileFormData: File;
  imageName: string;
  createdAtProduct: string;
  updatedAtProduct: string;
}
export default async function addProductDetailsAction(
  props: AddProductDetailsActionProps,
): Promise<ProductNotificationFormStates> {
  //  validated product fields
  const validatedProductFields = ProductDetailsFormSchema.safeParse({
    ...props.productFormData,
  });

  // validate image file
  const uploadedImageSmall: File | undefined =
    props.fileFormData instanceof File && props.fileFormData.size > 0
      ? props.fileFormData
      : undefined;
  const validatedImageFile = ImageSmallFormSchema.safeParse({
    imageSmall: uploadedImageSmall,
  });

  // validation
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
    fileFormData: props.fileFormData,
    imageName: props.imageName,
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
        productId: props.nextProductId,
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
        createdAt: props.createdAtProduct,
        updatedAt: props.updatedAtProduct,
      },
    });
    console.info("Product details successfully saved in the database.");
    return { success: true };
  } catch (error: any) {
    console.error("Errors due to adding product details:", error);
    return {
      success: false,
      globalError:
        "Produktdetails konnten nicht gespeichert werden. Bitte versuche es erneut: " +
        error.message,
    };
  }
}
