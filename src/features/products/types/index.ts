import { z } from "zod";

import { ColorProps } from "@/features/color/types";
import { NotificationFormStates } from "@/features/globalTypes";
import {
  ProductDetailsFormSchema,
} from "@/features/products/schemas/productSchema";
import {
  Prisma,
  Product,
} from "@prisma/client";

export type ProductSearchProps = Pick<Product, "name" | "productId">;

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
  imageUrlSmall: string | null;

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

export type ProductNotificationFormStates = NotificationFormStates & {
  errors?: ProductFormFieldErrors; // field specific errors
};

export type ImageUploadState = ProductNotificationFormStates & {
  url?: string; // URL of the uploaded image
};
