import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/db/prisma";
import { ProductCategoryProps } from "@/types/ProductCategory";

// Get products by category
export async function getProductsByCategory(
  category: string,
): Promise<ProductCategoryProps[] | null> {
  try {
    const product: ProductCategoryProps[] = await prisma.product.findMany({
      where: { category },
      select: {
        id: true,
        category: true,
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
