"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ArticleDetailsFormProps {}

export default function ArticleDetailsForm({}: ArticleDetailsFormProps): React.JSX.Element {
  const [articlePrio, setArticlePrio] = useState<number>(1000);
  const handleArticlePrioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setArticlePrio(Number(event.target.value));
  };
  return (
    <>
      <h2>----------- Artikel --------------</h2>

      <Label htmlFor="articlePrio">Bitte Article - Priorität bestimmen.</Label>
      <Input
        type="number"
        value={articlePrio}
        name="articlePrio"
        id="articlePrio"
        step={100}
        onChange={handleArticlePrioChange}
        placeholder="Priorität"
        className="w-20 border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      <Input
        type="string"
        name="articleName"
        placeholder="Artikelname"
        // aria-describedby="email-error"
      />
      <Textarea
        id="descriptionArticle1"
        name="descriptionArticle1"
        placeholder="Artikelbeschreibung 1"
        // aria-describedby="email-error"
      />
      <Textarea
        id="descriptionArticle2"
        name="descriptionArticle2"
        placeholder="Artikelbeschreibung 2"
        // aria-describedby="email-error"
      />
      <Textarea
        id="descriptionArticle3"
        name="descriptionArticle3"
        placeholder="Artikelbeschreibung 3"
        // aria-describedby="email-error"
      />
      <Textarea
        id="descriptionArticle4"
        name="descriptionArticle4"
        placeholder="Artikelbeschreibung 4"
        // aria-describedby="email-error"
      />
      <Input
        type="string"
        name="vpe1"
        id="vpe1"
        step={10}
        placeholder="VPE 1"
        className="w-20 border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      <Input
        type="string"
        name="vpe2"
        id="vpe2"
        step={10}
        placeholder="VPE 2"
        className="w-20 border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      <Input
        type="string"
        name="vpe3"
        id="vpe3"
        step={10}
        placeholder="VPE 3"
        className="w-20 border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      <Input
        type="string"
        name="vpe3"
        id="vpe3"
        step={10}
        placeholder="VPE 4"
        className="w-20 border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
    </>
  );
}
