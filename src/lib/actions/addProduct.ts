"use server";

import { CategoryProps } from "@/constants/productCategories";
import { prisma } from "@/lib/prisma";
import { ProductNotificationFormStates } from "@/types/FormStates";
import { ProductFormDataProps } from "@/types/ProductProps";

import createTimestamps from "../helpers/createTimestamps";
import addProductDetailsAction from "./addProductDetails";

// *----------- add product actions
//todo: bei update Funktion, wenn Bilder bereits in der Datenbank sind, sollte eine Fehlermeldung zurückgegeben werden

export async function addProductAction(
  previousState: ProductNotificationFormStates,
  formData: FormData,
): Promise<ProductNotificationFormStates> {
  // count products and articles in database and increment by 1
  const nextProductId: number = (await prisma.product.count()) + 1;
  const nextArticleId: number = (await prisma.article.count()) + 1;

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

  //*------add produkt to mongodb
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

  //! --------Artikle
  // const validatedArticleFields = ArticleDetailsFormSchema.safeParse({
  //   articlePrio: formData.get("articlePrio"),
  //   articleName: formData.get("articleName"),
  //   descriptionArticle1: formData.get("descriptionArticle1"),
  //   descriptionArticle2: formData.get("descriptionArticle2"),
  //   descriptionArticle3: formData.get("descriptionArticle3"),
  //   descriptionArticle4: formData.get("descriptionArticle4"),
  //   vpe1: formData.get("vpe1"),
  //   vpe2: formData.get("vpe2"),
  //   vpe3: formData.get("vpe3"),
  //   vpe4: formData.get("vpe4"),
  // });
  // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedArticleFields.success) {
  //   return {
  //     errors: validatedArticleFields.error.flatten().FormFieldErrors,
  //     message: "Produktdaten konnten nicht angelegt werden.",
  //   };
  // }

  // const {
  //   articlePrio,
  //   articleName,
  //   descriptionArticle1,
  //   descriptionArticle2,
  //   descriptionArticle3,
  //   descriptionArticle4,
  //   vpe1,
  //   vpe2,
  //   vpe3,
  //   vpe4,
  // } = validatedArticleFields.data;
  //todo: timestamp.create + update  + nextArticleId hinzufügen
}

// ********************* article details actions *********************
// ********************* color details actions *********************

// ********************* login actions ******************************************
