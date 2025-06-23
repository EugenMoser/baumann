import Image from "next/image";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductWithColorAndArticlesProps } from "@/types/ProductProps";

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
      <div className="flex aspect-[4/3] w-[400px] justify-center">
        <Image
          src={`${cloudinaryImageUrl}${product.imageUrlBig1!.replace(/ /g, "_")}`}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          className="object-contain"
        />
      </div>
    </>
  );
}

export default ProductSection;
