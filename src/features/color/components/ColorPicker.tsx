"use client";

import { startTransition, useState } from "react";

import { Check, ChevronsUpDown, Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addColor } from "@/features/color/actions/mutations/addColor";
import {
  ColorNotificationFormStates,
  ColorProps,
} from "@/features/color/types";
import { cn } from "@/lib/utils";

interface NewColorFormData {
  colorId: string;
  name: string;
  code: string;
}

const initialNewColor: NewColorFormData = { colorId: "", name: "", code: "#" };

interface ColorPickerProps {
  /** Colors currently assigned/selected – rendered as removable chips. */
  currentColors: ColorProps[];
  /**
   * Colors available to pick from. Should already be filtered so there is no
   * overlap with `currentColors`.
   */
  availableColors: ColorProps[];
  /** Called when the user picks an existing color and confirms with "Hinzufügen". */
  onAdd: (colorId: string) => void;
  /** Called when the user clicks the remove (✕) button on a chip. */
  onRemove: (colorId: string) => void;
  /**
   * Called after a brand-new color is persisted to the DB.
   * The parent is responsible for assigning / selecting it.
   */
  onNewColorCreated?: (color: ColorProps) => void;
  /** Disables buttons while an external async operation is in progress. */
  isPending?: boolean;
}

/**
 * Reusable color picker used in both the new-product form and the
 * edit-product color management section.
 *
 * Features:
 * - Removable chips for currently selected/assigned colors
 * - Searchable combobox (Popover + Command) to pick from existing colors
 * - Collapsible inline form to create a brand-new color
 */
export function ColorPicker({
  currentColors,
  availableColors,
  onAdd,
  onRemove,
  onNewColorCreated,
  isPending = false,
}: ColorPickerProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState("");

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColorData, setNewColorData] =
    useState<NewColorFormData>(initialNewColor);
  const [createErrors, setCreateErrors] = useState<
    ColorNotificationFormStates["errors"]
  >({});
  const [isCreating, setIsCreating] = useState(false);

  const selectedColor = availableColors.find(
    (c) => c.colorId === selectedColorId,
  );

  const handleNewColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewColorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleNewForm = () => {
    setIsCreatingNew((prev) => !prev);
    setNewColorData(initialNewColor);
    setCreateErrors({});
  };

  const handleConfirmAdd = () => {
    if (!selectedColorId) return;
    onAdd(selectedColorId);
    setSelectedColorId("");
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
      const result = await addColor({ success: false, errors: {} }, fd);

      if (result.success && result.createdColor) {
        onNewColorCreated?.(result.createdColor);
        setNewColorData(initialNewColor);
        setIsCreatingNew(false);
      } else {
        setCreateErrors(result.errors ?? {});
      }

      setIsCreating(false);
    });
  };

  return (
    <div className="space-y-3">
      {/* Currently selected / assigned color chips */}
      {currentColors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentColors.map((color) => (
            <span
              key={color.colorId}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm shadow-sm"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-300"
                style={{ backgroundColor: color.code }}
              />
              {color.name}
              <Button
                type="button"
                aria-label={`${color.name} entfernen`}
                onClick={() => onRemove(color.colorId)}
                disabled={isPending}
                className="btn-remove"
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
      )}

      {/* Combobox – pick an existing color */}
      {availableColors.length > 0 && (
        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={isPending}
                className="w-64 justify-between"
              >
                {selectedColor ? (
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border"
                      style={{ backgroundColor: selectedColor.code }}
                    />
                    {selectedColor.name}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Farbe auswählen…
                  </span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder="Suchen nach Name, ID, HEX…" />
                <CommandList>
                  <CommandEmpty>Keine Treffer.</CommandEmpty>
                  <CommandGroup>
                    {availableColors.map((color) => (
                      <CommandItem
                        key={color.colorId}
                        value={`${color.name} ${color.colorId} ${color.code}`}
                        onSelect={() => {
                          setSelectedColorId(
                            color.colorId === selectedColorId
                              ? ""
                              : color.colorId,
                          );
                          setOpen(false);
                        }}
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border"
                          style={{ backgroundColor: color.code }}
                        />
                        <span className="truncate">{color.name}</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {color.code}
                        </span>
                        <Check
                          className={cn(
                            "ml-1 h-4 w-4 shrink-0",
                            selectedColorId === color.colorId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            onClick={handleConfirmAdd}
            disabled={!selectedColorId || isPending}
            className="btn"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Hinzufügen"
            )}
          </Button>
        </div>
      )}

      {/* Inline form – create a brand-new color */}
      <div className="w-fit rounded-md border">
        <Button
          type="button"
          variant="ghost"
          onClick={handleToggleNewForm}
          className="btn"
        >
          <Plus className="h-4 w-4" />
          {isCreatingNew ? "Abbrechen" : "Neue Farbe anlegen"}
        </Button>

        {isCreatingNew && (
          <div className="space-y-3 border-t px-4 py-3">
            {/* RAL-Nr. / ID */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium">RAL-Nr. / ID</Label>
              <Input
                type="text"
                name="colorId"
                placeholder="z.B. 9010"
                value={newColorData.colorId}
                onChange={handleNewColorChange}
              />
              {createErrors?.colorId && (
                <p className="text-xs text-red-500">
                  {createErrors.colorId[0]}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="z.B. Reinweiß"
                value={newColorData.name}
                onChange={handleNewColorChange}
              />
              {createErrors?.colorName && (
                <p className="text-xs text-red-500">
                  {createErrors.colorName[0]}
                </p>
              )}
            </div>

            {/* HEX code + live preview + color-picker input */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium">
                HEX-Code{" "}
                <span className="font-normal text-gray-400">
                  (z.B. #FFFFFF)
                </span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  name="code"
                  placeholder="#FFFFFF"
                  value={newColorData.code}
                  onChange={handleNewColorChange}
                  className="flex-1"
                />
                {/* Live preview swatch */}
                <span
                  className="h-8 w-8 shrink-0 rounded-full border-2 border-gray-200"
                  style={{
                    backgroundColor: /^#[0-9a-fA-F]{6}$/.test(newColorData.code)
                      ? newColorData.code
                      : "transparent",
                  }}
                />
                {/* Native color picker as convenience */}
                <Input
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

            <Button
              type="button"
              onClick={handleCreateColor}
              disabled={isCreating}
              className="btn"
            >
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCreating ? "Wird gespeichert…" : "Farbe speichern"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
