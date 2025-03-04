import { Suspense } from "react";

import { getCachedProduct } from "@/actions/actions";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { ProductWithColorAndArticlesProps } from "@/types/Product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}
async function ProductPage({
  params,
}: ProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const product: ProductWithColorAndArticlesProps = await getCachedProduct(id);

  return <ProductDetails product={product} />;
}

export default ProductPage;
