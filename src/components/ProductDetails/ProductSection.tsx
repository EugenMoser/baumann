import { ProductWithColorAndArticlesProps } from "@/types/ProductProps";

import ImageCarousell from "./ImageCarousel";

interface ProductSectionProps {
  product: ProductWithColorAndArticlesProps;
}

export default function ProductSection({
  product,
}: ProductSectionProps): React.JSX.Element {
  return (
    <>
      <h3 className="mb-4">{product.description1}</h3>
      <div className="mb-4">
        <p>{product.description2}</p>
        <p>{product.description3}</p>
        <p>{product.description4}</p>
      </div>
      <p className="mb-6">{product.material}</p>
      <ImageCarousell product={product} />
    </>
  );
}
