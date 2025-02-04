import Image from "next/image";
import Link from "next/link";
import { ProductCategoryProps } from "src/types/ProductCategory";

import { cloudinaryImageUrl } from "@constants/config";

interface ProductByCategoryCardProps {
  product: ProductCategoryProps;
  index: number;
}

function ProductByCategoryCard({
  product,
  index,
}: ProductByCategoryCardProps): React.JSX.Element {
  return (
    <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
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
    </li>
  );
}

export default ProductByCategoryCard;
