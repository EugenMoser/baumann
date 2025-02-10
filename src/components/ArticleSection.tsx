"use client";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
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
  onSelect: (id: string) => void;
}

function ArticleSection({ articles, onSelect }: ArticleSectionProps) {
  const [isArticleDescriptionAvailable, setIsArticleDescriptionAvailable] =
    useState(true);
  return (
    <>
      <h1>Article Infos</h1>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bitte wählen" />
        </SelectTrigger>
        <SelectContent>
          {articles.map((article) =>
            article.description1 ? (
              <SelectItem key={article.id} value={article.id}>
                {article.description1}
              </SelectItem>
            ) : (
              ""
            ),
          )}
        </SelectContent>
      </Select>
    </>
  );
}

export default ArticleSection;
