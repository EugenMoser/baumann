import { Suspense } from "react";

import { getCachedProductsByCategory } from "@/actions/actions";
import ProductByCategoryCard from "@/components/ProductByCategoryCard";
import { ProductCategoryProps } from "@/types/ProductCategory";

interface ProductsByCategoryPageProps {
  params: Promise<{ category: string }>;
}
async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const products: ProductCategoryProps[] =
    await getCachedProductsByCategory(category);

  return (
    <>
      <h1>Produkte nach Kategorie: {category}</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
            <ProductByCategoryCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsByCategoryPage;
