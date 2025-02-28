"use client";

import { MouseEventHandler } from "react";

import addThousendSeperator from "@/lib/utils/addThousendSeperator";
import sendInquiry from "@/lib/utils/sendInquire";
import {
  ArticleProps,
  ColorProps,
} from "@/types/Product";

interface ProductInfoSectionProps {
  selectedArticle: ArticleProps | undefined;
  selectedColor: ColorProps | undefined;
}

function getAllFeatures(article: ArticleProps): React.JSX.Element {
  const descriptions: (string | null)[] = [
    article.description1,
    article.description2,
    article.description3,
    article.description4,
  ].filter(Boolean);

  return (
    <>
      {descriptions.length > 0 && (
        <>
          <h2>Besonderheiten</h2>
          <ul>
            {descriptions.map((description: string | null) => (
              <li key={article.id + description}>{description}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function getAllVPE(article: ArticleProps): React.JSX.Element {
  const vpe: (string | null)[] = [
    article.vpe1,
    article.vpe2,
    article.vpe3,
    article.vpe4,
  ].filter(Boolean);

  return (
    <>
      {vpe.length > 0 && (
        <>
          <h2>Mögliche Verpackungseinheiten (VPE):</h2>
          <ul>
            {vpe.map((vpe: string | null) => (
              <li key={article.id + vpe}>{addThousendSeperator(vpe)} Stück</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function ProductInfoSection({
  selectedArticle,
  selectedColor,
}: ProductInfoSectionProps): React.JSX.Element {
  if (!selectedArticle)
    return <p>bitte wählen Sie einen Artikel und eine Farbe aus</p>;

  // if suffix is 0, dont show suffix
  const articleWithColorNumber: string =
    selectedColor?.colorSuffix !== 0
      ? `${selectedArticle.number}-${selectedColor?.colorSuffix}`
      : selectedArticle.number;

  return (
    <div>
      <h2>Produktinfos</h2>
      {selectedArticle && selectedColor && (
        <>
          <p>Artikelnummer: {articleWithColorNumber}</p>
          {getAllFeatures(selectedArticle)}
          {getAllVPE(selectedArticle)}
          <button onClick={() => sendInquiry(articleWithColorNumber)}>
            Unverbindlich anfragen
          </button>
        </>
      )}
    </div>
  );
}

export default ProductInfoSection;
