import { unstable_cache } from "next/cache";
import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "src/types/Product";

import { prisma } from "@lib/db/prisma";

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
          },
        },
      },
    });

    if (!product) return null;
    const { colorConnection, ...productWithoutColorConnection } = product;

    const productWithColorAndArticle: ProductWithColorAndArticlesProps = {
      ...productWithoutColorConnection,
      colors: colorConnection.map((color: any) => color.color),
    };
    return productWithColorAndArticle;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    return null;
  }
}

export const getCachedProduct = unstable_cache(
  getProduct,
  [],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
