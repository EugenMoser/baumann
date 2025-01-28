import { Prisma } from "@prisma/client";

import { prisma } from "./prisma";

export type ProductWithColorConnectionProps = Prisma.ProductGetPayload<{
  include: {
    articles: true;
    colorConnection: {
      select: {
        color: true;
      };
    };
  };
}>;

// remove colorConnection from prisma object if it exists and contains color
export type ProductWithColorAndArticlesProps = Omit<
  ProductWithColorConnectionProps,
  "colorConnection"
> & {
  colors: {
    id: string;
    colorId: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

// Get all products with color and articles (without color connection)
export async function getAllProducts(): Promise<
  ProductWithColorAndArticlesProps[] | null
> {
  let allProducts: ProductWithColorConnectionProps[] | null = null;
  try {
    allProducts = await prisma.product.findMany({
      include: {
        articles: true,
        colorConnection: {
          select: {
            color: true,
          },
        },
      },
    });

    if (!allProducts) return null;

    //
    const allproductsWithArticleAndColors: ProductWithColorAndArticlesProps[] =
      allProducts.map((product) => {
        const { colorConnection, ...productWithoutColorConnection } = product;
        return {
          ...productWithoutColorConnection,
          colors: colorConnection.map((connection) => connection.color),
        };
      });

    return allproductsWithArticleAndColors;
  } catch (error) {
    console.error(`Failed to fetch all product:`, error);
    return null;
  }
}

// Get product by product ID
export async function getProduct(productId: number) {
  let product: ProductWithColorConnectionProps | null = null;
  try {
    product = await prisma.product.findUnique({
      where: { productId: productId },
      include: {
        articles: true,
        colorConnection: {
          select: {
            color: true,
          },
        },
      },
    });

    if (!product) return null;

    // Separate color connection from product data and create a new object with only product data and colors
    const { colorConnection, ...productWithoutColorConnection } = product;

    const ProductWithColorConnection: ProductWithColorAndArticlesProps = {
      ...productWithoutColorConnection,
      colors: colorConnection.map((connection) => connection.color),
    };
    return ProductWithColorConnection;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${productId}:`, error);
    return null;
  }
}
