/**
 * Énumération des statuts d'article
 */
export enum ArticleStatus {
  /**
   * Brouillon - Article en cours de rédaction, non visible publiquement
   */
  DRAFT = 'draft',

  /**
   * Publié - Article visible publiquement
   */
  PUBLISHED = 'published',

  /**
   * Archivé - Article retiré de la publication mais conservé
   */
  ARCHIVED = 'archived',
}

/**
 * Statuts visibles publiquement
 */
export const PUBLIC_STATUSES = [ArticleStatus.PUBLISHED];

/**
 * Vérifie si un statut est public
 */
export function isPublicStatus(status: ArticleStatus): boolean {
  return PUBLIC_STATUSES.includes(status);
}
