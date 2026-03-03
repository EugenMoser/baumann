"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  deleteProductAction,
} from "@/features/product/actions/mutations/deleteProduct";

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

/**
 * Client component button to delete a product with confirmation dialog.
 */
export  function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps): React.JSX.Element {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Sind Sie sicher, dass Sie das Produkt "${productName}" (ID: ${productId}) und alle zugehörigen Artikel löschen möchten?`,
    );

    if (!confirmed) return;

    const result = await deleteProductAction(productId);

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
