"use client";

import { useState } from "react";

import Link from "next/link";

import productCategories from "@/constants/productCategories";
import { DeleteProductButton } from "@/features/product";
import { ProductWithArticles } from "@/features/product/actions/queries/getAllProducts";

interface ProductsManagementClientProps {
  products: ProductWithArticles[];
}

/**
 * Client component for products management with search by product name or article name/number.
 */
export default function ProductsManagementClient({
  products,
}: ProductsManagementClientProps): React.JSX.Element {
  const [search, setSearch] = useState("");

  const getCategoryName = (category: string) =>
    productCategories.find((c) => c.category === category)?.name ?? category;

  const q = search.toLowerCase().trim();
  const filtered = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.articles.some(
            (a) =>
              a.name.toLowerCase().includes(q) ||
              a.number.toLowerCase().includes(q),
          ),
      )
    : products;

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche nach Produktname oder Artikelname/-nummer..."
          className="w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="off"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Keine Produkte gefunden.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3 font-semibold">Produkt-ID</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Kategorie</th>
                <th className="p-3 font-semibold">Artikelnummern</th>
                <th className="p-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 border-b">
                  <td className="p-3">{product.productId}</td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{getCategoryName(product.category)}</td>
                  <td className="p-3">
                    {product.articles.map((a) => a.number).join(" | ")}
                  </td>
                  <td className="flex gap-2 p-3">
                    <Link
                      href={`/dashboard/products/${product.productId}/edit`}
                      className="hover:bg-accent-hover/80 bg-accent/90 flex items-center rounded-md px-3 py-1 text-xs text-white"
                    >
                      Bearbeiten
                    </Link>
                    <Link
                      href={`/dashboard/articles/new?productId=${product.productId}`}
                      className="bg-accent hover:bg-accent-hover flex w-min items-center rounded-md px-3 py-1 text-xs text-white"
                    >
                      + Artikel hinzufügen
                    </Link>
                    <DeleteProductButton
                      productId={product.productId}
                      productName={product.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
