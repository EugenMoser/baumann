import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/constants/config";
import { ProductByCategoryProps } from "@/features/product/types";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

interface ProductByCategoryCardProps {
  product: ProductByCategoryProps;
}

export function ProductCardByCategory({
  product,
}: ProductByCategoryCardProps): React.JSX.Element {
  // Use first small image; handle both full http URLs and cloudinary-relative paths
  const firstSmallImage = product.imageUrlsSmall?.[0] ?? null;
  const convertedImageUrlSmall = firstSmallImage
    ? firstSmallImage.startsWith("http") || firstSmallImage.startsWith("https")
      ? firstSmallImage
      : `${cloudinaryImageUrl}${firstSmallImage.replace(/ /g, "_")}`
    : null;
  return (
    <Link
      className="mx-16 flex h-64 min-w-80 flex-col bg-card-background p-6 md:mx-0 md:h-72"
      href={`/products/${product.category}/${product.id}`}
    >
      {/* image + headline */}
      <section className="mb-2 flex max-h-24 min-h-24 items-center gap-6 overflow-auto">
        <div className="h-20 min-w-20 overflow-hidden rounded-full">
          {convertedImageUrlSmall ? (
            <Image
              src={convertedImageUrlSmall}
              alt={product.name}
              width={80}
              height={80}
              loading="lazy"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200" />
          )}
        </div>
        <h3
          style={{ hyphens: "auto" }}
          className="line-clamp-3 overflow-hidden whitespace-normal font-bold"
        >
          {product.name}
        </h3>
      </section>
      <hr className="border- mb-2 border-foreground" />
      <div className="flex h-full flex-col justify-between">
        {/* description*/}
        <section className="line-clamp-2 overflow-hidden whitespace-normal md:line-clamp-3">
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
