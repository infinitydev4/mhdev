import type { Article, Category, Tag } from "@/types/blog";
import type { AuthResponse, AuthUser } from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Une erreur est survenue');
  }
  const json = await response.json();
  return json.data as T;
}

export class AdminAPI {
  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || "Identifiants invalides");
    }

    const json = await response.json();
    const payload = (json && (json.data ?? json)) as AuthResponse;
    return payload;
  }

  static async getProfile(token: string): Promise<AuthUser> {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || 'Profil introuvable');
    }

    const json = await response.json();
    return (json.data ?? json) as AuthUser;
  }

  static async getCategories(token: string): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Category[]>(response);
  }

  static async getTags(token: string): Promise<Tag[]> {
    const response = await fetch(`${API_URL}/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse<Tag[]>(response);
  }

  static async createArticle(
    token: string,
    payload: {
      title: string;
      content: string;
      excerpt?: string;
      coverImage?: string;
      status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
      categoryId?: string;
      tagIds?: string[];
      metaTitle?: string;
      metaDescription?: string;
      metaKeywords?: string[];
    },
  ): Promise<Article> {
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<Article>(response);
  }

  static async createCategory(
    token: string,
    payload: {
      name: string;
      slug: string;
      description?: string;
      color?: string;
      icon?: string;
    },
  ): Promise<Category> {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<Category>(response);
  }

  static async createTag(
    token: string,
    payload: {
      name: string;
      slug: string;
      color?: string;
    },
  ): Promise<Tag> {
    const response = await fetch(`${API_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<Tag>(response);
  }

  static async updateArticle(
    token: string,
    id: string,
    payload: Partial<{
      title: string;
      content: string;
      excerpt?: string;
      coverImage?: string;
      status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
      categoryId?: string | null;
      tagIds?: string[];
      metaTitle?: string | null;
      metaDescription?: string | null;
      metaKeywords?: string[];
    }>,
  ): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<Article>(response);
  }

  static async getPresignedUploadUrl(
    token: string,
    folder: 'article-covers' | 'avatars' | 'categories',
    contentType: string,
  ): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
    const response = await fetch(`${API_URL}/upload/presign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ folder, contentType }),
    });
    return handleResponse(response);
  }

  static async generateCoverImage(
    token: string,
    payload: { title: string; excerpt?: string },
  ): Promise<{ coverImage: string }> {
    const response = await fetch(`${API_URL}/ai/generate-cover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  }

  static async generateArticleAI(
    token: string,
    payload: {
      title?: string;
      topic?: string;
      tone?: string;
      language?: string;
      generateCoverImage?: boolean;
    },
  ): Promise<{
    title: string;
    content: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
    suggestedTags: string[];
    metaKeywords: string[];
    coverImage?: string;
  }> {
    const response = await fetch(`${API_URL}/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  }

  static async deleteArticle(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || "Impossible de supprimer l'article");
    }
  }
}

