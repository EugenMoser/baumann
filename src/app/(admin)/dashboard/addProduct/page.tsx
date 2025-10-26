import ProductDetailsForm from "@/components/forms/ProductDetailsForm";

async function AddProductPage(): Promise<React.JSX.Element> {
  return (
    <>
      <h1>----------- Product hinzufügen --------------</h1>

      <ProductDetailsForm />
    </>
  );
}

export default AddProductPage;
