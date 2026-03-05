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
        <p className="text-destructive">Ungültige Produkt-ID.</p>
        <Link href="/dashboard/products" className="btn-secondary">
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
        <p className="text-destructive">Produkt nicht gefunden.</p>
        <Link href="/dashboard/products" className="btn-secondary">
          Zurück zur Produktliste
        </Link>
      </div>
    );
  }

  const allColors = await getAllColors();

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Produkt bearbeiten: {product.name}</h1>
        <Link href="/dashboard/products" className="btn-secondary">
          ← Zurück
        </Link>
      </div>

      {/* Product Edit Form */}
      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4">Produktinformationen</h2>
        <EditProductForm product={product} />
      </div>

      {/* Color Management */}
      <div className="mb-8 rounded-lg border p-6">
        <h2>Farben</h2>
        <ProductColorManagement
          productId={product.productId}
          currentColors={product.colors}
          allColors={allColors ?? []}
        />
      </div>

      {/* Submit button placed below colors so it's clear it applies all changes */}
      <div className="mb-16 flex justify-start">
        <Button type="submit" form="edit-product-form" className="btn">
          Produkt aktualisieren
        </Button>
      </div>

      {/* Articles Section */}
      <div className="rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2>Artikel ({product.articles.length})</h2>
          <Link
            href={`/dashboard/articles/new?productId=${product.id}`}
            className="btn-create"
          >
            + Neuen Artikel hinzufügen
          </Link>
        </div>

        {product.articles.map((article) => (
          <div key={article.id} className="mb-4 rounded-md border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3>
                Artikel: {article.number} - {article.name}
              </h3>
              <div className="flex gap-4">
                <Link
                  href={`/dashboard/articles/${article.id}/edit?q=${productIdStr}`}
                  className="btn"
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
