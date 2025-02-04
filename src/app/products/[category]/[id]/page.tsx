import { ProductWithColorAndArticlesProps } from "src/types/Product";

import BackButton from "@components/BackButton";
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
      <BackButton product={product} />
    </>
  );
}

export default ProductPage;
