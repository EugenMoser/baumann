import { Suspense } from "react";

import { notFound } from "next/navigation";

import productCategories from "@/constants/productCategories";
import {
  getCachedProductByCategory,
  ProductCardByCategory,
} from "@/features/product";
import { ProductByCategoryProps } from "@/features/product/types";

import Loading from "./loading";

interface ProductsByCategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Public page displaying all products for a given category.
 * Uses cached data with 24h revalidation.
 */
export default async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps): Promise<React.JSX.Element> {
  const { category } = await params;

  // Validate that the category exists
  const categoryData = productCategories.find((c) => c.category === category);

  if (!categoryData) {
    notFound();
  }

  const products: ProductByCategoryProps[] =
    await getCachedProductByCategory(category);

  return (
    <main>
      <h1 className="mb-6 text-2xl font-bold">{categoryData.name}</h1>
      <Suspense fallback={<Loading />}>
        <ul className="dynamicGrid grid gap-6 rounded-sm">
          {products.map((product: ProductByCategoryProps) => (
            <li key={product.id} className="h-full">
              <ProductCardByCategory product={product} />
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}
