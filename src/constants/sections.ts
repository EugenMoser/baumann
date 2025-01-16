export type SectionsProps = {
  category:
    | "moebel"
    | "halterung"
    | "wasser"
    | "lueftung"
    | "elektro"
    | "wasser"
    | null;
  name: string;
  icon: string;
};

const sections: SectionsProps[] = [
  {
    category: "moebel",
    name: "Möbelbereich",
    icon: `<Image src="/icons/water.svg" fill alt="test" />`,
  },
  {
    category: "halterung",
    name: "Halterungsbereich",
    icon: `<Image src="/icons/water.svg" fill alt="test" />`,
  },
  {
    category: "wasser",
    name: "Wasserbereich",
    icon: `<Image src="/icons/water.svg" fill alt="test" />`,
  },
  {
    category: "lueftung",
    name: "Lüftungsbereich",
    icon: `<Image src="/icons/water.svg" fill alt="test" />`,
  },
  {
    category: "elektro",
    name: "Elektrobereich",
    icon: `<Image src="/icons/water.svg" fill alt="test" />`,
  },
];

export default sections;
