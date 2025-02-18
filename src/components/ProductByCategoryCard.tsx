import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductCategoryProps } from "@/types/ProductCategory";

interface ProductByCategoryCardProps {
  product: ProductCategoryProps;
}

async function ProductByCategoryCard({
  product,
}: ProductByCategoryCardProps): Promise<React.JSX.Element> {
  return (
    <>
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
    </>
  );
}

export default ProductByCategoryCard;
