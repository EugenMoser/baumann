"use client";

import { useState } from "react";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { ProductColorManagement } from "@/features/color/components/ProductColorManagement";
import { Color } from "@prisma/client";

import { EditProductForm } from "@/features/product/forms/EditProductForm";
import { ProductWithColorAndArticlesProps } from "@/features/product/types";

interface EditProductSectionProps {
  product: ProductWithColorAndArticlesProps;
  allColors: Color[];
}

/**
 * Client island that owns the product edit form, colour management,
 * and the submit button so that isPending can be shared between all three.
 */
export function EditProductSection({
  product,
  allColors,
}: EditProductSectionProps): React.JSX.Element {
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      {/* Product Edit Form */}
      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4">Produktinformationen</h2>
        <EditProductForm product={product} onPendingChange={setIsPending} />
      </div>

      {/* Color Management */}
      <div className="mb-8 rounded-lg border p-6">
        <h2>Farben</h2>
        <ProductColorManagement
          productId={product.productId}
          currentColors={product.colors}
          allColors={allColors}
        />
      </div>

      {/* Submit — outside the <form> element but linked via the form attribute */}
      <div className="mb-16 flex justify-start">
        <SubmitButton form="edit-product-form" className="btn" isPending={isPending}>
          Produkt aktualisieren
        </SubmitButton>
      </div>
    </>
  );
}
