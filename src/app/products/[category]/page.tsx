import ProductCardByCategory from "@/components/ProductCardByCategory";
import { getCachedProductByIdsByCategory } from "@/lib/database";
import { ProductCategoryProps } from "@/types/ProductCategoryProps";

interface ProductsByCategoryPageProps {
  params: Promise<{ category: string }>;
}
async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps): Promise<React.JSX.Element> {
  const { category } = await params;
  const products: ProductCategoryProps[] =
    await getCachedProductByIdsByCategory(category);

  return (
    <main>
      <h1>Produkte nach Kategorie: {category}</h1>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="mb-6 flex items-center gap-6 bg-slate-200"
          >
            <ProductCardByCategory product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductsByCategoryPage;
