import { prisma } from "@/lib/prisma";

// ********************* get article count for product *********************

export async function getArticleCountForProduct(
  productId: number,
): Promise<number> {
  try {
    return await prisma.article.count({ where: { productId } });
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
}
