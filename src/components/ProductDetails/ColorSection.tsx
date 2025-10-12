"use client";
import {
  useEffect,
  useRef,
  useState,
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
import { ColorProps } from "@/types/ProductProps";

interface ColorSectionProps {
  colors: ColorProps[];
}

function ColorSection({ colors }: ColorSectionProps): React.JSX.Element {
  // This useRef stores an array of references to each RadioGroupItem element.
  // The array helps access individual radio buttons directly (e.g., for focus management).
  // It starts as an empty array and gets updated dynamically as the elements mount.
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  //************* */

  const [selectedColorId, setSelectedColorId] = useState(
    searchParams.get("color") || (colors[0]?.id ?? ""), // default to first color if none selected
  );

  useEffect(() => {
    // if no search param is set, initialize
    if (!searchParams.get("color") && selectedColorId) {
      params.set("color", selectedColorId);
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [selectedColorId, searchParams, pathname, replace]);

  function handleSelect(colorId: string) {
    if (selectedColorId === colorId) return;
    setSelectedColorId(colorId); // ⚡ sofortiges Feedback
    params.set("color", colorId);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <h3 className="mb-4">
        Farbe
        <br />
        <span className="text-article">
          In welcher Farbe benötigen Sie das Produkt?
        </span>
      </h3>

      <p className="mb-4">
        {colors.find((color) => color.id === selectedColorId)?.name}
      </p>

      <RadioGroup
        className="flex gap-4"
        value={selectedColorId}
        onValueChange={handleSelect}
      >
        {colors.map((color, index) => {
          const isChecked = selectedColorId === color.id;
          return (
            <div key={index}>
              <RadioGroupItem
                ref={(el) => {
                  radioRefs.current[index] = el; // Store reference to each radio button
                }}
                value={color.id}
                id={index.toString()}
                style={
                  {
                    "--bg-color": color.code || "transparent",
                  } as React.CSSProperties
                }
                className={clsx(
                  `border-[0.5px] border-foreground bg-[var(--bg-color)] p-4`,
                  isChecked &&
                    "ring-2 ring-color-active ring-offset-2 ring-offset-background",
                )}
                aria-label={color.name}
              />
            </div>
          );
        })}
      </RadioGroup>
      <hr className="my-8 border-solid border-foreground" />
    </>
  );
}

export default ColorSection;
