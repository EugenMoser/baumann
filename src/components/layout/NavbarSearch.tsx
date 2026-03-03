"use client";

import { useEffect, useRef, useState } from "react";

import { Search } from "lucide-react";
import Link from "next/link";

import { searchProducts } from "@/features/product";
import { ProductSearchProps } from "@/features/product/types";
import useDebounce from "@/lib/hooks/useDebounce";

/**
 * Navbar search component with debounced product search.
 * Searches products by name or productId and displays results in a dropdown.
 */
export default function NavbarSearch(): React.JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ProductSearchProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 400);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch search results when debounced search changes
  useEffect(() => {
    async function fetchProducts() {
      if (debouncedSearch.length === 0) {
        setProducts([]);
        setIsOpen(false);
        return;
      }
      const result = await searchProducts(debouncedSearch);
      const sorted = result.sort((a, b) => a.productId - b.productId);
      setProducts(sorted);
      setIsOpen(true);
    }
    fetchProducts();
  }, [debouncedSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <div className="flex items-center rounded-md border bg-background px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => products.length > 0 && setIsOpen(true)}
          placeholder="Produkt suchen..."
          className="placeholder:text-muted-foreground h-9 w-44 bg-transparent text-sm outline-none"
          autoComplete="off"
        />
      </div>

      {isOpen && products.length > 0 && (
        <ul className="bg-popover absolute left-0 top-full z-50 mt-1 max-h-60 w-72 overflow-y-auto rounded-md border shadow-lg">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/products/${product.category}/${product.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setSearch("");
                }}
                className="hover:bg-accent hover:text-accent-foreground flex flex-col px-3 py-2 text-sm"
              >
                <span className="font-medium">
                  {product.productId} | {product.name}
                </span>
                {product.description1 && (
                  <span className="text-muted-foreground line-clamp-1 text-xs">
                    {product.description1}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isOpen && debouncedSearch.length > 0 && products.length === 0 && (
        <div className="bg-popover text-muted-foreground absolute left-0 top-full z-50 mt-1 w-72 rounded-md border px-3 py-2 text-sm shadow-lg">
          Kein Produkt gefunden.
        </div>
      )}
    </div>
  );
}
