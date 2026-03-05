import Link from "next/link";

import { EditArticleForm } from "@/features/article";
import { prisma } from "@/lib/prisma";

interface EditArticlePageProps {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ q: string }>;
}

/**
 * Dedicated page for editing a single article.
 * Navigated to from the product detail page via a "Bearbeiten" link.
 */
export default async function EditArticlePage({
  params,
  searchParams,
}: EditArticlePageProps): Promise<React.JSX.Element> {
  const { articleId } = await params;

  const { q: productIdStr } = await searchParams;
  const productId = Number(productIdStr);
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Artikel nicht gefunden.</p>
        <Link
          href={`/dashboard/products/${productId}`}
          className="btn-secondary"
        >
          Zurück zum Produkt
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>
          Artikel bearbeiten: {article.number} – {article.name}
        </h1>
        <Link
          href={`/dashboard/products/${productId}/edit`}
          className="btn-secondary"
        >
          ← Zurück
        </Link>
      </div>
      <div className="rounded-lg border p-6">
        <EditArticleForm
          article={article}
          redirectTo={`/dashboard/products/${productId}/edit`}
        />
      </div>
    </div>
  );
}
