import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ColorProps } from "@/types/Product";

interface ColorSectionProps {
  colors: ColorProps[];
}

function ColorSection({ colors }: ColorSectionProps): React.JSX.Element {
  function getBackgroundColor(colorCode?: string) {
    return colorCode || "transparent";
  }

  return (
    <>
      <h1>Color Infos</h1>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            <div
              style={
                {
                  "--bg-color": getBackgroundColor(color.code),
                } as React.CSSProperties
              }
              className="bg-[var(--bg-color)] p-4"
            ></div>
            <p>{color.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ColorSection;
