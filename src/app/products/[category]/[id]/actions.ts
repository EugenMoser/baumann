import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/db/prisma";
import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/types/Product";

async function getProduct(
  id: string,
): Promise<ProductWithColorAndArticlesProps | null> {
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

    if (!product) return null;

    const { colorConnection, ...productWithoutColorConnection } = product;

    // merge productWithoutColorConnection with a new colors array
    // each color object includes an additional colorSuffix property
    const productWithColorAndArticle: ProductWithColorAndArticlesProps = {
      ...productWithoutColorConnection,
      colors: colorConnection
        .map(({ color, colorSuffix }) => ({
          ...color,
          colorSuffix,
        }))
        .sort((a, b) => a.colorSuffix - b.colorSuffix), //sort by colorSuffix
    };

    return productWithColorAndArticle;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    return null;
  }
}

//
export const getCachedProduct = unstable_cache(
  getProduct,
  [],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
