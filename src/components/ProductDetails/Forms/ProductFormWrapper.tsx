"use client";
import { useActionState } from "react";

import CustomButton from "@/components/CustomButton";
import ProductDetailsForm
  from "@/components/ProductDetails/Forms/ProductDetailsForm";
import { addProductAction } from "@/lib/actions/addProduct";
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

        {/* <CustomButton type="submit" buttonType="addProduct" /> */}
        <CustomButton
          type="submit"
          buttonType="defaultButton"
          title="Produkt hinzufügen"
        />
      </form>
    </>
  );
}
