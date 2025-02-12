"use client";
import {
  useEffect,
  useState,
} from "react";

import ArticleSection from "@/components/ArticleSection";
import BackButton from "@/components/BackButton";
import ColorSection from "@/components/ColorSection";
import ProductInfoSection from "@/components/ProductInfoSection";
import ProductSection from "@/components/ProductSection";
import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/Product";

interface ProductClientPageProps {
  product: ProductWithColorAndArticlesProps;
}

function ProductClientPage({
  product,
}: ProductClientPageProps): React.JSX.Element {
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");

  // initial default color value is the first color
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.colors[0].id,
  );

  // get selected article object
  const selectedArticle: ArticleProps | undefined =
    product.articles.find((article) => article.id === selectedArticleId) ||
    undefined;

  // copy the array and sort articles by prio
  const sortedArticles = [...product.articles].sort((a, b) => a.prio - b.prio);

  const selectedColor: ColorProps | undefined =
    product.colors.find((color) => color.id === selectedColorId) || undefined;

  console.log("PRODUCT", product);

  return (
    <>
      <section>
        <ProductSection product={product} />
      </section>

      <section>
        <ArticleSection
          articles={sortedArticles}
          selectedArticleId={selectedArticleId}
          onSelect={setSelectedArticleId}
        />
      </section>

      <section>
        <ColorSection
          colors={product.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColorId}
        />
      </section>

      <section>
        <ProductInfoSection
          selectedArticle={selectedArticle}
          selectedColor={selectedColor}
        />
      </section>

      <section>
        <BackButton product={product} />
      </section>
      <h4 className="bg-black">background</h4>
    </>
  );
}

export default ProductClientPage;
