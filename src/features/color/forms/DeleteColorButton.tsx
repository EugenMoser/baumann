"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
    >
      Löschen
    </button>
  );
}
