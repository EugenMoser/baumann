"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
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
import { getProductById, searchProducts } from "@/features/product";
import {
  ProductSearchProps,
  ProductWithColorAndArticlesProps,
} from "@/features/product/types";
import useDebounce from "@/lib/hooks/useDebounce";
import { Label } from "@radix-ui/react-label";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

interface SearchProductComboboxProps {
  productIdHandler: (product: { id: number; name: string }) => void;
  urlProductId?: string | null;
}
export default function SearchProductCombobox({
  productIdHandler,
  urlProductId,
}: SearchProductComboboxProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ProductSearchProps | null>(
    null,
  );
  const [products, setProducts] = useState<ProductSearchProps[] | []>([]);
  const debouncedSearch = useDebounce(search, 400);

  // If urlProductId is set, load the product and set it as selectedItem
  useEffect(() => {
    if (urlProductId) {
      (async () => {
        const product: ProductWithColorAndArticlesProps =
          await getProductById(urlProductId);

        if (product.name && product.productId) {
          setSelectedItem(product);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      productIdHandler({ id: selectedItem.productId, name: selectedItem.name });
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

      // Sort results by productId ascending
      const sortedResult = result.sort((a, b) => a.productId - b.productId);
      setProducts(sortedResult);
    }
    fetchProducts();
  }, [debouncedSearch]);

  const listHeading = (
    <div className="flex items-center gap-2 pl-2 font-semibold">
      <span className="underline">ID</span> |
      <span className="underline">Name</span>
    </div>
  );

  return (
    <>
      <Label
        htmlFor="product-combobox"
        className="mb-2 mt-4 block text-sm font-medium"
      >
        Bitte Produkt auswählen um den zu erstellenden Artikel zuzuordnen.
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mb-4 w-96 justify-between overflow-hidden"
          >
            {selectedItem ? selectedItem.name : "Produkt suchen..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-96 bg-slate-100 p-0">
          <Command>
            <CommandInput
              onValueChange={setSearch}
              value={search}
              placeholder="Produkt suchen..."
              className="h-9 bg-background"
              autoComplete="off"
            />
            <TooltipProvider>
              <CommandList className="bg-hotpink-50 max-h-60 max-w-[25vw] overflow-y-auto rounded">
                <CommandEmpty>Kein Produkt gefunden.</CommandEmpty>
                <CommandGroup heading={products.length > 0 ? listHeading : ""}>
                  {products.map((product) => (
                    <Tooltip key={product.productId}>
                      <TooltipTrigger className="w-full">
                        <CommandItem
                          className={clsx(
                            "mx-2 mb-2 max-w-full cursor-pointer bg-button-background shadow-sm hover:bg-button-hover hover:text-button",
                            {
                              "bg-button-hover text-button":
                                selectedItem?.productId === product.productId,
                            },
                          )}
                          key={product.productId}
                          value={`${product.productId} ${product.name}`}
                          onSelect={() => {
                            setSelectedItem(product);
                          }}
                        >
                          <p className="justify-start">
                            {product.productId} | {product.name}
                          </p>
                          <Check
                            className={clsx("ml-auto cursor-pointer", {
                              "opacity-100":
                                selectedItem?.productId === product.productId,
                              "opacity-0":
                                selectedItem?.productId !== product.productId,
                            })}
                          />
                        </CommandItem>
                      </TooltipTrigger>
                      {product.description1 && (
                        <TooltipContent
                          side="right"
                          className="max-w-xs border bg-background"
                        >
                          <p>{product.description1}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </CommandGroup>
              </CommandList>
            </TooltipProvider>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
