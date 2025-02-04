import { Prisma } from "@prisma/client";

export type ProductWithColorConnectionProps = Prisma.ProductGetPayload<{
  include: {
    articles: true;
    colorConnection: {
      select: {
        color: true;
      };
    };
  };
}>;

// remove colorConnection from prisma object if it exists and contains color
export type ProductWithColorAndArticlesProps = Omit<
  ProductWithColorConnectionProps,
  "colorConnection"
> & {
  colors: {
    id: string;
    colorId: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
