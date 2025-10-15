"use client";
import { useActionState } from "react";

import { addProductAction } from "src/features/products/actions/addProduct";

import ProductDetailsForm from "@/components/forms/ProductDetailsForm";
import CustomButton from "@/components/shared/CustomButton";
import { Color } from "@prisma/client";

interface ProductFormWrapperProps {
  colors: Color[] | null;
}

export default function ProductFormWrapper({
  colors,
}: ProductFormWrapperProps): React.JSX.Element {
  const initialState = {
    message: "",
    errors: {},
    actionSuccess: false,
  };
  const [state, formAction] = useActionState(addProductAction, initialState);

  return (
    <>
      <h1>add new product - page</h1>
      <form action={formAction}>
        <ProductDetailsForm state={state} />
        {/* <ArticleDetailsForm />
        <ColorDetailsForm colors={colors} />
        <ImageUploadForm /> */}

        <CustomButton
          type="submit"
          buttonType="defaultButton"
          title="Produkt hinzufügen"
          ariaLabel="Produkt hinzufügen"
        />
      </form>
    </>
  );
}
