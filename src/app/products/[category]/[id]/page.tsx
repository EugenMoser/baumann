import { ProductWithColorAndArticlesProps } from "src/types/Product";

import ArticleSection from "@components/ArticleSection";
import BackButton from "@components/BackButton";
import ColorSection from "@components/ColorSection";
import ProductSection from "@components/ProductSection";

import { getCachedProduct } from "./actions";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage({
  params,
}: ProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  let product: ProductWithColorAndArticlesProps | null = null;

  try {
    product = await getCachedProduct(id);
  } catch (error: any) {
    // throw the error to error.tsx
    throw new Error(error);
  }

  // if product is null
  if (!product) {
    return (
      <div>
        <p>Keine Produkte gefunden.</p>
      </div>
    );
  }

  console.log("SINGLE product", product);
  return (
    <>
      <ProductSection product={product} />
      <ArticleSection articles={product.articles} />
      <ColorSection colors={product.colors} />
      <BackButton product={product} />
    </>
  );
}

export default ProductPage;
