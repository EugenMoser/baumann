"use client";
import { Suspense, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getCachedProductsByCategory } from "@/actions/actions";
import ProductByCategoryCard from "@/components/ProductByCategoryCard";
import { ProductCategoryProps } from "@/types/ProductCategory";

import Loading from "./loading";

function ProductsByCategoryPage(): React.JSX.Element {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductCategoryProps[] | null>(null);

  useEffect(() => {
    try {
      const fetchProductsByCategory = async () => {
        const productsData: ProductCategoryProps[] | null =
          await getCachedProductsByCategory(category);

        if (!productsData) {
          throw new Error("Products not found");
        }
        setProducts(productsData);
      };
      fetchProductsByCategory();
    } catch (error: any) {
      console.error("Fehler beim Abrufen der Produkte:", error);
      // throw the error to error.tsx
      throw error;
    }
  }, [category]);

  return (
    <Suspense fallback={<Loading />}>
      <h1>Produkte in der Kategorie: {category}</h1>

      <ul>
        {products &&
          products.map((product, index) => (
            <li
              key={index}
              className="mb-6 flex items-center gap-6 bg-slate-200"
            >
              <ProductByCategoryCard product={product} />
            </li>
          ))}
      </ul>
    </Suspense>
  );
}

export default ProductsByCategoryPage;
