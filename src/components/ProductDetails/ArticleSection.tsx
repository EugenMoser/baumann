"use client";
import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleProps } from "@/types/ProductProps";

interface ArticleSectionProps {
  articles: ArticleProps[];
}

function ArticleSection({ articles }: ArticleSectionProps): React.JSX.Element {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // get current value from the SearchParams
  const defaultSelectedValue = searchParams.get("article") || "";

  //if boolean is false, dont show article section
  const [isArticleDescriptionAvailable, setIsArticleDescriptionAvailable] =
    useState(true);

  useEffect(() => {
    // check (in every article ) if description1 is available
    // if description is not available, hide article section
    setIsArticleDescriptionAvailable(
      articles.some((article) => article.description1),
    );
  }, [articles]);

  useEffect(() => {
    // set initial the default article value to selected article id
    const defaultArticleValue = articles.length === 1 ? articles[0].id : "";

    // prevent the URL from being replaced unnecessarily
    if (!defaultSelectedValue && defaultArticleValue) {
      params.set("article", defaultArticleValue);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [articles, searchParams, pathname, replace]);

  function handleSelect(articleId: string) {
    // Avoids unnecessary updates
    if (defaultSelectedValue === articleId) return;
    params.set("article", articleId);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      {isArticleDescriptionAvailable && (
        <>
          <h3 className="mb-4">
            Produkt-Variante
            <br />
            <span className="text-article">
              In welcher Variante benötigen Sie das Produkt?
            </span>
          </h3>

          <Select
            defaultValue={defaultSelectedValue}
            onValueChange={(event) => handleSelect(event)}
          >
            <SelectTrigger className="border-article w-full rounded-md border">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent className="border-article w-full border-[0.5px]">
              {articles.map((article, index) => (
                <SelectItem key={index} value={article.id}>
                  {article.description1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <hr className="my-8 border-solid border-foreground" />
        </>
      )}
    </>
  );
}

export default ArticleSection;
