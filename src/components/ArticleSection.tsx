"use client";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleProps } from "@/types/Product";

interface ArticleSectionProps {
  articles: ArticleProps[];
  selectedArticleId: string;
  onSelect: (id: string) => void;
}

function ArticleSection({
  articles,
  selectedArticleId,
  onSelect,
}: ArticleSectionProps): React.JSX.Element {
  //if boolean is false, dont show article section
  const [isArticleDescriptionAvailable, setIsArticleDescriptionAvailable] =
    useState(true);

  //if more than one article is available, set default article value to undefined, else set it to the only article available

  useEffect(() => {
    // check (in every article ) if description1 is available
    if (articles.every((article) => !article.description1))
      setIsArticleDescriptionAvailable(false);

    // set initial the default article value to selected article id
    const defaultArticleValue: string =
      articles.length > 1 ? "" : articles[0].id;
    if (defaultArticleValue) onSelect(defaultArticleValue);
  }, [articles]);

  return (
    <>
      {isArticleDescriptionAvailable && (
        <>
          <h1>Article Infos</h1>

          <Select defaultValue={selectedArticleId} onValueChange={onSelect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {articles.map((article, index) => (
                <SelectItem key={index} value={article.id}>
                  {article.description1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </>
  );
}

export default ArticleSection;
