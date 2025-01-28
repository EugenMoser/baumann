import { Suspense } from "react";

import ProductByCategoryCard from "@components/ProductByCategoryCard";

import { getCachedProductsByCategory } from "./actions";
import LoadingProductsByCategory from "./loading";

interface ProductByCategoryPageProps {
  params: Promise<{ category: string }>;
}

async function ProductsByCategoryPage({ params }: ProductByCategoryPageProps) {
  const { category } = await params;

  let products;
  try {
    products = await getCachedProductsByCategory(category);
  } catch (error: any) {
    // throw the error to error.tsx
    throw new Error(error);
  }

  // if products is null or not an array
  if (!products) {
    return (
      <div>
        <p>Keine Produkte gefunden.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Produkte in der Kategorie: {category}</h1>

      <ul>
        <Suspense fallback={<LoadingProductsByCategory />}>
          <ProductByCategoryCard products={products} />
        </Suspense>
      </ul>
    </div>
  );
}

export default ProductsByCategoryPage;
