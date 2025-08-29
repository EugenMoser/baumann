"use client";
import { Suspense, useEffect, useState } from "react";

import clsx from "clsx";
import Image from "next/image";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cloudinaryImageUrl } from "@/constants/config";

import PlaceholderImage from "./PlaceholderImage";

interface ImageCarousellProps {
  product: {
    name: string;
    imageUrlBig1: string;
    imageUrlBig2?: string | null;
    imageUrlBig3?: string | null;
  };
}

export default function ImageCarousell({
  product,
}: ImageCarousellProps): React.JSX.Element {
  const urlArray = [
    product.imageUrlBig1,
    product.imageUrlBig2,
    product.imageUrlBig3,
  ]
    .filter(Boolean) // Remove any null or undefined values
    .map((url) => cloudinaryImageUrl + url!.replace(/ /g, "_")); // Prepend cloudinaryImageUrl and replace spaces with underscores

  console.log("----->>>>> url Array", urlArray);
  const [existsUrl, setExistsUrl] = useState<string[]>([]);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window === "undefined") return;

    // check all images in parallel
    Promise.all(
      urlArray.map(
        (url) =>
          new Promise<string | null>((resolve) => {
            const image = new window.Image();
            // Set the image src to trigger loading
            image.src = url;
            image.onload = () => resolve(url);
            image.onerror = () => resolve(null);
            image.src = url;
          }),
      ),
    ).then((results) => {
      // Filter out any null results
      setExistsUrl(results.filter(Boolean) as string[]);
    });
  }, []);

  return (
    <>
      <Suspense fallback={<PlaceholderImage />}>
        {existsUrl.length > 0 ? (
          <Carousel
            className={clsx(
              "buttonChildSelector mb-6 max-w-[500px]",
              existsUrl.length === 1 && "[&>button]:hidden", // hides arrow buttons
            )}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {existsUrl.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="justify-self-center p-1">
                    <Image
                      src={url}
                      alt={product.name}
                      width={500}
                      height={300}
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <PlaceholderImage />
        )}
      </Suspense>
    </>
  );
}
