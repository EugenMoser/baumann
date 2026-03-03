import { unstable_cache } from "next/cache";

import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/features/product/types";
import { prisma } from "@/lib/prisma";

// ********************* get product by id *********************
export async function getProductById(
  id: string,
): Promise<ProductWithColorAndArticlesProps> {
  let product: ProductWithColorConnectionProps | null = null;
  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: {
        articles: true,
        colorConnection: {
          select: {
            color: true,
            colorSuffix: true,
          },
        },
      },
    });
  } catch (error: any) {
    console.error("Database Error:", error);

    // throw the error to error.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
  if (!product) throw new Error("Item not found");
  const { colorConnection, articles, ...rest } = product;

  // sort articles by prio
  const sortedArticles = articles.sort((a, b) => a.prio - b.prio);

  // remove colorConnection from prisma object if it exists and contains color and sort by colorSuffix
  const sortedColorConnection = colorConnection
    .map(({ color, colorSuffix }) => ({
      ...color,
      colorSuffix,
    }))
    .sort((a, b) => a.colorSuffix - b.colorSuffix); // Sort by colorSuffix

  // merge productWithoutColorConnection with a new colors array
  // each color object includes an additional colorSuffix property
  const productWithColorAndArticle: ProductWithColorAndArticlesProps = {
    ...rest,
    articles: sortedArticles,
    colors: sortedColorConnection,
  };
  return productWithColorAndArticle;
}

// cache the product
export const getCachedProductById: (
  id: string,
) => Promise<ProductWithColorAndArticlesProps> = unstable_cache(
  getProductById,
  ["product"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
