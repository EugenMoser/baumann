"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchProducts } from "@/lib/database";
import { cn } from "@/lib/utils";
import { ProductSearchProps } from "@/types/product";

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface SearchProductComboboxProps {
  productIdHandler: (id: number) => void;
}
export default function SearchProductCombobox({
  productIdHandler,
}: SearchProductComboboxProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<ProductSearchProps | null>(
    null,
  );
  const [products, setProducts] = React.useState<ProductSearchProps[] | []>([]);
  const debouncedSearch = useDebounce(search, 400);

  React.useEffect(() => {
    if (selected !== null) {
      productIdHandler(selected.productId);
    }
  }, [selected, productIdHandler]);

  // search products (with debounced)
  React.useEffect(() => {
    async function fetchProducts() {
      if (debouncedSearch.length === 0) {
        setProducts([]);
        return;
      }
      const result: ProductSearchProps[] | [] =
        await searchProducts(debouncedSearch);
      setProducts(result);
    }
    fetchProducts();
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="bg-background">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[min-content] justify-between"
        >
          {selected ? selected.name : "Produkt suchen..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-background">
          <CommandInput
            onValueChange={setSearch}
            placeholder="Produkt suchen..."
            className="h-9 bg-background"
          />
          <CommandList className="bg-background">
            <CommandEmpty>Kein Produkt gefunden.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.productId}
                  value={product.name}
                  onSelect={() => {
                    setSelected({
                      productId: product.productId,
                      name: product.name,
                    });
                    setOpen(false);
                  }}
                >
                  {product.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected?.productId === product.productId
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
