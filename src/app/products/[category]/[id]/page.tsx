import { Suspense } from "react";

import { getCachedProduct } from "@/actions/actions";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { ProductWithColorAndArticlesProps } from "@/types/Product";

import Loading from "../loading";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}
async function ProductPage({
  params,
}: ProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const product: ProductWithColorAndArticlesProps = await getCachedProduct(id);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductDetails product={product} />
      </Suspense>
    </div>
  );
}

export default ProductPage;
