import { getCachedProductById } from "@/lib/database";
import { ProductWithColorAndArticlesProps } from "@/types/product";

interface UpdateProductPageProps {
  searchParams: Promise<{ id: string }>;
}

async function UpdateProductPage({
  searchParams,
}: UpdateProductPageProps): Promise<React.JSX.Element> {
  const { id } = await searchParams;

  let product: ProductWithColorAndArticlesProps | null = null;

  try {
    product = await getCachedProductById(id);
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
