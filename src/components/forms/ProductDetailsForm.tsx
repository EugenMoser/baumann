"use client";

import { useActionState, useState } from "react";

import { addProductAction } from "src/features/products/actions/addProduct";

import CustomButton from "@/components/shared/CustomButton";
import { CategoryProps } from "@/constants/productCategories";
import { ProductNotificationFormStates } from "@/types/form";
import { ProductFormDataProps } from "@/types/product";

import ProductCategorySelect from "./ProductCategorySelect";
import ProductInputField from "./ProductInputField";
import ProductTextField from "./ProductTextField";

interface ProductDetailsFormProps {}

export default function ProductDetailsForm({}: ProductDetailsFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<
    ProductFormDataProps & {
      imageSmall: File | null;
    }
  >({
    category: "moebel",
    productPrio: 1000,
    productName: "",
    descriptionProduct1: null,
    descriptionProduct2: null,
    descriptionProduct3: null,
    descriptionProduct4: null,
    material: "",
    imageSmall: null,
  });
  const initialState = {
    message: "",
    errors: {},
    actionSuccess: false,
  };
  const [state, formAction] = useActionState(addProductAction, initialState);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
      type,
    }: { name: string; value: string | number; type: string } =
      event.target as HTMLInputElement;
    const files = (event.target as HTMLInputElement).files;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] // handle file upload
          : type === "number"
            ? Number(value) // handle number input productPrio
            : value,
    }));
  };

  const handleOnChangeSelect = (value: CategoryProps["category"]) => {
    const selectedCategory = value;
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
  };

  return (
    <form action={formAction}>
      <h1>----------- Product hinzufügen --------------</h1>
      <ProductCategorySelect
        name="Bitte Kategory wählen"
        title="Product - Kategory"
        aria-describedby="category-error"
        value={formData.category}
        onChange={(value) => handleOnChangeSelect(value)}
        error={state.errors?.category}
      />

      <ProductInputField
        id="productPrio"
        name="productPrio"
        title="Produkt - Priorität"
        type="number"
        placeholder="Product - Priorität bestimmen."
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
        placeholder="Produktbeschreibung 1 eingeben"
        value={formData.descriptionProduct1}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct1-error"
        error={state.errors?.descriptionProduct1}
      />

      <ProductTextField
        id="descriptionProduct2"
        name="descriptionProduct2"
        title="Beschreibung 2"
        placeholder="Produktbeschreibung 2 eingeben"
        value={formData.descriptionProduct2}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct2-error"
        error={state.errors?.descriptionProduct2}
      />

      <ProductTextField
        id="descriptionProduct3"
        name="descriptionProduct3"
        title="Beschreibung 3"
        placeholder="Produktbeschreibung 3 eingeben"
        value={formData.descriptionProduct3}
        onChange={handleOnChange}
        aria-describedby="descriptionProduct3-error"
        error={state.errors?.descriptionProduct3}
      />

      <ProductTextField
        id="descriptionProduct4"
        name="descriptionProduct4"
        title="Beschreibung 4"
        placeholder="Produktbeschreibung 4 eingeben"
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

      {/* <ProductInputField
        id="imageSmall"
        name="imageSmall"
        type="file"
        value={formData.imageSmall}
        onChange={handleOnChange}
        title="Bild für Produktliste (kleines Bild) auswählen:"
        accept=".webp"
        aria-describedby="fileUploadSmall-error"
        error={state.errors?.imageSmall}
      /> */}

      <div className="flex flex-col gap-2">
        <label htmlFor="imageSmall" className="font-semibold">
          Datei auswählen
        </label>
        <input
          id="imageSmall"
          name="imageSmall"
          type="file"
          className="hidden"
          onChange={handleOnChange}
        />

        {formData.imageSmall?.name && (
          <p className="text-muted-foreground text-sm">
            {formData.imageSmall?.name}
          </p>
        )}
      </div>

      {state.globalError && (
        <div
          id="globalError"
          aria-live="polite"
          aria-atomic="true"
          className="mb-2 text-red-600"
        >
          {state.globalError}
        </div>
      )}
      {state.message && (
        <div
          id="message"
          aria-live="polite"
          aria-atomic="true"
          className="mb-2 text-green-600"
        >
          {state.message}
        </div>
      )}
      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Produkt hinzufügen"
        ariaLabel="Produkt hinzufügen"
      />
    </form>
  );
}
