import Link from "next/link";

import productCategories from "@/constants/productCategories";
import { DeleteProductButton, getAllProducts } from "@/features/product";

/**
 * Dashboard page listing all products with edit and delete options.
 */
export default async function ProductsManagementPage(): Promise<React.JSX.Element> {
  const products = await getAllProducts();

  const getCategoryName = (category: string) =>
    productCategories.find((c) => c.category === category)?.name ?? category;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produktverwaltung</h1>
        <Link
          href="/dashboard/products/new"
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          + Neues Produkt
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">Keine Produkte vorhanden.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-3 font-semibold">Produkt-ID</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Kategorie</th>
                <th className="p-3 font-semibold">Prio</th>
                <th className="p-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 border-b">
                  <td className="p-3">{product.productId}</td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{getCategoryName(product.category)}</td>
                  <td className="p-3">{product.prio}</td>
                  <td className="flex gap-2 p-3">
                    <Link
                      href={`/dashboard/products/${product.productId}`}
                      className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                    >
                      Bearbeiten
                    </Link>
                    <Link
                      href={`/dashboard/articles/new?productId=${product.id}`}
                      className="rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700"
                    >
                      + Artikel
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
    </div>
  );
}
