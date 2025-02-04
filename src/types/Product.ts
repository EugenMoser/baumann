import { Article, Color, Prisma } from "@prisma/client";

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
  colors: ColorProps[];
};

export type ArticleProps = Article;

export type ColorProps = Color;
