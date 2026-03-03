"use client";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { Color } from "@prisma/client";

import { addColorToProductAction } from "@/features/product/actions/mutations/addColorToProduct";
import { removeColorFromProductAction } from "@/features/product/actions/mutations/removeColorFromProduct";
import { ColorProps } from "@/features/color/types";

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

  const currentColorIds = new Set(currentColors.map((c) => c.colorId));
  const availableToAdd = allColors.filter((c) => !currentColorIds.has(c.colorId));

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

  return (
    <div className="space-y-4">
      {/* Current colors */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">
          Zugeordnete Farben:
        </p>
        {currentColors.length === 0 ? (
          <p className="text-muted-foreground text-sm">Keine Farben zugeordnet.</p>
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
                  className="ml-1 text-red-500 hover:text-red-700 disabled:opacity-50"
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
    </div>
  );
}
