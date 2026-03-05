"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteColor } from "@/features/color/actions/mutations/deleteColor";

interface DeleteColorButtonProps {
  colorId: string;
  colorName: string;
}

/**
 * Client component button to delete a color with a confirmation dialog.
 */
export function DeleteColorButton({
  colorId,
  colorName,
}: DeleteColorButtonProps): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    const result = await deleteColor(colorId);
    setIsDeleting(false);
    setOpen(false);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.globalError || "Fehler beim Löschen.");
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="btn-destructive">
        Löschen
      </Button>
      <ConfirmDialog
        open={open}
        title="Farbe löschen"
        description={`Sind Sie sicher, dass Sie die Farbe "${colorName}" löschen möchten?`}
        confirmLabel="Löschen"
        isPending={isDeleting}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
