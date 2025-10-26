"use client";
import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { addArticleAction } from "@/features/article";
import { ArticleNotificationFormStates } from "@/types/formProps";

import CustomButton from "../shared/CustomButton";
import ArticleInputField from "./ArticleInputField";
import ArticleTextField from "./ArticleTextField";

interface ArticleDetailsFormProps {
  productId: number;
}

export default function ArticleDetailsForm({
  productId,
}: ArticleDetailsFormProps): React.JSX.Element {
  const [formData, setFormData] = useState({
    productId,
    articlePrio: 1000,
    articleNumber: "",
    articleName: "",
    descriptionArticle1: "",
    descriptionArticle2: "",
    descriptionArticle3: "",
    descriptionArticle4: "",
    vpe1: "",
    vpe2: "",
    vpe3: "",
    vpe4: "",
  });

  const initialState: ArticleNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  // Bind productId to the action
  const addArticleWithId = addArticleAction.bind(null, productId);
  const [state, formAction] = useActionState(addArticleWithId, initialState);

  // Show toast notification when add article failed or success
  useEffect(() => {
    if (state.success) {
      toast.success("Artikel wurde hinzugefügt");
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error("Fehler beim Hinzufügen des Artikels");
    }
  }, [state.success, state.errors]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const { name, value, type } = target;

    let newValue: null | number | string = value;
    if (type === "number") {
      newValue = Number(value); // handle number input productPrio
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <form action={formAction}>
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
        onChange={handleOnChange}
        aria-describedby="articlePrio-error"
        error={state.errors?.articlePrio}
      />
      <ArticleInputField
        id="articleNumber"
        name="articleNumber"
        title="Artikelnummer"
        type="string"
        placeholder="Artikelnummer eingeben"
        value={formData.articleNumber}
        onChange={handleOnChange}
        aria-describedby="articleNumber-error"
        error={state.errors?.articleNumber}
      />

      <ArticleInputField
        id="articleName"
        name="articleName"
        title="Artikelname"
        type="string"
        placeholder="Artikelname eingeben"
        value={formData.articleName}
        onChange={handleOnChange}
        aria-describedby="articleName-error"
        error={state.errors?.articleName}
      />
      <ArticleTextField
        id="descriptionArticle1"
        name="descriptionArticle1"
        title="Beschreibung 1"
        placeholder="Artikelbeschreibung 1"
        value={formData.descriptionArticle1}
        onChange={handleOnChange}
        aria-describedby="descriptionArticle1-error"
        error={state.errors?.descriptionArticle1}
      />
      <ArticleTextField
        id="descriptionArticle2"
        name="descriptionArticle2"
        title="Beschreibung 2"
        placeholder="Artikelbeschreibung 2"
        value={formData.descriptionArticle2}
        onChange={handleOnChange}
        aria-describedby="descriptionArticle2-error"
        error={state.errors?.descriptionArticle2}
      />
      <ArticleTextField
        id="descriptionArticle3"
        name="descriptionArticle3"
        title="Beschreibung 3"
        placeholder="Artikelbeschreibung 3"
        value={formData.descriptionArticle3}
        onChange={handleOnChange}
        aria-describedby="descriptionArticle3-error"
        error={state.errors?.descriptionArticle3}
      />
      <ArticleTextField
        id="descriptionArticle4"
        name="descriptionArticle4"
        title="Beschreibung 4"
        placeholder="Artikelbeschreibung 4"
        value={formData.descriptionArticle4}
        onChange={handleOnChange}
        aria-describedby="descriptionArticle4-error"
        error={state.errors?.descriptionArticle4}
      />
      <ArticleInputField
        id="vpe1"
        name="vpe1"
        title="VPE 1"
        type="number"
        placeholder="VPE 1"
        value={formData.vpe1}
        step={10}
        onChange={handleOnChange}
        aria-describedby="vpe1-error"
        error={state.errors?.vpe1}
      />
      <ArticleInputField
        id="vpe2"
        name="vpe2"
        title="VPE 2"
        type="number"
        placeholder="VPE 2"
        value={formData.vpe2}
        step={10}
        onChange={handleOnChange}
        aria-describedby="vpe2-error"
        error={state.errors?.vpe2}
      />
      <ArticleInputField
        id="vpe3"
        name="vpe3"
        title="VPE 3"
        type="number"
        placeholder="VPE 3"
        value={formData.vpe3}
        step={10}
        onChange={handleOnChange}
        aria-describedby="vpe3-error"
        error={state.errors?.vpe3}
      />
      <ArticleInputField
        id="vpe4"
        name="vpe4"
        title="VPE 4"
        type="number"
        placeholder="VPE 4"
        value={formData.vpe4}
        step={10}
        onChange={handleOnChange}
        aria-describedby="vpe4-error"
        error={state.errors?.vpe4}
      />

      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Artikel hinzufügen"
        ariaLabel="Artikel hinzufügen"
      />
    </form>
  );
}
