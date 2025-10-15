"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductByCategoryProps } from "@/types/product";
import {
  RadioGroup,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";

interface ProductByCategoryCardProps {
  product: ProductByCategoryProps;
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
    <Link
      className="flex h-80 min-w-80 flex-col bg-card-background p-6"
      href={`/products/${product.category}/${product.id}`}
    >
      {/* headline + image*/}
      <section className="mb-2 flex min-h-24 items-center gap-6">
        <div className="h-20 min-w-20 overflow-hidden rounded-full">
          <Image
            src={convertedImageUrlSmall}
            alt={product.name}
            width={80}
            height={80}
            loading="lazy"
          />
        </div>
        <h3
          style={{ hyphens: "auto" }}
          className="line-clamp-3 overflow-hidden text-ellipsis whitespace-normal font-bold"
        >
          {product.name}
        </h3>
      </section>
      <hr className="border- mb-2 border-foreground" />
      <div className="flex h-full flex-col justify-between">
        {/* description*/}
        <section>
          <p>{product.description1}</p>
        </section>
        {/* color*/}
        <section>
          <RadioGroup className="flex flex-row">
            {product.colors.map((color, index) => {
              return (
                <div
                  key={color.id}
                  style={{ zIndex: index }}
                  className={clsx({ "ml-[-10px]": index !== 0 })}
                >
                  <RadioGroupItem
                    value={color.id}
                    id={index.toString()}
                    style={
                      {
                        "--bg-color": color.code || "transparent",
                      } as React.CSSProperties
                    }
                    className={`overflow-hidden rounded-full bg-[var(--bg-color)] p-4 ring-1 ring-offset-1`}
                    aria-label={color.name}
                  />
                </div>
              );
            })}
          </RadioGroup>
        </section>
      </div>
    </Link>
  );
}
