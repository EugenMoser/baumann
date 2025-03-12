"use client";
import {
  useEffect,
  useRef,
} from "react";

import clsx from "clsx";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { ColorProps } from "@/types/Product";

interface ColorSectionProps {
  colors: ColorProps[];
  selectedColor: ColorProps | undefined;
  // onSelect: (id: string) => void;
}

function ColorSection({
  colors,
  selectedColor,
  // onSelect,
}: ColorSectionProps): React.JSX.Element {
  // This useRef stores an array of references to each RadioGroupItem element.
  // The array helps access individual radio buttons directly (e.g., for focus management).
  // It starts as an empty array and gets updated dynamically as the elements mount.
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // get current value from the SearchParams
  const defaultSelectedValue = searchParams.get("color") || "";
  console.log("color length | id", colors.length, colors[0].id);
  useEffect(() => {
    // set initial color value to to the first color
    const defaultColorValue: string = colors.length > 0 ? colors[0].id : "";

    // prevent the URL from being replaced unnecessarily
    if (!defaultSelectedValue && defaultColorValue) {
      params.set("color", defaultColorValue);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [colors, searchParams, pathname, replace]);

  function handleSelect(colorId: string): void {
    console.log("colorId", colorId);

    // Avoids unnecessary updates
    if (defaultSelectedValue === colorId) return;
    params.set("color", colorId);
    replace(`${pathname}?${params.toString()}`);
  }

  function getCheckedColor(id: string): boolean {
    return defaultSelectedValue === id;
  }

  return (
    <>
      <h1>Color Infos</h1>
      <p>{selectedColor?.name}</p>

      <RadioGroup
        defaultValue={selectedColor?.name}
        onValueChange={(event) => handleSelect(event)}
      >
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
