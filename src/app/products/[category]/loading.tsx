import ProductCardByCategorySkeleton from "@/features/product/components/ProductCardByCategorySkeleton";

export default function Loading(): React.JSX.Element {
  return (
    <div className="py-6">
      <ul className="dynamicGrid grid gap-6 rounded-sm">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="h-full">
            <ProductCardByCategorySkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
