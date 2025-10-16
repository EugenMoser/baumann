import ArticleDetailsForm from "@/components/forms/ArticleDetailsForm";

async function AddArticlePage(): Promise<React.JSX.Element> {
  //todo: fetch product by id to display product name in the form header and to link the article to the product
  const productId = 4242; //mock productId, should be fetched from a selected product
  return (
    <>
      {/* //todo: search field for product hinzufügen und die productId durchgeben */}
      <ArticleDetailsForm productId={productId} />
    </>
  );
}

export default AddArticlePage;
