import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface SelectColorProps {}

export default function SelectColor({}: SelectColorProps): React.JSX.Element {
  return (
    <>
      <h2>Farbe wählen</h2>

      <RadioGroup defaultValue="default">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label>vorhandene Farbe wählen</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label>neue Farbe hinzufügen</Label>
        </div>
      </RadioGroup>
    </>
  );
}
