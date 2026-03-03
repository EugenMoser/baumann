"use client";

import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { updateArticleAction } from "@/features/article/actions/mutations/updateArticle";
import { ArticleFormFields } from "@/features/article/forms/ArticleFormFields";
import {
  ArticleFormDataProps,
  ArticleNotificationFormStates,
} from "@/features/article/types";
import { Article } from "@prisma/client";

interface EditArticleFormProps {
  article: Article;
}

/**
 * Client component form for editing a single article inline.
 */
export function EditArticleForm({
  article,
}: EditArticleFormProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<ArticleFormDataProps>({
    articlePrio: article.prio,
    articleNumber: article.number,
    articleName: article.name,
    descriptionArticle1: article.description1 ?? "",
    descriptionArticle2: article.description2 ?? "",
    descriptionArticle3: article.description3 ?? "",
    descriptionArticle4: article.description4 ?? "",
    vpe1: article.vpe1 ?? "",
    vpe2: article.vpe2 ?? "",
    vpe3: article.vpe3 ?? "",
    vpe4: article.vpe4 ?? "",
  });

  const initialState: ArticleNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  const updateWithId = updateArticleAction.bind(null, article.id);
  const [state, formAction] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Artikel wurde aktualisiert.");
      setIsEditing(false);
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Aktualisieren.");
    }
  }, [state.success, state.errors, state.message, state.globalError]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const { name, value, type } = target;

    let newValue: number | string = value;
    if (type === "number") {
      newValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground text-sm">
          Prio: {article.prio} | Nummer: {article.number} | Name: {article.name}
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
        >
          Bearbeiten
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <ArticleFormFields
        formData={formData}
        errors={state.errors}
        onChange={handleOnChange}
      />
      <div className="flex gap-2">
        <CustomButton
          type="submit"
          buttonType="defaultButton"
          title="Artikel aktualisieren"
          ariaLabel="Artikel aktualisieren"
        />
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded bg-gray-400 px-4 py-2 text-sm text-white hover:bg-gray-500"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
