"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ColorPicker } from "@/features/color/components/ColorPicker";
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
 * Color management section for an existing product.
 *
 * Wraps ColorPicker and translates its callbacks into server actions,
 * refreshing the page after every mutation so the server component re-fetches
 * the latest data.
 */
export function ProductColorManagement({
  productId,
  currentColors,
  allColors,
}: ProductColorManagementProps): React.JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentColorIds = new Set(currentColors.map((c) => c.colorId));
  const availableColors = allColors.filter(
    (c) => !currentColorIds.has(c.colorId),
  );

  const handleAdd = (colorId: string) => {
    startTransition(async () => {
      const result = await addColorToProductAction(productId, colorId);
      if (result.success) {
        toast.success("Farbe hinzugefügt.");
        router.refresh();
      } else {
        toast.error(result.error ?? "Fehler beim Hinzufügen der Farbe.");
      }
    });
  };

  const handleRemove = (colorId: string) => {
    const colorName = currentColors.find((c) => c.colorId === colorId)?.name;
    startTransition(async () => {
      const result = await removeColorFromProductAction(productId, colorId);
      if (result.success) {
        toast.success(`Farbe „${colorName}“ entfernt.`);
        router.refresh();
      } else {
        toast.error(result.error ?? "Fehler beim Entfernen.");
      }
    });
  };

  /**
   * ColorPicker has already persisted the new color to the DB.
   * Here we only need to assign it to this product.
   */
  const handleNewColorCreated = (newColor: ColorProps) => {
    startTransition(async () => {
      const result = await addColorToProductAction(productId, newColor.colorId);
      if (result.success) {
        toast.success(`Farbe „${newColor.name}“ angelegt und zugeordnet.`);
        router.refresh();
      } else {
        toast.error(result.error ?? "Farbe konnte nicht zugewiesen werden.");
      }
    });
  };

  return (
    <ColorPicker
      currentColors={currentColors}
      availableColors={availableColors}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onNewColorCreated={handleNewColorCreated}
      isPending={isPending}
    />
  );
}
