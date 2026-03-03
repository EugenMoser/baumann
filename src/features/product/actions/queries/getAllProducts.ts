import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

// ********************* get all products (for dashboard) *********************

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { productId: "asc" },
    });
    return products;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Produkte konnten nicht geladen werden.");
  }
}
