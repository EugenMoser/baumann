import Link from "next/link";

import { getAllProducts } from "@/features/product";

import ProductsManagementClient from "./ProductsManagementClient";

/**
 * Dashboard page listing all products with search, edit and delete options.
 */
export default async function ProductsManagementPage(): Promise<React.JSX.Element> {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produktverwaltung</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            ← Dashboard
          </Link>
          <Link
            href="/dashboard/products/new"
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Neues Produkt
          </Link>
        </div>
      </div>

      <ProductsManagementClient products={products} />
    </div>
  );
}
