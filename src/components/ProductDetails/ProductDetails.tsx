"use client";
import { useState } from "react";

import Link from "next/link";

import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/Product";

import BackButton from "../BackButton";
import ArticleSection from "./ArticleSection";
import ColorSection from "./ColorSection";
import ProductInfoSection from "./ProductInfoSection";
import ProductSection from "./ProductSection";

interface ProductDetailsProps {
  product: ProductWithColorAndArticlesProps;
}

function ProductDetails({ product }: ProductDetailsProps): React.JSX.Element {
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");

  // get selected article object
  const selectedArticle: ArticleProps | undefined =
    product.articles.find((article) => article.id === selectedArticleId) ||
    undefined;

  // get selected color object
  const selectedColor: ColorProps | undefined =
    product.colors.find((color) => color.id === selectedColorId) || undefined;

  return (
    <>
      <section>
        <ProductSection product={product} />
      </section>

      <section>
        <ArticleSection
          articles={product.articles}
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
      <Link
        href={{
          pathname: `/dashboard/updateProduct`,
          query: { id: product?.id },
        }}
      >
        <button>Update Product</button>
      </Link>
    </>
  );
}

export default ProductDetails;
