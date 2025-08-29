import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import ArticleSection from "@/components/ProductDetails/ArticleSection";
import ColorSection from "@/components/ProductDetails/ColorSection";
import ProductInfoSection from "@/components/ProductDetails/ProductInfoSection";
import ProductSection from "@/components/ProductDetails/ProductSection";
import { getCachedProductById } from "@/lib/database";
import {
  ArticleProps,
  ColorProps,
  ProductWithColorAndArticlesProps,
} from "@/types/ProductProps";

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
      <div className="my-8 flex flex-row items-start gap-8">
        <section className="flex w-[50%] flex-col">
          <ProductSection product={product} />
        </section>
        <div>
          <section>
            <ArticleSection articles={product.articles} />
          </section>

          <section>
            <ColorSection
              colors={product.colors}
              selectedColor={selectedColor}
            />
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
