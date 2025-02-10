"use client";
import { useEffect, useState } from "react";

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
  const [selectedArticleId, setSelectedArticleId] = useState<
    string | undefined
  >(undefined);

  // get selected article object
  const selectedArticle: ArticleProps | undefined =
    product.articles.find((article) => article.id === selectedArticleId) ||
    undefined;

  // sort articles by prio
  const sortedArticles = product.articles.sort((a, b) => a.prio - b.prio);

  console.log("ARTICLE ID", selectedArticleId);
  console.log("SELECTED ARTICLE", selectedArticle);
  console.log("Articles LENGTH", product.articles.length);
  console.log(
    "sortedArticles",
    sortedArticles.map((article) => article.prio),
  );

  return (
    <>
      <section>
        <ProductSection product={product} />
      </section>

      <section>
        <ArticleSection
          articles={sortedArticles}
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
