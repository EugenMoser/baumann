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
    name: "Möbelbereich",
    href: "/products/moebel",
  },
  {
    category: "halterung",
    name: "Halterungsbereich",
    href: "/products/halterung",
  },
  {
    category: "wasser",
    name: "Wasserbereich",
    href: "/products/wasser",
  },
  {
    category: "lueftung",
    name: "Lüftungsbereich",
    href: "/products/lueftung",
  },
  {
    category: "elektro",
    name: "Elektrobereich",
    href: "/products/elektro",
  },
];

export default productCategories;

//className = "transition-transform duration-300 group-hover:scale-110",
