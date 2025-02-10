"use client";
import { useState } from "react";

import {
  ArticleProps,
  ProductWithColorAndArticlesProps,
} from "src/types/Product";

import ArticleSection from "@components/ArticleSection";
import BackButton from "@components/BackButton";
import ColorSection from "@components/ColorSection";
import ProductInfoSection from "@components/ProductInfoSection";
import ProductSection from "@components/ProductSection";

interface ProductClientPageProps {
  product: ProductWithColorAndArticlesProps;
}

function ProductClientPage({
  product,
}: ProductClientPageProps): React.JSX.Element {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    product.articles[0].id,
  );

  //todo sort articles by prio
  const selectedArticle: ArticleProps | null =
    product.articles.find((article) => article.id === selectedArticleId) ||
    null;

  console.log("ARTICLE ID", selectedArticleId);
  console.log("SELECTED ARTICLE", selectedArticle);
  return (
    <>
      <section>
        <ProductSection product={product} />
      </section>

      <section>
        <ArticleSection
          articles={product.articles}
          onSelect={setSelectedArticleId}
        />
      </section>

      <section>
        <ColorSection colors={product.colors} />
      </section>

      <section>
        <ProductInfoSection selectedArticle={selectedArticle} />
      </section>

      <section>
        <BackButton product={product} />
      </section>
    </>
  );
}

export default ProductClientPage;
