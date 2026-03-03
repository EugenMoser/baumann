import {
  ProductByCategoryFromDBProps,
  ProductByCategoryProps,
} from "@/features/product/types";
import { prisma } from "@/lib/prisma";

/**
 * Searches products by name or productId and returns full card data
 * (image, colors, etc.) suitable for rendering ProductCardByCategory.
 */
export async function searchProductCards(
  query: string,
): Promise<ProductByCategoryProps[]> {
  if (!query) return [];
  try {
    const products: ProductByCategoryFromDBProps[] =
      await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            {
              articles: {
                some: { number: { contains: query, mode: "insensitive" } },
              },
            },
          ],
        },
        select: {
          id: true,
          category: true,
          prio: true,
          name: true,
          description1: true,
          imageUrlsSmall: true,
          colorConnection: {
            select: {
              color: true,
            },
          },
        },
        take: 10,
        orderBy: { productId: "asc" },
      });

    return products.map(({ colorConnection, ...rest }) => ({
      ...rest,
      colors: colorConnection.map(({ color }) => color),
    }));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch products. Error message: ${message}`);
  }
}
