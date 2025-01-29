export type ProductCategoriesProps = {
  category: string;
  name: string;
  icon: string;
};

const productCategories: ProductCategoriesProps[] = [
  {
    category: "moebel", //
    name: "Möbelbereich",
    icon: "furniture.svg",
  },
  {
    category: "halterung",
    name: "Halterungsbereich",
    icon: "bracket.svg",
  },
  {
    category: "wasser",
    name: "Wasserbereich",
    icon: "water.svg",
  },
  {
    category: "lueftung",
    name: "Lüftungsbereich",
    icon: "air.svg",
  },
  {
    category: "elektro",
    name: "Elektrobereich",
    icon: "electric.svg",
  },
];

export default productCategories;
