"use client";
import { log } from "console";
import { useSearchParams } from "next/navigation";
import { ArticleProps } from "src/types/Product";

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
