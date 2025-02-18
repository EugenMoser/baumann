import { getCachedProduct } from "@/lib/productActions";
import { ProductWithColorAndArticlesProps } from "@/types/Product";

interface UpdateProductPageProps {
  searchParams: Promise<{ id: string }>;
}

async function UpdateProductPage({
  searchParams,
}: UpdateProductPageProps): Promise<React.JSX.Element> {
  const { id } = await searchParams;

  let product: ProductWithColorAndArticlesProps | null = null;

  try {
    product = await getCachedProduct(id);
  } catch (error: any) {
    throw new Error(error);
  }

  if (!product) {
    return (
      <div>
        <p>Keine Produkte gefunden.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Update Product</h1>
      <p>Product ID: {product.id}</p>
      <p>Product Name: {product.name}</p>
      {/* //todo add form */}
    </div>
  );
}

export default UpdateProductPage;
