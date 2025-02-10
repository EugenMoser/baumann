"use client";

import { redirect } from "next/navigation";

import { ProductWithColorAndArticlesProps } from "@/types/Product";

interface BackButtonProps {
  product: ProductWithColorAndArticlesProps;
}

function BackButton({ product }: BackButtonProps): React.JSX.Element {
  function onClickHandler(product: ProductWithColorAndArticlesProps) {
    redirect(`/products/${product.category}`);
  }
  return <button onClick={() => onClickHandler(product)}>Zurück</button>;
}

export default BackButton;
