import {
  BedDouble,
  Brackets,
  Droplets,
  Fan,
  LucideIcon,
  Zap,
} from "lucide-react";

export type ProductCategoriesProps = {
  category: "moebel" | "halterung" | "wasser" | "lueftung" | "elektro";
  name: string;
  href: string;
};

// Icon-Map für die verschiedenen Kategorien
export const categoryIcons: Record<
  ProductCategoriesProps["category"],
  LucideIcon
> = {
  moebel: BedDouble,
  halterung: Brackets,
  wasser: Droplets,
  lueftung: Fan,
  elektro: Zap,
};

const productCategories: ProductCategoriesProps[] = [
  {
    category: "moebel",
    name: "Möbel",
    href: "/products/moebel",
  },
  {
    category: "halterung",
    name: "Halterungen",
    href: "/products/halterung",
  },
  {
    category: "wasser",
    name: "Wasser",
    href: "/products/wasser",
  },
  {
    category: "lueftung",
    name: "Lüftungen",
    href: "/products/lueftung",
  },
  {
    category: "elektro",
    name: "Elektro",
    href: "/products/elektro",
  },
];

export default productCategories;

//className = "transition-transform duration-300 group-hover:scale-110",
