import {
  useEffect,
  useRef,
} from "react";

import clsx from "clsx";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { ColorProps } from "@/types/Product";

interface ColorSectionProps {
  colors: ColorProps[];
  selectedColor: ColorProps | undefined;
  onSelect: (id: string) => void;
}

function ColorSection({
  colors,
  selectedColor,
  onSelect,
}: ColorSectionProps): React.JSX.Element {
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getCheckedColor(id: string): boolean {
    return selectedColor?.id === id;
  }

  useEffect(() => {
    // set initial the default color value to selected color id
    const defaultColorValue: string = colors.length > 1 ? "" : colors[0].id;
    if (defaultColorValue) onSelect(defaultColorValue);
  }, [colors]);

  return (
    <>
      <h1>Color Infos</h1>
      <p>{selectedColor?.name}</p>

      <RadioGroup defaultValue={selectedColor?.name} onValueChange={onSelect}>
        {colors.map((color, index) => {
          const isChecked = getCheckedColor(color.id);

          return (
            <div key={index}>
              <RadioGroupItem
                ref={(el) => {
                  radioRefs.current[index] = el;
                }}
                value={color.id}
                id={index.toString()}
                style={
                  {
                    "--bg-color": color.code || "transparent",
                  } as React.CSSProperties
                }
                className={clsx(
                  `border-none bg-[var(--bg-color)] p-4`,
                  isChecked && "p-4 ring-2 ring-red-900 ring-offset-2",
                )}
              />
            </div>
          );
        })}
      </RadioGroup>
      <ul></ul>
    </>
  );
}

export default ColorSection;
