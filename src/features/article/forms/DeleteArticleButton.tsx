"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteArticle } from "@/features/article/actions/mutations/deleteArticle";

interface DeleteArticleButtonProps {
  articleId: string;
  articleName: string;
  articleCount: number;
}

/**
 * Client component button to delete an article with confirmation and minimum-check.
 */
export function DeleteArticleButton({
  articleId,
  articleName,
  articleCount,
}: DeleteArticleButtonProps): React.JSX.Element {
  const router = useRouter();

  async function handleDelete() {
    if (articleCount <= 1) {
      toast.error(
        "Das Produkt muss mindestens einen Artikel haben. Löschen nicht möglich.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Sind Sie sicher, dass Sie den Artikel "${articleName}" löschen möchten?`,
    );

    if (!confirmed) return;

    const result = await deleteArticle(articleId);

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
      disabled={articleCount <= 1}
      className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      title={
        articleCount <= 1
          ? "Letzter Artikel kann nicht gelöscht werden"
          : "Artikel löschen"
      }
    >
      Löschen
    </button>
  );
}
