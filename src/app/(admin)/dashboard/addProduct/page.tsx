import ProductDetailsForm from "@/components/forms/ProductDetailsForm";
import { getAllColors } from "@/lib/database";
import { Color } from "@prisma/client";

async function AddProductPage(): Promise<React.JSX.Element> {
  return (
    <>
      <ProductDetailsForm />
    </>
  );
}

export default AddProductPage;
