"use client";
import { useState } from "react";

import { Input } from "../ui/input";

interface ImageUploadFormProps {}

export default function ImageUploadForm({}: ImageUploadFormProps): React.JSX.Element {
  const [selectedCategoryImageNames, setSelectedCategoryImageNames] = useState<
    string[]
  >([]);

  const [selectedProductImageNames, setSelectedProductImageNames] = useState<
    string[]
  >([]);
  return (
    <>
      {/* image cloudinary hochladen und benennen
                alle imageUrls in ein array packen und input hidden mapen
            */}

      <h2>----------- Image --------------</h2>
      <label htmlFor="imageUpload">Kategoriebild in .webp wählen (klein)</label>
      <Input
        type="file"
        name="imageUpload"
        id="imageUpload"
        placeholder="Bild hochladen"
        accept=".webp"
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            const names = Array.from(files).map((file) => file.name);
            setSelectedCategoryImageNames(names);
          }
        }}
        className="size-fit border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      {selectedCategoryImageNames.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
          {selectedCategoryImageNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
      <label htmlFor="imageUpload">Produktbild in .webp wählen (groß)</label>
      <Input
        type="file"
        name="imageUpload"
        id="imageUpload"
        placeholder="Bild hochladen"
        accept=".webp"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            const names = Array.from(files).map((file) => file.name);
            setSelectedProductImageNames(names);
          }
        }}
        className="size-fit border border-gray-300 p-2 text-center"
        // aria-describedby="email-error"
      />
      {selectedProductImageNames.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
          {selectedProductImageNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
