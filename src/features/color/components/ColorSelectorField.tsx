"use client";

import { useState } from "react";

import { ColorPicker } from "@/features/color/components/ColorPicker";
import { ColorProps } from "@/features/color/types";

interface ColorSelectorFieldProps {
  /** Full list of colors available in the system. */
  allColors: ColorProps[];
  /** colorId values that are currently selected in the parent form. */
  selectedColorIds: string[];
  /** Called when a color's selected state should be toggled. */
  onToggle: (colorId: string) => void;
}

/**
 * Form-field wrapper around ColorPicker for the new-product context.
 *
 * Manages a local color list so colors created inline appear immediately
 * without a server round-trip, and auto-selects them after creation.
 * The parent form submits the final selectedColorIds together with the rest
 * of the form data.
 */
export function ColorSelectorField({
  allColors,
  selectedColorIds,
  onToggle,
}: ColorSelectorFieldProps): React.JSX.Element {
  // Extend the master list locally so newly created colors appear immediately.
  const [localColors, setLocalColors] = useState<ColorProps[]>(allColors);

  const currentColors = localColors.filter((c) =>
    selectedColorIds.includes(c.colorId),
  );
  const availableColors = localColors.filter(
    (c) => !selectedColorIds.includes(c.colorId),
  );

  const handleNewColorCreated = (newColor: ColorProps) => {
    setLocalColors((prev) => [...prev, newColor]);
    onToggle(newColor.colorId); // auto-select after creation
  };

  return (
    <ColorPicker
      currentColors={currentColors}
      availableColors={availableColors}
      onAdd={onToggle}
      onRemove={onToggle}
      onNewColorCreated={handleNewColorCreated}
    />
  );
}
