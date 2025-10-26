"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { CategoryProps } from "@/constants/productCategories";
import { addProductAction } from "@/features/products";
import {
  ProductFormFieldErrors,
  ProductNotificationFormStates,
} from "@/types/formProps";
import { ProductFormDataProps } from "@/types/productProps";

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
  const initialState: ProductNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };
  const [state, formAction] = useActionState(addProductAction, initialState);

  // Show toast notification when add product failed or success
  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Produkt wurde hinzugefügt");
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Hinzufügen des Produkts");
    }
  }, [state.success, state.errors]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, files } = target;

    let newValue: File | null | number | string = value;
    if (type === "file") {
      newValue = files?.[0] ?? null; // handle file upload
    } else if (type === "number") {
      newValue = Number(value); // handle number input productPrio
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
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

      <CustomButton
        type="submit"
        buttonType="onClickFunction"
        onClickFunction={() =>
          state.success
            ? toast.success("Artikel wurde hinzugefügt")
            : toast.error("Fehler beim Hinzufügen des Artikels")
        }
        title="Produkt hinzufügen"
        ariaLabel="Produkt hinzufügen"
      />
    </form>
  );
}
