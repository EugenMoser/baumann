import { prisma } from "@/lib/prisma";
import { Article, Product } from "@prisma/client";

export type ProductWithArticles = Product & {
  articles: Pick<Article, "name" | "number">[];
};

// ********************* get all products (for dashboard) *********************

export async function getAllProducts(): Promise<ProductWithArticles[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { productId: "asc" },
      include: {
        articles: {
          select: { name: true, number: true },
        },
      },
    });
    return products;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Produkte konnten nicht geladen werden.");
  }
}
