"use client";

import { useSearchParams } from "next/navigation";

import ArticleSection from "@/features/article/components/ArticleSection";
import ColorSection from "@/features/color/components/ColorSection";
import { ProductInfoSection } from "@/features/product/components/ProductInfoSection";
import ProductSection from "@/features/product/components/ProductSection";
import { ProductWithColorAndArticlesProps } from "@/features/product/types";

interface ProductDetailClientProps {
  product: ProductWithColorAndArticlesProps;
}

/**
 * Client component for the product detail page.
 * Reads article and color selection from URL search params
 * and renders the corresponding sections.
 */
export default function ProductDetailClient({
  product,
}: ProductDetailClientProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const selectedArticleId = searchParams.get("article");
  const selectedColorId = searchParams.get("color");

  const selectedArticle = product.articles.find(
    (a) => a.id === selectedArticleId,
  );
  const selectedColor = product.colors.find((c) => c.id === selectedColorId);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left column: Product info, images */}
      <div>
        <ProductSection product={product} />
      </div>

      {/* Right column: Article + Color selection, product details */}
      <div>
        {product.articles.length > 0 && (
          <ArticleSection articles={product.articles} />
        )}
        {product.colors.length > 0 && <ColorSection colors={product.colors} />}
        <ProductInfoSection
          selectedArticle={selectedArticle}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
}
