import ProductByCategoryCard from "@/components/ProductByCategoryCard";
import {
  getCachedProductsByCategory,
} from "@/lib/server-actions/productActions";
import { ProductCategoryProps } from "@/types/ProductCategory";

interface ProductByCategoryPageProps {
  params: Promise<{ category: string }>;
}

async function ProductsByCategoryPage({ params }: ProductByCategoryPageProps) {
  const { category } = await params;

  let products: ProductCategoryProps[] | null = null;
  let errorMessage: string | null = null;

  try {
    products = await getCachedProductsByCategory(category);
  } catch (error: any) {
    // throw the error to error.tsx
    throw error;
  }

  return (
    <div>
      <h1>Produkte in der Kategorie: {category}</h1>

      <ul>
        {products?.map((product, index) => (
          <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
            <ProductByCategoryCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsByCategoryPage;
