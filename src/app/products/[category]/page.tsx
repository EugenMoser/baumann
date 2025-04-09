import ProductByCategoryCard from "@/components/ProductByCategoryCard";
import { getCachedProductByIdsByCategory } from "@/lib/database";
import { ProductCategoryProps } from "@/types/ProductCategory";

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
        {products.map((product, index) => (
          <li key={index} className="mb-6 flex items-center gap-6 bg-slate-200">
            <ProductByCategoryCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductsByCategoryPage;
