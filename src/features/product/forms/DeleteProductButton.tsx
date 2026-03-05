"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/features/product/actions/mutations/deleteProduct";

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

/**
 * Client component button to delete a product with a confirmation dialog.
 */
export function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    const result = await deleteProductAction(productId);
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
        title="Produkt löschen"
        description={`Sind Sie sicher, dass Sie das Produkt "${productName}" (ID: ${productId}) und alle zugehörigen Artikel löschen möchten?`}
        confirmLabel="Löschen"
        isPending={isDeleting}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
