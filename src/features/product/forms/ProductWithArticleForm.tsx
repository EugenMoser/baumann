"use client";

import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { CategoryProps } from "@/constants/productCategories";
import { ArticleFormDataProps, ArticleFormFields } from "@/features/article";
import {
  addProductWithArticleAction,
  ProductFormDataProps,
  ProductFormFields,
  ProductNotificationFormStates,
  ProductWithArticleFormFieldErrors,
} from "@/features/product";

interface ProductWithArticleFormProps {
  onSuccess?: (productId: number) => void;
}

export function ProductWithArticleForm({
  onSuccess,
}: ProductWithArticleFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<
    ProductFormDataProps &
      ArticleFormDataProps & {
        imageSmall: File | null;
      }
  >({
    // Product fields
    category: "moebel",
    productPrio: 1000,
    productName: "",
    descriptionProduct1: null,
    descriptionProduct2: null,
    descriptionProduct3: null,
    descriptionProduct4: null,
    material: "",
    imageSmall: null,

    // Article fields
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

  const initialState: ProductNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  const [state, formAction] = useActionState(
    addProductWithArticleAction,
    initialState,
  );

  // Type assertion for errors to handle union type
  const errors = state.errors as ProductWithArticleFormFieldErrors | undefined;

  // Show toast notification when add product with article failed or success
  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Produkt mit Artikel wurde hinzugefügt");
      if (typeof state.productId === "number" && onSuccess) {
        onSuccess(state.productId);
      }
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(
        state.globalError || "Fehler beim Hinzufügen des Produkts mit Artikel",
      );
    }
  }, [state.success, state.errors, state.productId, onSuccess]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, files } = target;

    let newValue: File | null | number | string = value;
    if (type === "file") {
      newValue = files?.[0] ?? null;
    } else if (type === "number") {
      newValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleOnChangeSelect = (value: CategoryProps["category"]) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <form action={formAction} className="space-y-8">
      {/* Product Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Produktinformationen</h2>
        <ProductFormFields
          formData={{
            category: formData.category,
            productPrio: formData.productPrio,
            productName: formData.productName,
            descriptionProduct1: formData.descriptionProduct1,
            descriptionProduct2: formData.descriptionProduct2,
            descriptionProduct3: formData.descriptionProduct3,
            descriptionProduct4: formData.descriptionProduct4,
            material: formData.material,
            imageSmall: formData.imageSmall,
          }}
          errors={errors}
          onChange={handleOnChange}
          onCategoryChange={handleOnChangeSelect}
        />
      </div>

      {/* Article Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Artikel (mindestens ein Artikel erforderlich)
        </h2>
        <ArticleFormFields
          formData={{
            articlePrio: formData.articlePrio,
            articleNumber: formData.articleNumber,
            articleName: formData.articleName,
            descriptionArticle1: formData.descriptionArticle1,
            descriptionArticle2: formData.descriptionArticle2,
            descriptionArticle3: formData.descriptionArticle3,
            descriptionArticle4: formData.descriptionArticle4,
            vpe1: formData.vpe1,
            vpe2: formData.vpe2,
            vpe3: formData.vpe3,
            vpe4: formData.vpe4,
          }}
          errors={errors}
          onChange={handleOnChange}
        />
      </div>

      {/* Submit Button */}
      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Produkt mit Artikel hinzufügen"
        ariaLabel="Produkt mit Artikel hinzufügen"
      />
    </form>
  );
}
