"use client";
import { useSearchParams } from "next/navigation";
import { ArticleProps } from "src/types/Product";

interface ProductInfoSectionProps {
  selectedArticle: ArticleProps | null;
}

function ProductInfoSection({
  selectedArticle,
}: ProductInfoSectionProps): React.JSX.Element {
  return (
    <div>
      <h2>Produktinfos</h2>
      {selectedArticle && <p>{selectedArticle?.number}</p>}
      {!selectedArticle! && <p>kein Artikel ausgewählt</p>}
    </div>
  );
}

export default ProductInfoSection;
