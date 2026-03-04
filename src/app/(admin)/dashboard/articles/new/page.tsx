"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

import ArticleForm from "@/features/article/forms/ArticleForm";
import SearchProductCombobox from "@/features/product/components/ProductSearchCombobox";

function AddArticlePage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const urlProductId = searchParams.get("productId");
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Use the product ID from the URL or the one selected by the user
  const productId =
    selectedProduct?.id ?? (urlProductId ? Number(urlProductId) : null);

  function handleProductSelect(product: { id: number; name: string }) {
    setSelectedProduct(product);
  }

  return (
    <>
      <h2>----------- Artikel hinzufügen --------------</h2>

      {productId && (
        <ArticleForm
          productId={productId}
          selectedProductName={selectedProduct?.name}
        />
      )}
    </>
  );
}
export default AddArticlePage;
