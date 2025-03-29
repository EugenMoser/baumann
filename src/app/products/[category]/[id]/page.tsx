import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import ArticleSection from "@/components/ProductDetails/ArticleSection";
import ColorSection from "@/components/ProductDetails/ColorSection";
import ProductInfoSection from "@/components/ProductDetails/ProductInfoSection";
import ProductSection from "@/components/ProductDetails/ProductSection";
import { getCachedProduct } from "@/lib/database";
import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/Product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    article?: string;
    color?: string;
  }>;
}
async function ProductPage({
  params,
  searchParams,
}: ProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const selectedArticleId = (await searchParams)?.article || "";
  const selectedColorId = (await searchParams)?.color || "";

  const product: ProductWithColorAndArticlesProps = await getCachedProduct(id);

  // <ProductDetails product={product} articleId={articleId} colorId={colorId} />

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
        <ArticleSection articles={product.articles} />
      </section>

      <section>
        <ColorSection colors={product.colors} selectedColor={selectedColor} />
      </section>

      <section>
        <ProductInfoSection
          selectedArticle={selectedArticle}
          selectedColor={selectedColor}
        />
      </section>

      <section>
        <CustomButton
          type="button"
          buttonType="home"
          category={product.category}
        />
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

export default ProductPage;
