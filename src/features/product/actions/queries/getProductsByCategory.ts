import { unstable_cache } from "next/cache";

import {
  ProductByCategoryFromDBProps,
  ProductByCategoryProps,
} from "@/features/product/types";
import { prisma } from "@/lib/prisma";

// ********************* get products by category *********************
export async function getProductsByCategory(
  category: string,
): Promise<ProductByCategoryProps[]> {
  let products: ProductByCategoryFromDBProps[] | null = null;

  try {
    products = await prisma.product.findMany({
      where: { category },
      select: {
        id: true,
        category: true,
        prio: true,
        name: true,
        description1: true,
        imageUrlSmall: true,
        colorConnection: {
          select: {
            color: true,
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
  if (!products || products.length === 0)
    throw new Error("No product found in this category");

  // Transformiere jedes Produkt ähnlich wie in getProductById, aber lasse colorSuffix weg
  const transformedProducts = products.map((product) => {
    const { colorConnection, ...rest } = product;

    // Hier wird nur das color-Objekt übernommen
    const colors = colorConnection.map(({ color }) => color);
    return {
      ...rest,
      colors,
    };
  });

  return transformedProducts;
}

// cache the products
export const getCachedProductByCategory: (
  category: string,
) => Promise<ProductByCategoryProps[]> = unstable_cache(
  getProductsByCategory,
  ["products-by-category"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
