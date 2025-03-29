"use server";
import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/types/Product";
import { ProductCategoryProps } from "@/types/ProductCategory";
import { PasswordReset } from "@prisma/client";

import isTokenValid from "./helpers/isTokenValid";

//todo: fetch products from database in a separate file like lib/database.ts
//todo actions only for CRUD operations

// ********************* get product by id *********************
async function getProduct(
  id: string,
): Promise<ProductWithColorAndArticlesProps> {
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
    const { colorConnection, articles, ...rest } = product;

    // sort articles by prio
    const sortedArticles = articles.sort((a, b) => a.prio - b.prio);

    // remove colorConnection from prisma object if it exists and contains color and sort by colorSuffix
    const sortedColorConnection = colorConnection
      .map(({ color, colorSuffix }) => ({
        ...color,
        colorSuffix,
      }))
      .sort((a, b) => a.colorSuffix - b.colorSuffix); // Sortierung nach colorSuffix

    // merge productWithoutColorConnection with a new colors array
    // each color object includes an additional colorSuffix property
    const productWithColorAndArticle: ProductWithColorAndArticlesProps = {
      ...rest,
      articles: sortedArticles,
      colors: sortedColorConnection,
    };

    return productWithColorAndArticle;
  } catch (error: any) {
    console.error("Database Error:", error);

    // throw the error to error.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
}

// cache the product
export const getCachedProduct: (
  id: string,
) => Promise<ProductWithColorAndArticlesProps> = unstable_cache(
  getProduct,
  ["product"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);

// ********************* get products by category *********************
export async function getProductsByCategory(
  category: string,
): Promise<ProductCategoryProps[]> {
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

    const sortedProducts = product.sort((a, b) => a.prio - b.prio);
    return sortedProducts;
  } catch (error: any) {
    console.error("Database Error:", error);

    // throw the error to error.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
}

// cache the products
export const getCachedProductsByCategory: (
  category: string,
) => Promise<ProductCategoryProps[]> = unstable_cache(
  getProductsByCategory,
  ["products-by-category"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);

export async function isPasswordAlreadyReset(token: string | undefined) {
  if (!token) return false;
  let data: PasswordReset | null = null;
  try {
    data = await prisma.passwordReset.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error("Fehler:", error);
    return false;
  }
  //if token is not found return false
  if (!data) return false;

  //if expiresAt is older than now return false
  return isTokenValid(data.expiresAt);
}
