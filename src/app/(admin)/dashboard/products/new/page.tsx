import Link from "next/link";

import { getAllColors } from "@/features/color";
import { ProductWithArticleForm } from "@/features/product/forms/ProductWithArticleForm";

/**
 * Server component: fetches available colors and renders the product creation form.
 */
export default async function AddProductPage(): Promise<React.JSX.Element> {
  const colors = await getAllColors();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Produkt mit Artikel hinzufügen</h1>
        <Link href="/dashboard/products" className="btn-secondary">
          ← Zurück
        </Link>
      </div>
      <ProductWithArticleForm colors={colors ?? []} />
    </div>
  );
}
