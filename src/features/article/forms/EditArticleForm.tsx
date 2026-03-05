"use client";

import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { updateArticleAction } from "@/features/article/actions/mutations/updateArticle";
import { ArticleFormFields } from "@/features/article/forms/ArticleFormFields";
import {
  ArticleFormDataProps,
  ArticleNotificationFormStates,
} from "@/features/article/types";
import { Article } from "@prisma/client";

interface EditArticleFormProps {
  article: Article;
  /** When provided the form is shown directly (standalone page) and navigates here on success/cancel. */
  redirectTo?: string;
}

/**
 * Client component form for editing a single article.
 * When `redirectTo` is provided it renders directly in edit mode (standalone page).
 * Otherwise it shows an inline toggle button (used inside the product detail page).
 */
export function EditArticleForm({
  article,
  redirectTo,
}: EditArticleFormProps): React.JSX.Element {
  // On a standalone page we start directly in edit mode
  const [isEditing, setIsEditing] = useState(Boolean(redirectTo));

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
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Artikel wurde aktualisiert.");
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        setIsEditing(false);
      }
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Aktualisieren.");
    }
  }, [
    state.success,
    state.errors,
    state.message,
    state.globalError,
    redirectTo,
  ]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const { name, value, type } = target;

    let newValue: number | string = value;
    if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        {/* <p className="text-muted-foreground text-sm">
          Prio: {article.prio} | Nummer: {article.number} | Name: {article.name}
        </p> */}
        <Button onClick={() => setIsEditing(true)} className="btn">
          Bearbeiten
        </Button>
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
        <SubmitButton isPending={isPending}>Artikel aktualisieren</SubmitButton>
      </div>
    </form>
  );
}
