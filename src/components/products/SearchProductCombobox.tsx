"use client";

import React, {
  useEffect,
  useState,
} from "react";

import clsx from "clsx";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";

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
import { ProductSearchProps } from "@/features/products/types";
import { searchProducts } from "@/lib/database";
import useDebounce from "@/lib/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

interface SearchProductComboboxProps {
  productIdHandler: (id: number) => void;
}
export default function SearchProductCombobox({
  productIdHandler,
}: SearchProductComboboxProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ProductSearchProps | null>(
    null,
  );
  const [products, setProducts] = useState<ProductSearchProps[] | []>([]);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (selectedItem !== null) {
      productIdHandler(selectedItem.productId);
    }
  }, [selectedItem, productIdHandler]);

  // search products (with debounced)
  useEffect(() => {
    async function fetchProducts() {
      // If search is empty, clear products
      if (debouncedSearch.length === 0) {
        setProducts([]);
        return;
      }
      const result: ProductSearchProps[] | [] =
        await searchProducts(debouncedSearch);

      setProducts(result);
    }
    fetchProducts();
  }, [search, setSearch]);

  return (
    <>
      <Label className={cn("mb-2 block text-sm font-medium")}>
        Bitte wähle das Produkt aus, dem der Artikel zugeordnet werden soll.
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mb-4 max-w-96 justify-between overflow-hidden"
          >
            {selectedItem ? selectedItem.name : "Produkt suchen..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-96 p-0">
          <Command className="bg-background">
            <CommandInput
              onValueChange={setSearch}
              value={search}
              placeholder="Produkt suchen..."
              className="h-9 bg-background"
              autoComplete="off"
            />
            <CommandList>
              <CommandEmpty>Kein Produkt gefunden.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={product.productId}
                    value={`${product.productId} ${product.name}`}
                    onSelect={() => {
                      setSelectedItem(product);
                      setOpen(false);
                    }}
                  >
                    {product.productId} {product.name}
                    <Check
                      className={clsx(
                        "ml-auto cursor-pointer",

                        selectedItem?.productId === product.productId
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
    </>
  );
}
