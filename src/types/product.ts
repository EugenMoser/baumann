import { z } from "zod";

import { ProductDetailsFormSchema } from "@/features/products/schemas/productSchema";
import { ColorProps } from "@/types/color";
import { Prisma } from "@prisma/client";

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

// export interface ProductFormDataProps {
//   category: string;
//   productPrio: number | number[];
//   productName: string;
//   descriptionProduct1?: string | null;
//   descriptionProduct2?: string | null;
//   descriptionProduct3?: string | null;
//   descriptionProduct4?: string | null;
//   material: string | null;
// }

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

export type ProductByCategoryProps = Omit<
  ProductByCategoryFromDBProps,
  "colorConnection"
> & {
  colors: ColorProps[];
};
