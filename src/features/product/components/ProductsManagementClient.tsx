"use client";

import { useState } from "react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <Input
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
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableCell className="p-3 font-semibold">Produkt-ID</TableCell>
                <TableCell className="p-3 font-semibold">Name</TableCell>
                <TableCell className="p-3 font-semibold">Kategorie</TableCell>
                <TableCell className="p-3 font-semibold">
                  Artikelnummern
                </TableCell>
                <TableCell className="p-3 font-semibold">Aktionen</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-muted/50 border-b"
                >
                  <TableCell className="p-3">{product.productId}</TableCell>
                  <TableCell className="p-3 font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="p-3">
                    {getCategoryName(product.category)}
                  </TableCell>
                  <TableCell className="p-3">
                    {product.articles.map((a) => a.number).join(" | ")}
                  </TableCell>
                  <TableCell className="flex gap-2 p-3">
                    <Link
                      href={`/dashboard/products/${product.productId}/edit`}
                      className="btn"
                    >
                      Bearbeiten
                    </Link>
                    <Link
                      href={`/dashboard/articles/new?productId=${product.productId}`}
                      className="btn-create"
                    >
                      + Artikel
                    </Link>
                    <DeleteProductButton
                      productId={product.productId}
                      productName={product.name}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
