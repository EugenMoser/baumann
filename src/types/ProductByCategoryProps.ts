type ColorProps = {
  name: string;
  id: string;
  colorId: string;
  code: string;
};

//type for retrieval from the database with nested color structure
export type ProductByCategoryFromDBProps = {
  id: string;
  category: string;
  prio: number;
  name: string;
  description1: string | null;
  imageUrlSmall: string | null;

  colorConnection: { color: ColorProps }[];
};

export type ProductByCategoryProps = Omit<
  ProductByCategoryFromDBProps,
  "colorConnection"
> & {
  colors: ColorProps[];
};
