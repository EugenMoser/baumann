import { z } from "zod";

import { ColorProps } from "@/features/color/types";
import { ProductDetailsFormSchema } from "@/features/product";
import { NotificationFormStates } from "@/features/product/types/globalTypes";
import { Prisma, Product } from "@prisma/client";

export type ProductSearchProps = Pick<
  Product,
  "id" | "name" | "productId" | "category" | "description1"
> & {
  description1?: string | null; // make description1 optional
};

export type ProductWithColorConnectionProps = Prisma.ProductGetPayload<{
  include: {
    articles: true;
    colorConnection: {
      select: {
        color: true;
        colorSuffix: true;
      };
    };
  };
}>;

// remove colorConnection from prisma object if it exists and contains color
export type ProductWithColorAndArticlesProps = Omit<
  ProductWithColorConnectionProps,
  "colorConnection"
> & {
  colors: ColorProps[];
};

// Form data for creating or updating a product
export type ProductFormDataProps = z.infer<typeof ProductDetailsFormSchema>;

//type for retrieval from the database with nested color structure
export type ProductByCategoryFromDBProps = {
  id: string;
  category: string;
  prio: number;
  name: string;
  description1: string | null;
  imageUrlsSmall: string[];

  colorConnection: { color: ColorProps }[];
};

// Type for retrieval from the database with colors flattened
export type ProductByCategoryProps = Omit<
  ProductByCategoryFromDBProps,
  "colorConnection"
> & {
  colors: ColorProps[];
};

// Field specific errors for product form
export type ProductFormFieldErrors = {
  category?: string[];
  productPrio?: string[];
  productName?: string[];
  descriptionProduct1?: string[];
  descriptionProduct2?: string[];
  descriptionProduct3?: string[];
  descriptionProduct4?: string[];
  material?: string[];
  imageSmall?: string[];
};

// Combined field errors for product with article form
export type ProductWithArticleFormFieldErrors = ProductFormFieldErrors & {
  articlePrio?: string[];
  articleNumber?: string[];
  articleName?: string[];
  descriptionArticle1?: string[];
  descriptionArticle2?: string[];
  descriptionArticle3?: string[];
  descriptionArticle4?: string[];
  vpe1?: string[];
  vpe2?: string[];
  vpe3?: string[];
  vpe4?: string[];
};

export type ProductNotificationFormStates = NotificationFormStates & {
  errors?: ProductFormFieldErrors | ProductWithArticleFormFieldErrors; // field specific errors
  productId?: number; // ID of the created or updated product
};

export type ImageUploadState = ProductNotificationFormStates & {
  url?: string; // URL of the uploaded image
};
