"use client";

import { startTransition, useRef, useState } from "react";

import { Check, ChevronDown, ChevronUp, Plus, Search, X } from "lucide-react";

import { addColor } from "@/features/color";
import {
  ColorNotificationFormStates,
  ColorProps,
} from "@/features/color/types";

interface NewColorFormData {
  colorId: string;
  name: string;
  code: string;
}

interface ColorSelectorFieldProps {
  /** All available colors (will be extended in local state when new ones are created) */
  allColors: ColorProps[];
  /** Currently selected colorId strings (RAL numbers, matches Color.colorId) */
  selectedColorIds: string[];
  /** Called when a color's selected state is toggled */
  onToggle: (colorId: string) => void;
}

const initialNewColor: NewColorFormData = { colorId: "", name: "", code: "#" };
const initialCreateState: ColorNotificationFormStates = {
  message: "",
  errors: {},
  success: false,
};

/**
 * Color selector with searchable dropdown and inline color creation.
 * - Select existing colors via search combobox (multi-select)
 * - Create a new color inline without leaving the form
 */
export function ColorSelectorField({
  allColors,
  selectedColorIds,
  onToggle,
}: ColorSelectorFieldProps): React.JSX.Element {
  // Extend the list locally so newly created colors appear immediately
  const [localColors, setLocalColors] = useState<ColorProps[]>(allColors);
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColorData, setNewColorData] =
    useState<NewColorFormData>(initialNewColor);
  const [createErrors, setCreateErrors] = useState<
    ColorNotificationFormStates["errors"]
  >({});
  const [isCreating, setIsCreating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter colors by name or colorId (RAL number)
  const filteredColors = searchQuery.trim()
    ? localColors.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.colorId.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : localColors;

  const selectedColors = localColors.filter((c) =>
    selectedColorIds.includes(c.colorId),
  );

  /** Close dropdown when clicking outside the container */
  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setShowList(false);
    }
  };

  const handleToggleNewForm = () => {
    setIsCreatingNew((prev) => !prev);
    setNewColorData(initialNewColor);
    setCreateErrors({});
  };

  const handleNewColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewColorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateColor = () => {
    if (isCreating) return;
    setIsCreating(true);
    setCreateErrors({});

    const fd = new FormData();
    fd.set("colorId", newColorData.colorId.trim());
    fd.set("name", newColorData.name.trim());
    fd.set("code", newColorData.code.trim());
    fd.set("colorSuffix", "0");

    startTransition(async () => {
      const result = await addColor(initialCreateState, fd);

      if (result.success && result.createdColor) {
        const newColor: ColorProps = result.createdColor;
        setLocalColors((prev) => [...prev, newColor]);
        onToggle(newColor.colorId); // auto-select the newly created color
        setNewColorData(initialNewColor);
        setIsCreatingNew(false);
      } else {
        setCreateErrors(result.errors ?? {});
      }
      setIsCreating(false);
    });
  };

  return (
    <div
      ref={containerRef}
      className="space-y-3"
      onBlur={handleContainerBlur}
      tabIndex={-1}
    >
      {/* Selected color chips */}
      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedColors.map((color) => (
            <span
              key={color.colorId}
              className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 text-sm shadow-sm"
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-gray-300"
                style={{ backgroundColor: color.code }}
              />
              {color.name}
              <button
                type="button"
                aria-label={`${color.name} entfernen`}
                onClick={() => onToggle(color.colorId)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-gray-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search combobox */}
      <div className="relative">
        <div className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Farbe suchen (Name oder RAL-Nr.) …"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowList(true)}
            className="w-full bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setShowList((v) => !v);
              searchInputRef.current?.focus();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            {showList ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Dropdown list */}
        {showList && (
          <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-button-background shadow-lg">
            {filteredColors.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-400">
                Keine Farben gefunden.
              </p>
            ) : (
              filteredColors.map((color) => {
                const isSelected = selectedColorIds.includes(color.colorId);
                return (
                  <button
                    key={color.colorId}
                    type="button"
                    onClick={() => onToggle(color.colorId)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:text-background hover:bg-button-hover${
                      isSelected ? "bg-blue-50 font-medium" : ""
                    }`}
                  >
                    <span
                      className="border-g h-4 w-4 shrink-0 rounded-full border"
                      style={{ backgroundColor: color.code }}
                    />
                    <span className="flex-1">{color.name} </span>
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-blue-600" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* New color section */}
      <div className="rounded-md border">
        <button
          type="button"
          onClick={handleToggleNewForm}
          className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          {isCreatingNew ? "Abbrechen" : "Neue Farbe anlegen"}
        </button>

        {isCreatingNew && (
          <div className="space-y-3 border-t px-4 py-3">
            {/* RAL-Nr. */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">RAL-Nr. / ID</label>
              <input
                type="text"
                name="colorId"
                placeholder="z.B. 9010"
                value={newColorData.colorId}
                onChange={handleNewColorChange}
                className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {createErrors?.colorId && (
                <p className="text-xs text-red-500">
                  {createErrors.colorId[0]}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="z.B. Reinweiß"
                value={newColorData.name}
                onChange={handleNewColorChange}
                className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {createErrors?.colorName && (
                <p className="text-xs text-red-500">
                  {createErrors.colorName[0]}
                </p>
              )}
            </div>

            {/* HEX code + live preview */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                HEX-Code{" "}
                <span className="font-normal text-gray-400">
                  (z.B. #FFFFFF)
                </span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="code"
                  placeholder="#FFFFFF"
                  value={newColorData.code}
                  onChange={handleNewColorChange}
                  className="flex-1 rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Live color preview */}
                <span
                  className="h-8 w-8 shrink-0 rounded-full border-2 border-gray-200"
                  style={{
                    backgroundColor: /^#[0-9a-fA-F]{6}$/.test(newColorData.code)
                      ? newColorData.code
                      : "transparent",
                  }}
                />
                {/* Native color picker as convenience */}
                <input
                  type="color"
                  title="Farbe auswählen"
                  value={
                    /^#[0-9a-fA-F]{6}$/.test(newColorData.code)
                      ? newColorData.code
                      : "#ffffff"
                  }
                  onChange={(e) =>
                    setNewColorData((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  className="h-8 w-8 cursor-pointer rounded border p-0.5"
                />
              </div>
              {createErrors?.colorCode && (
                <p className="text-xs text-red-500">
                  {createErrors.colorCode[0]}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleCreateColor}
              disabled={isCreating}
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isCreating ? "Wird gespeichert …" : "Farbe speichern"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
