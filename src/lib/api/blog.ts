import type { Article, PaginatedArticles, Category, Tag, ArticleFilters } from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export class BlogAPI {
  // Articles
  static async getArticles(filters?: ArticleFilters): Promise<PaginatedArticles> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const url = `${API_URL}/articles${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const result = await response.json();
    return result.data;
  }

  static async getArticleBySlug(slug: string): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const result = await response.json();
    return result.data;
  }

  static async getArticleById(id: string): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const result = await response.json();
    return result.data;
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const result = await response.json();
    return result.data;
  }

  static async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await fetch(`${API_URL}/categories/slug/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }

    const result = await response.json();
    return result.data;
  }

  // Tags
  static async getTags(): Promise<Tag[]> {
    const response = await fetch(`${API_URL}/tags`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    const result = await response.json();
    return result.data;
  }

  static async getTagBySlug(slug: string): Promise<Tag> {
    const response = await fetch(`${API_URL}/tags/slug/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tag');
    }

    const result = await response.json();
    return result.data;
  }
}
