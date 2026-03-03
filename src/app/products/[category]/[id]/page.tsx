import { notFound } from "next/navigation";

import { getCachedProductById } from "@/features/product";

import ProductDetailClient from "./product-detail-client";

interface ProductDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

/**
 * Public product detail page.
 * Fetches product data on the server and passes it to the client component
 * for interactive article/color selection.
 */
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  try {
    const product = await getCachedProductById(id);
    return (
      <main className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">{product.name}</h1>
        <ProductDetailClient product={product} />
      </main>
    );
  } catch {
    notFound();
  }
}
