"use client";

import { useState, useTransition } from "react";

import { log } from "console";
import { toast } from "sonner";

import { addColor } from "@/features/color/actions/mutations/addColor";
import { ColorProps } from "@/features/color/types";
import { addColorToProductAction } from "@/features/product/actions/mutations/addColorToProduct";
import { removeColorFromProductAction } from "@/features/product/actions/mutations/removeColorFromProduct";
import { Color } from "@prisma/client";

interface ProductColorManagementProps {
  productId: number;
  currentColors: ColorProps[];
  allColors: Color[];
}

/**
 * Client component for managing color connections on an existing product.
 * Allows adding colors from all available colors and removing existing ones.
 */
export function ProductColorManagement({
  productId,
  currentColors,
  allColors,
}: ProductColorManagementProps): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [selectedColorId, setSelectedColorId] = useState("");

  // State for creating a brand-new color and assigning it
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

  const handleAdd = () => {
    if (!selectedColorId) return;
    startTransition(async () => {
      const result = await addColorToProductAction(productId, selectedColorId);
      if (result.success) {
        toast.success("Farbe hinzugefügt.");
        setSelectedColorId("");
      } else {
        toast.error(result.error ?? "Fehler beim Hinzufügen.");
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

      console.log("----->>>>> create color result", createResult);
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
      {/* Current colors */}
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
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: color.code }}
                />
                {color.name}
                <button
                  type="button"
                  onClick={() => handleRemove(color.colorId, color.name)}
                  disabled={isPending}
                  className="text-destructive hover:text-destructive-foreground ml-1 disabled:opacity-50"
                  aria-label={`Farbe ${color.name} entfernen`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add a color */}
      {availableToAdd.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={selectedColorId}
            onChange={(e) => setSelectedColorId(e.target.value)}
            className="rounded border px-3 py-2 text-sm"
          >
            <option value="">Farbe auswählen...</option>
            {availableToAdd.map((color) => (
              <option key={color.colorId} value={color.colorId}>
                {color.name} — {color.code}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedColorId || isPending}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Hinzufügen
          </button>
        </div>
      )}

      {/* Create a brand-new color and assign it */}
      <div>
        {!showNewColorForm ? (
          <button
            type="button"
            onClick={() => setShowNewColorForm(true)}
            className="text-accent hover:text-accent-foreground text-sm underline"
          >
            + Neue Farbe anlegen
          </button>
        ) : (
          <div className="space-y-2 rounded border p-3 text-sm">
            <p className="font-medium">Neue Farbe anlegen &amp; zuordnen</p>
            {newColorError && (
              <p className="text-destructive text-xs">{newColorError}</p>
            )}
            <input
              type="text"
              placeholder="Farb-ID (z.B. RAL-9010)"
              value={newColorFormData.colorId}
              onChange={(e) =>
                setNewColorFormData((p) => ({ ...p, colorId: e.target.value }))
              }
              className="w-full rounded border px-2 py-1"
            />
            <input
              type="text"
              placeholder="Farbname"
              value={newColorFormData.colorName}
              onChange={(e) =>
                setNewColorFormData((p) => ({
                  ...p,
                  colorName: e.target.value,
                }))
              }
              className="w-full rounded border px-2 py-1"
            />
            <input
              type="text"
              placeholder="HEX-Code (#FF5733)"
              value={newColorFormData.colorCode}
              onChange={(e) =>
                setNewColorFormData((p) => ({
                  ...p,
                  colorCode: e.target.value,
                }))
              }
              className="w-full rounded border px-2 py-1"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCreateAndAdd}
                disabled={isPending}
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Anlegen &amp; zuordnen
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewColorForm(false);
                  setNewColorError(null);
                }}
                className="rounded border px-3 py-1 hover:bg-gray-100"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
