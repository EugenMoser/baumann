"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryProps } from "@/constants/productCategories";
import {
  ProductCategorySelect,
  ProductInputField,
  ProductTextField,
  updateProductAction,
} from "@/features/product";
import {
  ProductFormDataProps,
  ProductNotificationFormStates,
  ProductWithColorAndArticlesProps,
} from "@/features/product/types";

interface EditProductFormProps {
  product: ProductWithColorAndArticlesProps;
  /** When true, the submit button is not rendered inside the form. */
  hideSubmitButton?: boolean;
}

/**
 * Client component form for editing product details.
 */
export function EditProductForm({
  product,
  hideSubmitButton = false,
}: EditProductFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<ProductFormDataProps>({
    category: product.category as ProductFormDataProps["category"],
    productPrio: product.prio,
    productName: product.name,
    descriptionProduct1: product.description1 ?? null,
    descriptionProduct2: product.description2 ?? null,
    descriptionProduct3: product.description3 ?? null,
    descriptionProduct4: product.description4 ?? null,
    material: product.material ?? "",
  });

  // Existing URLs to keep (user can remove individual ones)
  const [keptSmallUrls, setKeptSmallUrls] = useState<string[]>(
    product.imageUrlsSmall,
  );
  const [keptBigUrls, setKeptBigUrls] = useState<string[]>(
    product.imageUrlsBig,
  );
  // New files staged for upload
  const [newSmallFiles, setNewSmallFiles] = useState<File[]>([]);
  const [newBigFiles, setNewBigFiles] = useState<File[]>([]);
  // Track which existing URLs to keep and which new files to add

  const initialState: ProductNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  const updateWithId = updateProductAction.bind(null, product.productId);
  const [state, formAction] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Produkt wurde aktualisiert.");
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Aktualisieren.");
    }
  }, [state.success, state.errors, state.message, state.globalError]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
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

  /**
   * Intercept form submit to append kept image URLs and new image files,
   * since file inputs and URL lists are tracked in React state.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Append kept URLs so the server knows which existing images to retain
    keptSmallUrls.forEach((url, i) => fd.set(`keepSmall-${i}`, url));
    keptBigUrls.forEach((url, i) => fd.set(`keepBig-${i}`, url));

    // Append new files for upload
    newSmallFiles.forEach((file, i) => fd.set(`imageSmall-${i}`, file));
    newBigFiles.forEach((file, i) => fd.set(`imageBig-${i}`, file));

    startTransition(() => formAction(fd));
  };

  return (
    <form id="edit-product-form" onSubmit={handleSubmit} className="space-y-4">
      <ProductCategorySelect
        name="Bitte Kategorie wählen"
        title="Produkt - Kategorie"
        aria-describedby="category-error"
        value={formData.category}
        onChange={handleOnChangeSelect}
        error={state.errors?.category}
      />
      <ProductInputField
        id="productPrio"
        name="productPrio"
        title="Produkt - Priorität"
        type="number"
        placeholder="Produkt - Priorität bestimmen."
        min={0}
        step={100}
        max={1000000}
        value={formData.productPrio}
        onChange={handleOnChange}
        aria-describedby="productPrio-error"
        error={state.errors?.productPrio}
      />
      <ProductInputField
        id="productName"
        name="productName"
        title="Produktname"
        type="string"
        placeholder="Produktname eingeben"
        value={formData.productName}
        onChange={handleOnChange}
        aria-describedby="productName-error"
        error={state.errors?.productName}
      />
      <ProductTextField
        id="descriptionProduct1"
        name="descriptionProduct1"
        title="Beschreibung 1"
        placeholder="Produktbeschreibung 1"
        value={formData.descriptionProduct1}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct1-error"
        error={state.errors?.descriptionProduct1}
      />
      <ProductTextField
        id="descriptionProduct2"
        name="descriptionProduct2"
        title="Beschreibung 2"
        placeholder="Produktbeschreibung 2"
        value={formData.descriptionProduct2}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct2-error"
        error={state.errors?.descriptionProduct2}
      />
      <ProductTextField
        id="descriptionProduct3"
        name="descriptionProduct3"
        title="Beschreibung 3"
        placeholder="Produktbeschreibung 3"
        value={formData.descriptionProduct3}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct3-error"
        error={state.errors?.descriptionProduct3}
      />
      <ProductTextField
        id="descriptionProduct4"
        name="descriptionProduct4"
        title="Beschreibung 4"
        placeholder="Produktbeschreibung 4"
        value={formData.descriptionProduct4}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct4-error"
        error={state.errors?.descriptionProduct4}
      />
      <ProductInputField
        id="material"
        name="material"
        title="Material"
        type="string"
        placeholder="Material eingeben"
        value={formData.material}
        onChange={handleOnChange}
        aria-describedby="material-error"
        error={state.errors?.material}
      />

      {/* Small images section */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          Kleine Bilder für Produktliste (bis zu 10)
        </label>

        {/* Existing kept images with individual remove button */}
        {keptSmallUrls.length > 0 && (
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Aktuelle Bilder:</p>
            {keptSmallUrls.map((url, i) => (
              <div key={url} className="flex items-center gap-2 text-sm">
                <span>
                  a{i + 1}: {url.split("/").pop()}
                </span>
                <Button
                  type="button"
                  onClick={() =>
                    setKeptSmallUrls((prev) => prev.filter((u) => u !== url))
                  }
                  className="text-destructive hover:text-destructive/90 bg-transparent hover:bg-transparent"
                  aria-label="Bild entfernen"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Newly staged files with individual remove button */}
        {newSmallFiles.length > 0 && (
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Neue Bilder:</p>
            {newSmallFiles.map((file, i) => (
              <div
                key={file.name + i}
                className="flex items-center gap-2 text-sm"
              >
                <span>
                  +{i + 1}: {file.name}
                </span>
                <Button
                  type="button"
                  onClick={() =>
                    setNewSmallFiles((prev) =>
                      prev.filter((_, idx) => idx !== i),
                    )
                  }
                  className="text-destructive hover:text-destructive/90 bg-transparent hover:bg-transparent"
                  aria-label="Neues Bild entfernen"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        <Input
          id="editImagesSmall"
          type="file"
          accept=".webp"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, 10);
            setNewSmallFiles((prev) => [...prev, ...files].slice(0, 10));
            // Reset input so the same file can be re-added after removal
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          onClick={() => document.getElementById("editImagesSmall")?.click()}
          className="bg-surface hover:bg-surface-hover w-fit rounded border px-4 py-2"
        >
          Weitere Bilder hinzufügen
        </Button>
      </div>

      {/* Big images section */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Große Bilder (bis zu 10)</label>

        {/* Existing kept images with individual remove button */}
        {keptBigUrls.length > 0 && (
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Aktuelle Bilder:</p>
            {keptBigUrls.map((url, i) => (
              <div key={url} className="flex items-center gap-2 text-sm">
                <span>
                  b{i + 1}: {url.split("/").pop()}
                </span>
                <Button
                  type="button"
                  onClick={() =>
                    setKeptBigUrls((prev) => prev.filter((u) => u !== url))
                  }
                  className="bg-transparent text-red-500 hover:text-red-700"
                  aria-label="Bild entfernen"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Newly staged files with individual remove button */}
        {newBigFiles.length > 0 && (
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Neue Bilder:</p>
            {newBigFiles.map((file, i) => (
              <div
                key={file.name + i}
                className="flex items-center gap-2 text-sm"
              >
                <span>
                  +{i + 1}: {file.name}
                </span>
                <Button
                  type="button"
                  onClick={() =>
                    setNewBigFiles((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="text-red-500 hover:text-red-700"
                  aria-label="Neues Bild entfernen"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        <Input
          id="editImagesBig"
          type="file"
          accept=".webp"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, 10);
            setNewBigFiles((prev) => [...prev, ...files].slice(0, 10));
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          onClick={() => document.getElementById("editImagesBig")?.click()}
          className="bg-surface hover:bg-surface-hover w-fit rounded border px-4 py-2"
        >
          Weitere Bilder hinzufügen
        </Button>
      </div>

      {!hideSubmitButton && (
        <CustomButton
          type="submit"
          buttonType="defaultButton"
          title="Produkt aktualisieren"
          ariaLabel="Produkt aktualisieren"
        />
      )}
    </form>
  );
}
