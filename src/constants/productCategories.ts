export type ProductCategoriesProps = {
  category: "moebel" | "halterung" | "wasser" | "lueftung" | "elektro";
  name: string;
  icon: string;
  href: string;
};

const productCategories: ProductCategoriesProps[] = [
  {
    category: "moebel",
    name: "Möbelbereich",
    icon: "furniture.svg",
    href: "/products/moebel",
  },
  {
    category: "halterung",
    name: "Halterungsbereich",
    icon: "bracket.svg",
    href: "/products/halterung",
  },
  {
    category: "wasser",
    name: "Wasserbereich",
    icon: "water.svg",
    href: "/products/wasser",
  },
  {
    category: "lueftung",
    name: "Lüftungsbereich",
    icon: "air.svg",
    href: "/products/lueftung",
  },
  {
    category: "elektro",
    name: "Elektrobereich",
    icon: "electric.svg",
    href: "/products/elektro",
  },
];

export default productCategories;
