"use client";
import { useState } from "react";

import ArticleDetailsForm from "@/components/forms/ArticleDetailsForm";
import SearchProductCombobox from "@/components/products/SearchProductCombobox";

function AddArticlePage(): React.JSX.Element {
  const [productId, setProductId] = useState<number | null>(null);

  function productIdHandler(id: number) {
    setProductId(id);
  }
  return (
    <>
      <SearchProductCombobox productIdHandler={productIdHandler} />
      {productId && <ArticleDetailsForm productId={productId} />}
    </>
  );
}
export default AddArticlePage;
