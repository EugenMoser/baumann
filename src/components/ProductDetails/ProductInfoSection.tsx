"use client";

import clsx from "clsx";

import addThousendSeperator from "@/lib/helpers/addThousendSeparator";
import sendInquiry from "@/lib/helpers/sendInquire";
import {
  ArticleProps,
  ColorProps,
} from "@/types/ProductProps";

import { Button } from "../ui/button";

interface ProductInfoSectionProps {
  selectedArticle: ArticleProps | undefined;
  selectedColor: ColorProps | undefined;
}

//todo move to helper file
function getAllFeatures(article: ArticleProps): React.ReactNode {
  const descriptions: (string | null)[] = [
    article.description1,
    article.description2,
    article.description3,
    article.description4,
  ].filter(Boolean);

  if (descriptions.length === 0) return null;
  return (
    <>
      <h3>Besonderheiten</h3>
      <ul>
        {descriptions.map((description: string | null) => (
          <li key={article.id + description}>{description}</li>
        ))}
      </ul>
    </>
  );
}
//todo move to helper file
function getAllVPE(article: ArticleProps): React.ReactNode {
  const vpe: (string | null)[] = [
    article.vpe1,
    article.vpe2,
    article.vpe3,
    article.vpe4,
  ].filter(Boolean);

  if (vpe.length === 0) return null;

  return (
    <>
      <h3>Mögliche Verpackungseinheiten (VPE):</h3>
      {/* //todo ListWithHeadline move to list component  */}
      <ul>
        {vpe.map((vpe: string | null) => (
          <li key={article.id + vpe}>{addThousendSeperator(vpe)} Stück</li>
        ))}
      </ul>
    </>
  );
}

function ProductInfoSection({
  selectedArticle,
  selectedColor,
}: ProductInfoSectionProps): React.JSX.Element {
  //  if suffix is 0, don't show suffix
  const articleWithColorNumber: string =
    selectedColor?.colorSuffix !== 0 && selectedArticle
      ? `${selectedArticle.number}-${selectedColor?.colorSuffix}`
      : (selectedArticle?.number ?? "");

  return (
    // <div className="flex flex-col border p-4">
    <div
      className={clsx(
        "flex flex-col border p-4",
        !selectedArticle && "bg-red-500",
      )}
    >
      {!selectedArticle && (
        <p className="self-center p-4 font-extrabold">
          Bitte wählen Sie einen Artikel und eine Farbe aus.
        </p>
      )}
      {selectedArticle && selectedColor && (
        <>
          <h2 className="font-bold">Artikelnummer: {articleWithColorNumber}</h2>
          {getAllFeatures(selectedArticle)}
          {getAllVPE(selectedArticle)}
          <Button
            className="al bg-button-background text-button-foreground hover:bg-button-hover hover:text-button w-[50%] self-end rounded-md"
            onClick={() => sendInquiry(articleWithColorNumber)}
          >
            Unverbindlich anfragen
          </Button>
        </>
      )}
    </div>
  );
}

export default ProductInfoSection;
