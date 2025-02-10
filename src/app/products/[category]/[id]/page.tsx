import { ProductWithColorAndArticlesProps } from "src/types/Product";

import ProductClientPage from "@components/ProductClientPage";

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

  return (
    <>
      <ProductClientPage product={product} />
    </>
  );
}

export default ProductPage;
