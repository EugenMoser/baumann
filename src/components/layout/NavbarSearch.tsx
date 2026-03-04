"use client";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import useDebounce from "@/lib/hooks/useDebounce";

/**
 * Navbar search component with debounced navigation.
 * Navigates to /products/search?q=... on debounced input change.
 */
export default function NavbarSearch(): React.JSX.Element {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 400);
  const router = useRouter();

  // Navigate to search results page when debounced value changes
  useEffect(() => {
    if (debouncedSearch.trim().length === 0) return;
    router.push(
      `/products/search?q=${encodeURIComponent(debouncedSearch.trim())}`,
    );
  }, [debouncedSearch, router]);

  return (
    <div className="mr-4 flex items-center rounded-md border bg-background px-3">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Produkt suchen..."
        className="placeholder:text-muted-foreground h-9 w-44 bg-transparent text-sm outline-none"
        autoComplete="off"
      />
    </div>
  );
}
