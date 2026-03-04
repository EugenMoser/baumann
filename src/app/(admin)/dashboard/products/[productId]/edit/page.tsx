import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DeleteArticleButton } from "@/features/article";
import { getAllColors } from "@/features/color";
import { ProductColorManagement } from "@/features/color/components/ProductColorManagement";
import { EditProductForm, getProductByProductId } from "@/features/product";

interface EditProductPageProps {
  params: Promise<{ productId: string }>;
}

/**
 * Dashboard page for editing a product and managing its articles and colors.
 */
export default async function EditProductPage({
  params,
}: EditProductPageProps): Promise<React.JSX.Element> {
  const { productId: productIdStr } = await params;
  const productId = Number(productIdStr);

  if (Number.isNaN(productId)) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Ungültige Produkt-ID.</p>
        <Link href="/dashboard/products" className="text-blue-600 underline">
          Zurück zur Produktliste
        </Link>
      </div>
    );
  }

  let product;
  try {
    product = await getProductByProductId(productId);
  } catch {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Produkt nicht gefunden.</p>
        <Link href="/dashboard/products" className="text-blue-600 underline">
          Zurück zur Produktliste
        </Link>
      </div>
    );
  }

  const allColors = await getAllColors();

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Produkt bearbeiten: {product.name}
        </h1>
        <Link
          href="/dashboard/products"
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          ← Zurück
        </Link>
      </div>

      {/* Product Edit Form */}
      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Produktinformationen</h2>
        <EditProductForm product={product} hideSubmitButton />
      </div>

      {/* Color Management */}
      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Farben</h2>
        <ProductColorManagement
          productId={product.productId}
          currentColors={product.colors}
          allColors={allColors ?? []}
        />
      </div>

      {/* Submit button placed below colors so it's clear it applies all changes */}
      <div className="mb-16 flex justify-start">
        <Button
          type="submit"
          form="edit-product-form"
          className="bg-surface text-primary-foreground hover:bg-surface-hover rounded px-6 py-2"
        >
          Produkt aktualisieren
        </Button>
      </div>

      {/* Articles Section */}
      <div className="rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Artikel ({product.articles.length})
          </h2>
          <Link
            href={`/dashboard/articles/new?productId=${product.id}`}
            className="bg-success hover:bg-success/90 rounded px-4 py-2 text-sm"
          >
            + Neuen Artikel hinzufügen
          </Link>
        </div>

        {product.articles.map((article) => (
          <div key={article.id} className="mb-4 rounded-md border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">
                Artikel: {article.number} - {article.name}
              </h3>
              <div className="flex gap-4">
                <Link
                  href={`/dashboard/articles/${article.id}/edit?q=${productIdStr}`}
                  className="bg-accent hover:bg-accent-hover rounded px-3 py-1 text-sm"
                >
                  Bearbeiten
                </Link>
                <DeleteArticleButton
                  articleId={article.id}
                  articleName={article.name}
                  articleCount={product.articles.length}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
