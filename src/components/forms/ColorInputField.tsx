import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorInputFieldProps {
  type: string;
  colorId: string;
  title: string;
  value: string;
  "aria-describedby": string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string[];
}

export default function ColorInputField(
  props: ColorInputFieldProps,
): React.JSX.Element {
  return (
    <div className="mb-4 grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={props.colorId}>{props.title}</Label>
      <Input
        id={props.colorId}
        type={props.type}
        name={props.title}
        placeholder={props.placeholder}
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
          <p
            className="mt-2 flex flex-col text-sm text-red-500"
            key={props.colorId}
          >
            {props.error.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
