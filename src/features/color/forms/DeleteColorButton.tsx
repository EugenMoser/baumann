"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteColor } from "@/features/color/actions/mutations/deleteColor";

interface DeleteColorButtonProps {
  colorId: string;
  colorName: string;
}

/**
 * Client component button to delete a color with confirmation.
 */
export function DeleteColorButton({
  colorId,
  colorName,
}: DeleteColorButtonProps): React.JSX.Element {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Sind Sie sicher, dass Sie die Farbe "${colorName}" löschen möchten?`,
    );

    if (!confirmed) return;

    const result = await deleteColor(colorId);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.globalError || "Fehler beim Löschen.");
    }
  }

  return (
    <Button onClick={handleDelete} className="btn-destructive">
      Löschen
    </Button>
  );
}
