import { Suspense } from "react";

import ProductCardByCategory from "@/components/products/ProductCardByCategory";
import productCategories from "@/constants/productCategories";
import { getCachedProductByCategory } from "@/lib/database";
import { ProductByCategoryProps } from "@/types/productProps";

import Loading from "./loading";

interface ProductsByCategoryPageProps {
  params: Promise<{ category: string }>;
}
async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const products: ProductByCategoryProps[] =
    await getCachedProductByCategory(category);

  const categoryName = productCategories.find((productcategory) => {
    return productcategory.category === category;
  })?.name;

  return (
    <main>
      <h1> {categoryName}</h1>
      <Suspense fallback={<Loading />}>
        <ul className="dynamicGrid grid gap-6 rounded-sm">
          {products.map((product: ProductByCategoryProps) => (
            <li key={product.id}>
              <ProductCardByCategory product={{ ...product }} />
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}

export default ProductsByCategoryPage;
