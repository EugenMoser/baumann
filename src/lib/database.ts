"use server";
import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  ProductByCategoryFromDBProps,
  ProductByCategoryProps,
} from "@/types/ProductByCategoryProps";
import {
  ProductWithColorAndArticlesProps,
  ProductWithColorConnectionProps,
} from "@/types/ProductProps";
import { Admin, Color, PasswordReset } from "@prisma/client";

import isTokenValid from "./helpers/isTokenValid";

//todo: fetch products from database in a separate file like lib/database.ts
//todo actions only for CRUD operations

// ********************* get product by id *********************
async function getProductById(
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
  } catch (error: any) {
    console.error("Database Error:", error);

    // throw the error to error.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
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
}

// cache the product
export const getCachedProductById: (
  id: string,
) => Promise<ProductWithColorAndArticlesProps> = unstable_cache(
  getProductById,
  ["product"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);

// ********************* get products by category *********************
export async function getProductsByCategory(
  category: string,
): Promise<ProductByCategoryProps[]> {
  let products: ProductByCategoryFromDBProps[] | null = null;

  try {
    products = await prisma.product.findMany({
      where: { category },
      select: {
        id: true,
        category: true,
        prio: true,
        name: true,
        description1: true,
        imageUrlSmall: true,
        colorConnection: {
          select: {
            color: true,
          },
        },
      },
    });
  } catch (error: any) {
    console.error("Database Error:", error);

    // throw the error to error.tsx
    throw new Error(
      `Failed to fetch products. Error message: ${error.message}`,
    );
  }
  if (!products || products.length === 0)
    throw new Error("No product found in this category");

  // Transformiere jedes Produkt ähnlich wie in getProductById, aber lasse colorSuffix weg
  const transformedProducts = products.map((product) => {
    const { colorConnection, ...rest } = product;

    // Hier wird nur das color-Objekt übernommen
    const colors = colorConnection.map(({ color }) => color);
    return {
      ...rest,
      colors,
    };
  });

  return transformedProducts;
}

// cache the products
export const getCachedProductByCategory: (
  category: string,
) => Promise<ProductByCategoryProps[]> = unstable_cache(
  getProductsByCategory,
  ["products-by-category"],
  { revalidate: 60 * 60 * 24 }, // 24 hours
);

// ********************* check password reset *********************

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

// ********************* get admin *********************

export async function getAdminByEmail(email: string) {
  let admin: Admin | null = null;
  try {
    admin = await prisma.admin.findUnique({
      where: {
        email: email as string,
      },
    });
  } catch (error) {
    console.error("Keinen Admin gefunden:", error);
    return null;
  }
  if (!admin) return null;

  return admin;
}

// ********************* get color *********************

export async function getAllColors() {
  let color: Color[] | null = null;
  try {
    color = await prisma.color.findMany();
    return color;
  } catch (error) {
    console.error("Keine Farben gefunden:", error);
    return null;
  }
}
