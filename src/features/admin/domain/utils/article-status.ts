import { ArticleStatus } from "@/types/blog";

const STATUS_LABELS: Record<ArticleStatus, string> = {
  [ArticleStatus.DRAFT]: "Brouillon",
  [ArticleStatus.PUBLISHED]: "Publié",
  [ArticleStatus.ARCHIVED]: "Archivé",
};

const STATUS_CLASSES: Record<ArticleStatus, string> = {
  [ArticleStatus.PUBLISHED]: "bg-[#C1FF00]/15 text-[#C1FF00] hover:bg-[#C1FF00]/25",
  [ArticleStatus.DRAFT]: "bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20",
  [ArticleStatus.ARCHIVED]: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
};

export function getArticleStatusLabel(status: ArticleStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getArticleStatusClass(status: ArticleStatus): string {
  return STATUS_CLASSES[status] ?? "";
}

/**
 * Cycle DRAFT → PUBLISHED → ARCHIVED → DRAFT
 */
export function getNextArticleStatus(current: ArticleStatus): ArticleStatus {
  if (current === ArticleStatus.DRAFT) return ArticleStatus.PUBLISHED;
  if (current === ArticleStatus.PUBLISHED) return ArticleStatus.ARCHIVED;
  return ArticleStatus.DRAFT;
}
