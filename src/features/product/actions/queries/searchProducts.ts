import { ProductSearchProps } from "@/features/product/types";
import { prisma } from "@/lib/prisma";

// ********************* search products *********************
export async function searchProducts(
  query: string,
): Promise<ProductSearchProps[] | []> {
  if (!query) return [];
  try {
    const products: ProductSearchProps[] = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          {
            productId: Number.isNaN(Number(query)) ? undefined : Number(query),
          },
        ],
      },
      select: {
        id: true,
        name: true,
        productId: true,
        category: true,
        description1: true,
      },
      take: 10,
    });
    if (!products) throw new Error("Item not found");

    return products;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch products. Error message: ${message}`);
  }
}
