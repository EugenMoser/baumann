import ProductFormWrapper from "@/components/forms/ProductFormWrapper";
import { getAllColors } from "@/lib/database";
import { Color } from "@prisma/client";

async function AddProductPage(): Promise<React.JSX.Element> {
  const colors: Color[] | null = await getAllColors();

  return (
    <>
      <ProductFormWrapper colors={colors} />
    </>
  );
}

export default AddProductPage;
