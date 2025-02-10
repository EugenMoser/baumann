"use client";

import { ArticleProps } from "@/types/Product";

interface ProductInfoSectionProps {
  selectedArticle: ArticleProps | undefined;
}

function ProductInfoSection({
  selectedArticle,
}: ProductInfoSectionProps): React.JSX.Element {
  console.log("SELECTED ARTICLE !!!!!!!!!!", selectedArticle);
  return (
    <div>
      <h2>Produktinfos</h2>
      {selectedArticle && <p>{selectedArticle?.number}</p>}
      {!selectedArticle! && <p>kein Artikel ausgewählt</p>}
    </div>
  );
}

export default ProductInfoSection;
