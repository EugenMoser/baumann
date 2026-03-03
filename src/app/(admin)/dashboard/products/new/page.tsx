"use client";

import { useState } from "react";

import { redirect } from "next/navigation";

import { ProductWithArticleForm } from "@/features/product/forms/ProductWithArticleForm";

export default function AddProductPage(): React.JSX.Element {
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Produkt mit Artikel hinzufügen
      </h1>

      {createdProductId ? (
        <div className="rounded-lg border border-green-500 bg-green-50 p-4">
          <p className="text-green-800">
            ✓ Produkt und Artikel erfolgreich angelegt!
          </p>
          <p className="text-green-800">
            Möchtest du einen Weiteren Artikel für dieses Produkt
            {createdProductId} hinzufügen?
          </p>
          <button
            onClick={() =>
              redirect(`/dashboard/articles/new?productId=${createdProductId}`)
            }
            className="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Weiteren Artikel hinzufügen
          </button>
        </div>
      ) : (
        <ProductWithArticleForm onSuccess={setCreatedProductId} />
      )}
    </div>
  );
}
