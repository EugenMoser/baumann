import Image from "next/image";
import { ProductWithColorAndArticlesProps } from "src/types/Product";

import { cloudinaryImageUrl } from "@constants/config";

interface ProductSectionProps {
  product: ProductWithColorAndArticlesProps;
}

function ProductSection({ product }: ProductSectionProps): React.JSX.Element {
  return (
    <>
      <h1>Produkt Infos {product.productId}</h1>

      <p>{product.name}</p>
      <p>{product.description1}</p>
      <p>{product.description2}</p>
      <p>{product.description3}</p>
      <p>{product.description4}</p>
      <p>{product.material}</p>
      <Image
        src={`${cloudinaryImageUrl}${product.imageUrlBig1!.replace(/ /g, "_")}`}
        alt={product.name}
        width={400}
        height={400}
        loading="lazy"
      />
    </>
  );
}

export default ProductSection;
