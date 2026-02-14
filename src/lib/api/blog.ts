import type { Article, PaginatedArticles, Category, Tag, ArticleFilters } from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/** Options de cache pour les données qui changent fréquemment (articles) */
const NO_CACHE: RequestInit = { cache: 'no-store' };

/** Options de cache pour les données statiques (catégories, tags) - 1h */
const STATIC_CACHE: RequestInit = { next: { revalidate: 3600 } } as RequestInit;

/**
 * Effectue un fetch vers l'API publique et retourne `result.data`.
 * Gère uniformément les erreurs HTTP avec un message descriptif.
 */
async function fetchPublic<T>(
  path: string,
  resourceLabel: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Failed to fetch ${resourceLabel} (${response.status})${text ? `: ${text.slice(0, 100)}` : ''}`,
    );
  }

  const result = await response.json();
  return result.data as T;
}

export class BlogAPI {
  static async getArticles(filters?: ArticleFilters): Promise<PaginatedArticles> {
    const params = new URLSearchParams();

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      }
    }

    const query = params.toString();
    const path = `/articles${query ? `?${query}` : ''}`;
    return fetchPublic<PaginatedArticles>(path, 'articles', NO_CACHE);
  }

  static async getArticleBySlug(slug: string): Promise<Article> {
    return fetchPublic<Article>(`/articles/slug/${slug}`, 'article', NO_CACHE);
  }

  static async getArticleById(id: string): Promise<Article> {
    return fetchPublic<Article>(`/articles/${id}`, 'article', NO_CACHE);
  }

  static async getCategories(): Promise<Category[]> {
    return fetchPublic<Category[]>('/categories', 'categories', STATIC_CACHE);
  }

  static async getCategoryBySlug(slug: string): Promise<Category> {
    return fetchPublic<Category>(`/categories/slug/${slug}`, 'category', STATIC_CACHE);
  }

  static async getTags(): Promise<Tag[]> {
    return fetchPublic<Tag[]>('/tags', 'tags', STATIC_CACHE);
  }

  static async getTagBySlug(slug: string): Promise<Tag> {
    return fetchPublic<Tag>(`/tags/slug/${slug}`, 'tag', STATIC_CACHE);
  }
}
