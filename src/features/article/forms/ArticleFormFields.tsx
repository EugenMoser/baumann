import { ArticleFormDataProps } from "@/features/article/types";

import ArticleInputField from "./ArticleInputField";
import ArticleTextField from "./ArticleTextField";

interface ArticleFormFieldsProps {
  formData: ArticleFormDataProps;
  errors?: {
    articlePrio?: string[];
    articleNumber?: string[];
    articleName?: string[];
    descriptionArticle1?: string[];
    descriptionArticle2?: string[];
    descriptionArticle3?: string[];
    descriptionArticle4?: string[];
    vpe1?: string[];
    vpe2?: string[];
    vpe3?: string[];
    vpe4?: string[];
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

/**
 * Reusable Article form fields component
 * Pure presentation component without its own state or submit logic
 */
export function ArticleFormFields({
  formData,
  errors,
  onChange,
}: ArticleFormFieldsProps): React.JSX.Element {
  return (
    <div className="mb-4 space-y-4">
      <ArticleInputField
        id="articlePrio"
        name="articlePrio"
        title="Artikel - Priorität"
        type="number"
        placeholder="Bitte Artikel-Priorität bestimmen."
        value={formData.articlePrio}
        min={0}
        step={100}
        max={1000000}
        onChange={onChange}
        aria-describedby="articlePrio-error"
        error={errors?.articlePrio}
      />

      <ArticleInputField
        id="articleNumber"
        name="articleNumber"
        title="Artikelnummer"
        type="string"
        placeholder="Artikelnummer eingeben"
        value={formData.articleNumber}
        onChange={onChange}
        aria-describedby="articleNumber-error"
        error={errors?.articleNumber}
      />

      <ArticleInputField
        id="articleName"
        name="articleName"
        title="Artikelname"
        type="string"
        placeholder="Artikelname eingeben"
        value={formData.articleName}
        onChange={onChange}
        aria-describedby="articleName-error"
        error={errors?.articleName}
      />

      <ArticleTextField
        id="descriptionArticle1"
        name="descriptionArticle1"
        title="Beschreibung 1"
        placeholder="Artikelbeschreibung 1"
        value={formData.descriptionArticle1}
        onChange={onChange}
        aria-describedby="descriptionArticle1-error"
        error={errors?.descriptionArticle1}
      />

      <ArticleTextField
        id="descriptionArticle2"
        name="descriptionArticle2"
        title="Beschreibung 2"
        placeholder="Artikelbeschreibung 2"
        value={formData.descriptionArticle2}
        onChange={onChange}
        aria-describedby="descriptionArticle2-error"
        error={errors?.descriptionArticle2}
      />

      <ArticleTextField
        id="descriptionArticle3"
        name="descriptionArticle3"
        title="Beschreibung 3"
        placeholder="Artikelbeschreibung 3"
        value={formData.descriptionArticle3}
        onChange={onChange}
        aria-describedby="descriptionArticle3-error"
        error={errors?.descriptionArticle3}
      />

      <ArticleTextField
        id="descriptionArticle4"
        name="descriptionArticle4"
        title="Beschreibung 4"
        placeholder="Artikelbeschreibung 4"
        value={formData.descriptionArticle4}
        onChange={onChange}
        aria-describedby="descriptionArticle4-error"
        error={errors?.descriptionArticle4}
      />

      <ArticleInputField
        id="vpe1"
        name="vpe1"
        title="VPE 1"
        type="number"
        placeholder="VPE 1"
        value={formData.vpe1}
        step={10}
        onChange={onChange}
        aria-describedby="vpe1-error"
        error={errors?.vpe1}
      />

      <ArticleInputField
        id="vpe2"
        name="vpe2"
        title="VPE 2"
        type="number"
        placeholder="VPE 2"
        value={formData.vpe2}
        step={10}
        onChange={onChange}
        aria-describedby="vpe2-error"
        error={errors?.vpe2}
      />

      <ArticleInputField
        id="vpe3"
        name="vpe3"
        title="VPE 3"
        type="number"
        placeholder="VPE 3"
        value={formData.vpe3}
        step={10}
        onChange={onChange}
        aria-describedby="vpe3-error"
        error={errors?.vpe3}
      />

      <ArticleInputField
        id="vpe4"
        name="vpe4"
        title="VPE 4"
        type="number"
        placeholder="VPE 4"
        value={formData.vpe4}
        step={10}
        onChange={onChange}
        aria-describedby="vpe4-error"
        error={errors?.vpe4}
      />
    </div>
  );
}
