import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryProps } from "@/constants/productCategories";
import { ProductFormDataProps } from "@/features/product/types";

import { ProductCategorySelect } from "./ProductCategorySelect";
import { ProductInputField } from "./ProductInputField";
import { ProductTextField } from "./ProductTextField";

interface ProductFormFieldsProps {
  formData: ProductFormDataProps & {
    imagesSmall: File[];
    imagesBig: File[];
  };
  errors?: {
    category?: string[];
    productPrio?: string[];
    productName?: string[];
    descriptionProduct1?: string[];
    descriptionProduct2?: string[];
    descriptionProduct3?: string[];
    descriptionProduct4?: string[];
    material?: string[];
    imageSmall?: string[];
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCategoryChange: (value: CategoryProps["category"]) => void;
  onSmallImagesChange: (files: File[]) => void;
  onBigImagesChange: (files: File[]) => void;
}

/**
 * Reusable Product form fields component
 * Pure presentation component without its own state or submit logic
 */
export function ProductFormFields({
  formData,
  errors,
  onChange,
  onCategoryChange,
  onSmallImagesChange,
  onBigImagesChange,
}: ProductFormFieldsProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      <ProductCategorySelect
        name="Bitte Kategorie wählen"
        title="Produkt - Kategorie"
        aria-describedby="category-error"
        value={formData.category}
        onChange={onCategoryChange}
        error={errors?.category}
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
        onChange={onChange}
        aria-describedby="productPrio-error"
        error={errors?.productPrio}
      />

      <ProductInputField
        id="productName"
        name="productName"
        title="Produktname"
        type="string"
        placeholder="Produktname eingeben"
        value={formData.productName}
        onChange={onChange}
        aria-describedby="productName-error"
        error={errors?.productName}
      />

      <ProductTextField
        id="descriptionProduct1"
        name="descriptionProduct1"
        title="Beschreibung 1"
        placeholder="Produktbeschreibung 1 eingeben"
        value={formData.descriptionProduct1}
        onChange={onChange}
        aria-describedby="descriptionProduct1-error"
        error={errors?.descriptionProduct1}
      />

      <ProductTextField
        id="descriptionProduct2"
        name="descriptionProduct2"
        title="Beschreibung 2"
        placeholder="Produktbeschreibung 2 eingeben"
        value={formData.descriptionProduct2}
        onChange={onChange}
        aria-describedby="descriptionProduct2-error"
        error={errors?.descriptionProduct2}
      />

      <ProductTextField
        id="descriptionProduct3"
        name="descriptionProduct3"
        title="Beschreibung 3"
        placeholder="Produktbeschreibung 3 eingeben"
        value={formData.descriptionProduct3}
        onChange={onChange}
        aria-describedby="descriptionProduct3-error"
        error={errors?.descriptionProduct3}
      />

      <ProductTextField
        id="descriptionProduct4"
        name="descriptionProduct4"
        title="Beschreibung 4"
        placeholder="Produktbeschreibung 4 eingeben"
        value={formData.descriptionProduct4}
        onChange={onChange}
        aria-describedby="descriptionProduct4-error"
        error={errors?.descriptionProduct4}
      />

      <ProductInputField
        id="material"
        name="material"
        title="Material"
        type="string"
        placeholder="Material eingeben"
        value={formData.material}
        onChange={onChange}
        aria-describedby="material-error"
        error={errors?.material}
      />

      {/* Small images upload (up to 10) */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          Kleine Bilder für Produktliste (bis zu 10, mindestens 1)
        </label>
        <Input
          id="imagesSmall"
          type="file"
          accept=".webp"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, 10);
            onSmallImagesChange(files);
          }}
        />
        <Button
          type="button"
          onClick={() => document.getElementById("imagesSmall")?.click()}
          className="w-fit rounded border bg-button-background px-4 py-2 hover:bg-button-hover hover:text-button-background"
        >
          Dateien auswählen (max. 10)
        </Button>
        {formData.imagesSmall.length > 0 && (
          <ul className="text-muted-foreground space-y-1 text-sm">
            {formData.imagesSmall.map((file, i) => (
              <li key={i}>
                a{i + 1}: {file.name}
              </li>
            ))}
          </ul>
        )}
        {errors?.imageSmall && (
          <p className="text-sm text-red-500">{errors.imageSmall[0]}</p>
        )}
      </div>

      {/* Big images upload (up to 10) */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          Große Bilder (bis zu 10, optional)
        </label>
        <input
          id="imagesBig"
          type="file"
          accept=".webp"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, 10);
            onBigImagesChange(files);
          }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("imagesBig")?.click()}
          className="w-fit rounded border bg-button-background px-4 py-2 hover:bg-button-hover hover:text-button-background"
        >
          Dateien auswählen (max. 10)
        </button>
        {formData.imagesBig.length > 0 && (
          <ul className="text-muted-foreground space-y-1 text-sm">
            {formData.imagesBig.map((file, i) => (
              <li key={i}>
                b{i + 1}: {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
