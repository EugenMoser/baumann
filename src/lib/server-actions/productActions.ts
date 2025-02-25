"use server";
import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/db/prisma";
import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/types/Product";
import { ProductCategoryProps } from "@/types/ProductCategory";

// *************  get product by id
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
            colorSuffix: true,
          },
        },
      },
    });

    if (!product) throw new Error("Item not found");

    const { colorConnection, ...productWithoutColorConnection } = product;

    // merge productWithoutColorConnection with a new colors array
    // each color object includes an additional colorSuffix property
    const productWithColorAndArticle: ProductWithColorAndArticlesProps = {
      ...productWithoutColorConnection,
      colors: colorConnection
        .map(({ color, colorSuffix }) => ({
          ...color,
          colorSuffix,
        }))
        .sort((a, b) => a.colorSuffix - b.colorSuffix), //sort by colorSuffix
    };

    return productWithColorAndArticle;
  } catch (error: any) {
    console.error(`Error at getProduct function ID ${id}:`, error);
    // throw the error to page.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
}

// cache the function
export const getCachedProduct: (
  id: string,
) => Promise<ProductWithColorAndArticlesProps | null> = unstable_cache(
  getProduct,
  [],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);

// ************* get products by category
export async function getProductsByCategory(
  category: string,
): Promise<ProductCategoryProps[] | null> {
  try {
    const product: ProductCategoryProps[] = await prisma.product.findMany({
      where: { category },
      select: {
        id: true,
        category: true,
        prio: true,
        name: true,
        description1: true,
        imageUrlSmall: true,
      },
    });

    if (!product || product.length === 0)
      throw new Error("No product found in this category");

    const sortedProduct = product.sort((a, b) => a.prio - b.prio);
    return sortedProduct;
  } catch (error: any) {
    console.error(`Error at getProductsByCategory function`, error);
    // throw the error to page.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
}

// cache the function
export const getCachedProductsByCategory: (
  category: string,
) => Promise<ProductCategoryProps[] | null> = unstable_cache(
  getProductsByCategory,
  [],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);
