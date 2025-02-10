"use client";
import { useEffect, useState } from "react";

import { ArticleProps } from "src/types/Product";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

interface ArticleSectionProps {
  articles: ArticleProps[];
  onSelect: (id: string | undefined) => void;
}

function ArticleSection({
  articles,
  onSelect,
}: ArticleSectionProps): React.JSX.Element {
  //if boolean is false, dont show article section
  const [isArticleDescriptionAvailable, setIsArticleDescriptionAvailable] =
    useState(true);

  //if more than one article is available, set default article value to undefined, else set it to the only article available
  const defaultArticleValue: string | undefined =
    articles.length > 1 ? undefined : articles[0].id;

  useEffect(() => {
    // check (in every article ) if description1 is available
    if (articles.every((article) => !article.description1)) {
      setIsArticleDescriptionAvailable(false);
    }

    // set initial the default article value to selected article
    onSelect(defaultArticleValue);
  }, []);

  return (
    <>
      {isArticleDescriptionAvailable && (
        <>
          <h1>Article Infos</h1>

          <Select defaultValue={defaultArticleValue} onValueChange={onSelect}>
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
