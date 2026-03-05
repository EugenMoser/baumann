import Link from "next/link";

import { getAllProducts } from "@/features/product";

import ProductsManagementClient from "../../../../features/product/components/ProductsManagementClient";

/**
 * Dashboard page listing all products with search, edit and delete options.
 */
export default async function ProductsManagementPage(): Promise<React.JSX.Element> {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Produktverwaltung</h1>
        <div className="flex gap-3">
          <Link href="/dashboard" className="btn-secondary">
            ← Dashboard
          </Link>
          <Link href="/dashboard/products/new" className="btn-create">
            + Neues Produkt
          </Link>
        </div>
      </div>

      <ProductsManagementClient products={products} />
    </div>
  );
}
