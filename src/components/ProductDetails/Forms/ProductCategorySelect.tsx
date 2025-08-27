import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import productCategories, {
  type CategoryProps,
} from "@/constants/productCategories";

interface ProductCategorySelectProps {
  name: string;
  title: string;
  value: CategoryProps["category"];
  onChange: (value: CategoryProps["category"]) => void;
  "aria-describedby": string;
  error?: string | string[];
}

export default function ProductCategorySelect(
  props: ProductCategorySelectProps,
): React.JSX.Element {
  return (
    <div className="mb-4 grid w-full max-w-sm items-center gap-2">
      <div>{props.title}</div>
      <Select
        name="category"
        value={props.value}
        onValueChange={props.onChange}
        aria-describedby={props["aria-describedby"]}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.name} />
        </SelectTrigger>
        <SelectContent>
          {productCategories.map((category) => (
            <SelectItem key={category.category} value={category.category}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {props.error && (
        <div
          id={props["aria-describedby"]}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 text-sm text-red-500" key={props.error[0]}>
            {props.error}
          </p>
        </div>
      )}
    </div>
  );
}
