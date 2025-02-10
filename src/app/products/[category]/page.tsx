import ProductByCategoryCard from "@/components/ProductByCategoryCard";
import { ProductCategoryProps } from "@/types/ProductCategory";

import { getCachedProductsByCategory } from "./actions";

interface ProductByCategoryPageProps {
  params: Promise<{ category: string }>;
}

async function ProductsByCategoryPage({ params }: ProductByCategoryPageProps) {
  const { category } = await params;
  let products: ProductCategoryProps[] | null = null;

  try {
    //todo sort products by prio
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
          <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
            <ProductByCategoryCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsByCategoryPage;
