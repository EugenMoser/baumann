import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductCategoryProps } from "@/types/ProductCategory";

interface ProductByCategoryCardProps {
  product: ProductCategoryProps;
  index: number;
}

function ProductByCategoryCard({
  product,
  index,
}: ProductByCategoryCardProps): React.JSX.Element {
  return (
    <Link href={`/products/${product.category}/${product.id}`}>
      <Image
        src={`${cloudinaryImageUrl}${product.imageUrlSmall!.replace(/ /g, "_")}`}
        alt={product.name}
        width={48}
        height={48}
        loading="lazy"
      />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description1}</p>
      </div>
    </Link>
  );
}

export default ProductByCategoryCard;
