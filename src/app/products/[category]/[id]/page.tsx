import ArticleSection from "@/components/products/ArticleSection";
import ColorSection from "@/components/products/ColorSection";
import ProductInfoSection from "@/components/products/ProductInfoSection";
import ProductSection from "@/components/products/ProductSection";
import CustomButton from "@/components/shared/CustomButton";
import { getCachedProductById } from "@/lib/database";
import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    article?: string;
    color?: string;
  }>;
}
async function ProductPage({
  params,
  searchParams,
}: ProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const selectedArticleId = (await searchParams)?.article || "";
  const selectedColorId = (await searchParams)?.color || "";

  const product: ProductWithColorAndArticlesProps =
    await getCachedProductById(id);

  const selectedArticle: ArticleProps | undefined =
    product.articles.find((article) => article.id === selectedArticleId) ||
    undefined;

  // get selected color object
  const selectedColor: ColorProps | undefined =
    product.colors.find((color) => color.id === selectedColorId) || undefined;

  return (
    <main>
      <h1 className="mb-6">{product.name}</h1>
      <div className="my-8 flex w-full flex-col items-start gap-8 lg:flex-row">
        <section className="flex w-full flex-col lg:w-[50%]">
          <ProductSection product={product} />
        </section>
        <div className="flex w-full flex-col lg:w-[50%]">
          <section className="flex flex-col">
            <ArticleSection articles={product.articles} />
          </section>
          <section>
            <ColorSection colors={product.colors} />
          </section>

          <section>
            <ProductInfoSection
              selectedArticle={selectedArticle}
              selectedColor={selectedColor}
            />
          </section>
        </div>
      </div>
      <section>
        <CustomButton
          type="button"
          buttonType="redirect"
          title="Zurück zur Kategorie"
          redirectUrl={product.category ? `/products/${product.category}` : "/"}
          ariaLabel="Zurück zur Kategorie"
        />
      </section>
      {/* <Link
        href={{
          pathname: `/dashboard/updateProduct`,
          query: { id: product?.id },
        }}
      >
        <button>Update Product</button>
        
      </Link> 
        <Link
        href={{
          pathname: `/dashboard/deleteProduct`,
          query: { id: product?.id },
        }}
      >
        
        <button>Delete Product</button>
      </Link>*/}
    </main>
  );
}

export default ProductPage;
