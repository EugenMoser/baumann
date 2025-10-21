"use client";
import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArticleProps } from "@/types/productProps";

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
  const isArticleDescriptionAvailable: boolean = articles.some(
    (article) => article.description1,
  );

  useEffect(() => {
    // set initial the default article value to selected article id
    const defaultArticleValue: string =
      articles.length === 1 ? articles[0].id : "";

    // prevent the URL from being replaced unnecessarily
    if (!defaultSelectedValue && defaultArticleValue) {
      params.set("article", defaultArticleValue);
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [articles, searchParams, pathname, replace]);

  function handleSelect(articleId: string) {
    // Avoids unnecessary updates
    if (defaultSelectedValue === articleId) return;
    params.set("article", articleId);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
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
            <SelectTrigger className="w-full rounded-md border border-article">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent className="w-full border-[0.5px] border-article">
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
