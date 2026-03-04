"use client";

import {
  startTransition,
  use,
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { CategoryProps } from "@/constants/productCategories";
import { ArticleFormDataProps, ArticleFormFields } from "@/features/article";
import { ColorProps } from "@/features/color/types";
import {
  addProductWithArticleAction,
  ProductFormDataProps,
  ProductFormFields,
  ProductNotificationFormStates,
  ProductWithArticleFormFieldErrors,
} from "@/features/product";

import { ColorSelectorField } from "./ColorSelectorField";

interface ProductWithArticleFormProps {
  onSuccess?: (productId: number) => void;
  colors: ColorProps[];
}

export function ProductWithArticleForm({
  onSuccess,
  colors,
}: ProductWithArticleFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<
    ProductFormDataProps &
      ArticleFormDataProps & {
        imagesSmall: File[];
        imagesBig: File[];
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
    imagesSmall: [],
    imagesBig: [],

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

  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);

  const initialState: ProductNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    addProductWithArticleAction,
    initialState,
  );

  // Type assertion for errors to handle union type
  const errors = state.errors as ProductWithArticleFormFieldErrors | undefined;

  // Show loading toast when action is pending
  useEffect(() => {
    if (isPending) {
      toast.loading("Produkt mit Artikel wird hinzugefügt...", {
        id: "add-product-article",
      });
    }
  }, [isPending]);

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

  // Show success state inline when no external onSuccess handler
  if (state.success && state.productId && !onSuccess) {
    return (
      <div className="rounded-lg border border-green-500 bg-green-50 p-6">
        <p className="mb-2 text-green-800">
          ✓ Produkt und Artikel erfolgreich angelegt!
        </p>
        <p className="mb-4 text-green-800">
          Möchtest du einen weiteren Artikel für dieses Produkt hinzufügen?
        </p>
        <div className="flex gap-3">
          <a
            href={`/dashboard/articles/new?productId=${state.productId}`}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Weiteren Artikel hinzufügen
          </a>
          <a
            href="/dashboard/products"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Zur Produktliste
          </a>
        </div>
      </div>
    );
  }

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type } = target;

    let newValue: null | number | string = value;
    if (type === "number") {
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

  const handleSmallImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, imagesSmall: files }));
  };

  const handleBigImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, imagesBig: files }));
  };

  const toggleColor = (colorId: string) => {
    setSelectedColorIds((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId],
    );
  };

  /**
   * Intercept form submit to append big image files and color IDs,
   * since these are tracked in React state and not in DOM inputs.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Append small image files from state
    formData.imagesSmall.forEach((file, i) => {
      fd.set(`imageSmall-${i}`, file);
    });

    // Append big image files from state
    formData.imagesBig.forEach((file, i) => {
      fd.set(`imageBig-${i}`, file);
    });

    // Append selected color IDs
    selectedColorIds.forEach((id) => fd.append("colorIds", id));

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
            imagesSmall: formData.imagesSmall,
            imagesBig: formData.imagesBig,
          }}
          errors={errors}
          onChange={handleOnChange}
          onCategoryChange={handleOnChangeSelect}
          onSmallImagesChange={handleSmallImagesChange}
          onBigImagesChange={handleBigImagesChange}
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

      {/* Color Selection */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Farben zuordnen</h2>
        <ColorSelectorField
          allColors={colors}
          selectedColorIds={selectedColorIds}
          onToggle={toggleColor}
        />
      </div>

      {/* Submit Button */}
      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Produkt mit Artikel hinzufügen"
        ariaLabel="Produkt mit Artikel hinzufügen"
        isDisabled={isPending}
      />
    </form>
  );
}
