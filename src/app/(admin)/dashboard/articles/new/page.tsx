"use client";
import { useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ArticleForm from "@/features/article/forms/ArticleForm";

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

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1>Artikel hinzufügen </h1>
        <Link href="/dashboard/products" className="btn-secondary">
          ← Zurück
        </Link>
      </div>
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
