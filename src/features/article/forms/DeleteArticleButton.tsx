"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { deleteArticle } from "@/features/article/actions/mutations/deleteArticle";

interface DeleteArticleButtonProps {
  articleId: string;
  articleName: string;
  articleCount: number;
}

/**
 * Client component button to delete an article with confirmation dialog and minimum-check.
 */
export function DeleteArticleButton({
  articleId,
  articleName,
  articleCount,
}: DeleteArticleButtonProps): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleButtonClick() {
    if (articleCount <= 1) {
      toast.error(
        "Das Produkt muss mindestens einen Artikel haben. Löschen nicht möglich.",
      );
      return;
    }
    setOpen(true);
  }

  async function handleConfirm() {
    setIsDeleting(true);
    const result = await deleteArticle(articleId);
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
      <Button
        onClick={handleButtonClick}
        disabled={articleCount <= 1}
        className="btn-destructive disabled:cursor-not-allowed disabled:opacity-50"
        title={
          articleCount <= 1
            ? "Letzter Artikel kann nicht gelöscht werden"
            : "Artikel löschen"
        }
      >
        Löschen
      </Button>
      <ConfirmDialog
        open={open}
        title="Artikel löschen"
        description={`Sind Sie sicher, dass Sie den Artikel "${articleName}" löschen möchten?`}
        confirmLabel="Löschen"
        isPending={isDeleting}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
