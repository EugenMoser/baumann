"use client";

import { useState, useTransition } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addColor } from "@/features/color/actions/mutations/addColor";
import { ColorProps } from "@/features/color/types";
import { addColorToProductAction } from "@/features/product/actions/mutations/addColorToProduct";
import { removeColorFromProductAction } from "@/features/product/actions/mutations/removeColorFromProduct";
import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";

interface ProductColorManagementProps {
  productId: number;
  currentColors: ColorProps[];
  allColors: Color[];
}

/**
 * Client component for managing color connections on an existing product.
 * Uses a Shadcn Combobox (Popover + Command) so the user can both search
 * and scroll through all available colors.
 */
export function ProductColorManagement({
  productId,
  currentColors,
  allColors,
}: ProductColorManagementProps): React.JSX.Element {
  const [isPending, startTransition] = useTransition();

  // Combobox state
  const [open, setOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState("");

  // New color form state
  const [showNewColorForm, setShowNewColorForm] = useState(false);
  const [newColorFormData, setNewColorFormData] = useState({
    colorId: "",
    colorName: "",
    colorCode: "#",
  });
  const [newColorError, setNewColorError] = useState<string | null>(null);

  const currentColorIds = new Set(currentColors.map((c) => c.colorId));
  const availableToAdd = allColors.filter(
    (c) => !currentColorIds.has(c.colorId),
  );

  const selectedColor = availableToAdd.find(
    (c) => c.colorId === selectedColorId,
  );

  const handleAdd = () => {
    if (!selectedColorId) return;
    startTransition(async () => {
      const result = await addColorToProductAction(productId, selectedColorId);
      if (result.success) {
        toast.success("Farbe hinzugefügt.");
        setSelectedColorId("");
        setOpen(false);
      } else {
        toast.error(result.error ?? "Fehler beim Hinzufügen der Farbe.");
      }
    });
  };

  const handleRemove = (colorId: string, colorName: string) => {
    startTransition(async () => {
      const result = await removeColorFromProductAction(productId, colorId);
      if (result.success) {
        toast.success(`Farbe „${colorName}" entfernt.`);
      } else {
        toast.error(result.error ?? "Fehler beim Entfernen.");
      }
    });
  };

  /** Creates a brand-new color in the DB and immediately assigns it to this product. */
  const handleCreateAndAdd = () => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("colorId", newColorFormData.colorId);
      fd.set("name", newColorFormData.colorName);
      fd.set("code", newColorFormData.colorCode);

      const createResult = await addColor({ success: false, errors: {} }, fd);
      if (!createResult.success) {
        setNewColorError(
          createResult.globalError ?? "Farbe konnte nicht angelegt werden.",
        );
        return;
      }

      const addResult = await addColorToProductAction(
        productId,
        newColorFormData.colorId,
      );
      if (!addResult.success) {
        setNewColorError(
          addResult.error ?? "Farbe konnte nicht zugewiesen werden.",
        );
        return;
      }

      toast.success(
        `Farbe „${newColorFormData.colorName}" angelegt und zugeordnet.`,
      );
      setShowNewColorForm(false);
      setNewColorFormData({ colorId: "", colorName: "", colorCode: "#" });
      setNewColorError(null);
    });
  };

  return (
    <div className="space-y-4">
      {/* Currently assigned colors */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">
          Zugeordnete Farben:
        </p>
        {currentColors.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Keine Farben zugeordnet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentColors.map((color) => (
              <div
                key={color.colorId}
                className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border"
                  style={{ backgroundColor: color.code }}
                />
                {color.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(color.colorId, color.name)}
                  disabled={isPending}
                  aria-label={`Farbe ${color.name} entfernen`}
                  className="btn-remove"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add an existing color – Combobox (search + scrollable dropdown) */}
      {availableToAdd.length > 0 && (
        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
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
                    {availableToAdd.map((color) => (
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
            onClick={handleAdd}
            disabled={!selectedColorId || isPending}
            className="btn"
          >
            Hinzufügen
          </Button>
        </div>
      )}

      {/* Create a brand-new color and assign it */}
      <div>
        {!showNewColorForm ? (
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-sm"
            onClick={() => setShowNewColorForm(true)}
          >
            + Neue Farbe anlegen
          </Button>
        ) : (
          <div className="space-y-2 rounded border p-3 text-sm">
            <p className="font-medium">Neue Farbe anlegen &amp; zuordnen</p>
            {newColorError && (
              <p className="text-destructive text-xs">{newColorError}</p>
            )}
            <Input
              type="text"
              placeholder="Farb-ID (z.B. RAL-9010)"
              value={newColorFormData.colorId}
              onChange={(e) =>
                setNewColorFormData((p) => ({ ...p, colorId: e.target.value }))
              }
            />
            <Input
              type="text"
              placeholder="Farbname"
              value={newColorFormData.colorName}
              onChange={(e) =>
                setNewColorFormData((p) => ({
                  ...p,
                  colorName: e.target.value,
                }))
              }
            />
            <Input
              type="text"
              placeholder="HEX-Code (#FF5733)"
              value={newColorFormData.colorCode}
              onChange={(e) =>
                setNewColorFormData((p) => ({
                  ...p,
                  colorCode: e.target.value,
                }))
              }
            />
            <div className="flex gap-2">
              <Button
                type="button"
                className="btn"
                onClick={handleCreateAndAdd}
                disabled={isPending}
              >
                Anlegen &amp; zuordnen
              </Button>
              <Button
                type="button"
                variant="outline"
                className="btn-secondary"
                onClick={() => {
                  setShowNewColorForm(false);
                  setNewColorError(null);
                }}
              >
                Abbrechen
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
