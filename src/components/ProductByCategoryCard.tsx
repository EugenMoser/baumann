import Image from "next/image";
import { ProductCategory } from "src/types/ProductCategory";

import { cloudinaryImageUrl } from "@constants/config";

interface ProductByCategoryCardProps {
  products: ProductCategory[];
}

function ProductByCategoryCard({
  products,
}: ProductByCategoryCardProps): React.JSX.Element {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
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
        </li>
      ))}
    </ul>
  );
}

export default ProductByCategoryCard;
