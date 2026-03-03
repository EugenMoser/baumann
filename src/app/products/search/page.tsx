import { searchProductCards } from "@/features/product/actions/queries/searchProductCards";
import { ProductCardByCategory } from "@/features/product/components/ProductCardByCategory";
import { ProductByCategoryProps } from "@/features/product/types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Public search results page.
 * Renders matching products as ProductCardByCategory cards.
 */
export default async function SearchPage({
  searchParams,
}: SearchPageProps): Promise<React.JSX.Element> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products: ProductByCategoryProps[] = query
    ? await searchProductCards(query)
    : [];

  return (
    <main className="py-6">
      <h1 className="mb-6 text-2xl font-bold">
        Suchergebnisse{query ? ` für „${query}"` : ""}
      </h1>

      {query && products.length === 0 && (
        <p className="text-muted-foreground">
          Kein Produkt für „{query}" gefunden.
        </p>
      )}

      {products.length > 0 && (
        <ul className="dynamicGrid grid gap-6">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCardByCategory product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
