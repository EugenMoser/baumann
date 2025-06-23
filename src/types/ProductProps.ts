import { z } from "zod";

import { isPasswordAlreadyReset } from "@/lib/database";
import { ProductDetailsFormSchema } from "@/lib/schemas";
import {
  Article,
  Color,
  Prisma,
  ProductColor,
} from "@prisma/client";

import { ProductNotificationFormStates } from "./FormStates";

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

export type ArticleProps = Article;

export type ColorProps = Color & { colorSuffix: number };

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
