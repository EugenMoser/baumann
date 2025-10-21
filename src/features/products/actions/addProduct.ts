"use server";

import { CategoryProps } from "@/constants/productCategories";
import { prisma } from "@/lib/prisma";
import { ProductNotificationFormStates } from "@/types/formProps";
import { ProductFormDataProps } from "@/types/productProps";

import createTimestamps from "../../../lib/helpers/createTimestamps";
import addProductDetailsAction from "./addProductDetails";

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

  //*------add produkt to database
  const addProductDetailsResult: ProductNotificationFormStates =
    await addProductDetailsAction({
      productFormData,
      nextProductId,
      fileFormData: fileFormData as File,
      imageName: createdSmallImageName,
      createdAtProduct: timestamps.createdAtProduct,
      updatedAtProduct: timestamps.updatedAtProduct,
    });

  if (!addProductDetailsResult.success) {
    return {
      errors: addProductDetailsResult.errors,
      globalError: addProductDetailsResult.globalError,
    };
  }

  return { message: "Produkt erfolgreich hinzugefügt" };
}
