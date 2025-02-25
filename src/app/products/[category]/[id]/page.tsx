"use client";
import {
  Suspense,
  use,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import ArticleSection from "@/components/ArticleSection";
import BackButton from "@/components/BackButton";
import ColorSection from "@/components/ColorSection";
import ProductInfoSection from "@/components/ProductInfoSection";
import ProductSection from "@/components/ProductSection";
import { getCachedProduct } from "@/lib/server-actions/productActions";
import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/Product";

import Loading from "../loading";

function ProductPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] =
    useState<ProductWithColorAndArticlesProps | null>(null);

  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        const productData: ProductWithColorAndArticlesProps | null =
          await getCachedProduct(id);

        if (!productData) {
          throw new Error("Product not found");
        }
        setProduct(productData);

        // Set the first color to default selected color if product is fetched
        productData.colors.length > 0 &&
          setSelectedColorId(productData.colors[0].id);
      };
      fetchProduct();
    } catch (error) {
      console.error("Fehler beim Abrufen des Produkts:", error);
      // throw the error to error.tsx
      throw error;
    }
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  // get selected article object
  const selectedArticle: ArticleProps | undefined =
    product.articles.find((article) => article.id === selectedArticleId) ||
    undefined;

  // copy the array and sort articles by prio
  const sortedArticles = [...product.articles].sort((a, b) => a.prio - b.prio);

  // get selected color object
  const selectedColor: ColorProps | undefined =
    product.colors.find((color) => color.id === selectedColorId) || undefined;

  return (
    <Suspense fallback={<Loading />}>
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
      <Link
        href={{
          pathname: `/dashboard/updateProduct`,
          query: { id: product?.id },
        }}
      >
        <button>Update Product</button>
      </Link>
    </Suspense>
  );
}

export default ProductPage;
