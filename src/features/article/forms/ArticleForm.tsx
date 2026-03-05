"use client";
import { useActionState, useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { toast } from "sonner";

import { SubmitButton } from "@/components/shared/SubmitButton";
import type { ArticleFormDataProps } from "@/features/article";
import { addArticle } from "@/features/article";
import { ArticleNotificationFormStates } from "@/features/article/types";

import { ArticleFormFields } from "./ArticleFormFields";

interface ArticleFormProps {
  productId: number;
  selectedProductName: string | undefined;
}

export default function ArticleForm({
  productId,
  selectedProductName,
}: ArticleFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<
    ArticleFormDataProps & {
      productId: number;
    }
  >({
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
  const addArticleWithId = addArticle.bind(null, productId);
  const [state, formAction, isPending] = useActionState(
    addArticleWithId,
    initialState,
  );

  // Show toast notification when add article failed or success
  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Artikel wurde hinzugefügt");
      setTimeout(() => {
        // Reset form after successful submission
        redirect(`/dashboard/products`);
      }, 2000);
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Hinzufügen des Artikels");
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
      <h3>
        Folgendes Produkt wurde ausgewählt:
        <span className="font-extrabold"> {selectedProductName}</span>
      </h3>
      <ArticleFormFields
        formData={formData}
        errors={state.errors}
        onChange={handleOnChange}
      />

      <SubmitButton isPending={isPending}>Artikel hinzufügen</SubmitButton>
    </form>
  );
}
