import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductInputFieldProps {
  id: string;
  name: string;
  title: string;
  type: string;
  "aria-describedby": string;
  placeholder?: string;
  accept?: string;
  min?: number;
  step?: number;
  max?: number;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
}

export  function ProductInputField(
  props: ProductInputFieldProps,
): React.JSX.Element {
  return (
    <div className="mb-4 grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        accept={props.accept}
        min={props.min}
        step={props.step}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        aria-describedby={props["aria-describedby"]}
      />
      {props.error && (
        <div
          id={props["aria-describedby"]}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mt-2 flex flex-col text-sm text-red-500" key={props.id}>
            {props.error.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
