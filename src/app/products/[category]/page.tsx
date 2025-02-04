import { ProductCategory } from "src/types/ProductCategory";

import ProductByCategoryCard from "@components/ProductByCategoryCard";

import { getCachedProductsByCategory } from "./actions";

interface ProductByCategoryPageProps {
  params: Promise<{ category: string }>;
}

async function ProductsByCategoryPage({ params }: ProductByCategoryPageProps) {
  const { category } = await params;
  let products: ProductCategory[] | null = null;

  try {
    products = await getCachedProductsByCategory(category);
  } catch (error: any) {
    // throw the error to error.tsx
    throw new Error(error);
  }

  // if products is null
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
        {products.map((product, index) => (
          <ProductByCategoryCard product={product} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default ProductsByCategoryPage;
