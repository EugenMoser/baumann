import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/features/product/types";
import { prisma } from "@/lib/prisma";

// ********************* get product by productId (integer) *********************

export async function getProductByProductId(
  productId: number,
): Promise<ProductWithColorAndArticlesProps> {
  let product: ProductWithColorConnectionProps | null = null;
  try {
    product = await prisma.product.findUnique({
      where: { productId },
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
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    throw new Error(`Produkt konnte nicht geladen werden: ${message}`);
  }

  if (!product) throw new Error("Produkt nicht gefunden.");

  const { colorConnection, articles, ...rest } = product;
  const sortedArticles = articles.sort((a, b) => a.prio - b.prio);
  const sortedColors = colorConnection
    .map(({ color, colorSuffix }) => ({ ...color, colorSuffix }))
    .sort((a, b) => a.colorSuffix - b.colorSuffix);

  return { ...rest, articles: sortedArticles, colors: sortedColors };
}
