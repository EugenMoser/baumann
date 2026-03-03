"use client";

import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
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
}

/**
 * Client component form for editing product details.
 */
export function EditProductForm({
  product,
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

  return (
    <form action={formAction} className="space-y-4">
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
      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Produkt aktualisieren"
        ariaLabel="Produkt aktualisieren"
      />
    </form>
  );
}
