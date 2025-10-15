import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductTextFieldProps {
  id: string;
  name: string;
  title: string;
  "aria-describedby": string;
  value?: string | number | undefined | null;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string | string[];
}

export default function ProductTextField(
  props: ProductTextFieldProps,
): React.JSX.Element {
  return (
    <div className="mb-4 grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Textarea
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={props.onChange}
        aria-describedby={props["aria-describedby"]}
      />
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
