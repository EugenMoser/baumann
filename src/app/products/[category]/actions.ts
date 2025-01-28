import { unstable_cache } from "next/cache";
import { ProductCategory } from "src/types/ProductCategory";

import { prisma } from "@lib/db/prisma";

// Get products by category
async function getProductsByCategory(category: string) {
  try {
    const product: ProductCategory[] = await prisma.product.findMany({
      where: { category },
      select: {
        name: true,
        description1: true,
        imageUrlSmall: true,
      },
    });

    if (!product) {
      console.error(
        `No products found for category: ${category}:`,
        "getProductsByCategory",
      );
      return null;
    }

    throw new Error("TESCHT");
    return product;
  } catch (error: any) {
    console.error(`Error at getProductsByCategory function`, error);
    // throw the error to page.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
}

export const getCachedProductsByCategory = unstable_cache(
  getProductsByCategory,
  [],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
