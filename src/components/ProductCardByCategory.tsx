"use client";
import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductCategoryProps } from "@/types/ProductCategoryProps";

interface ProductByCategoryCardProps {
  product: ProductCategoryProps;
}

export default function ProductCardByCategory({
  product,
}: ProductByCategoryCardProps): React.JSX.Element {
  // check if product.imageUrlSmall is start with "http" or "https"
  // if not, prepend cloudinaryImageUrl and replace spaces with underscores
  const convertedImageUrlSmall =
    product.imageUrlSmall &&
    (product.imageUrlSmall.startsWith("http") ||
      product.imageUrlSmall.startsWith("https"))
      ? // its the new image url uploaded via form
        product.imageUrlSmall
      : // its the old image url, uploaded manually
        `${cloudinaryImageUrl}${product.imageUrlSmall!.replace(/ /g, "_")}`;

  return (
    <>
      <Link href={`/products/${product.category}/${product.id}`}>
        <Image
          src={convertedImageUrlSmall}
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
