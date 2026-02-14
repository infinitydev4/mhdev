import type { Article, Category, Tag } from "@/types/blog";
import type { AuthResponse, AuthUser } from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// ─── Helpers ──────────────────────────────────────────────────

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Une erreur est survenue");
  }
  const json = await response.json();
  return json.data as T;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

function jsonAuthHeaders(token: string): HeadersInit {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

/** GET authentifié vers l'API, retourne `response.data` */
async function authGet<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: authHeaders(token),
  });
  return handleResponse<T>(response);
}

/** POST authentifié vers l'API, retourne `response.data` */
async function authPost<T>(path: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: jsonAuthHeaders(token),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

// ─── Types ────────────────────────────────────────────────────

type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface CreateArticlePayload {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ArticleStatus;
  categoryId?: string;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface UpdateArticlePayload {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  status?: ArticleStatus;
  categoryId?: string | null;
  tagIds?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[];
}

interface GeneratedArticleResult {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  suggestedTags: string[];
  metaKeywords: string[];
  coverImage?: string;
}

// ─── API Client ───────────────────────────────────────────────

export class AdminAPI {
  // Auth
  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || "Identifiants invalides");
    }

    const json = await response.json();
    return (json?.data ?? json) as AuthResponse;
  }

  static async getProfile(token: string): Promise<AuthUser> {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: authHeaders(token),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || "Profil introuvable");
    }

    const json = await response.json();
    return (json.data ?? json) as AuthUser;
  }

  // CRUD Articles
  static async getArticleById(token: string, id: string): Promise<Article> {
    return authGet<Article>(`/articles/${id}`, token);
  }

  static async createArticle(token: string, payload: CreateArticlePayload): Promise<Article> {
    return authPost<Article>("/articles", token, payload);
  }

  static async updateArticle(token: string, id: string, payload: UpdateArticlePayload): Promise<Article> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "PATCH",
      headers: jsonAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse<Article>(response);
  }

  static async deleteArticle(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || "Impossible de supprimer l'article");
    }
  }

  // Taxonomies
  static async getCategories(token: string): Promise<Category[]> {
    return authGet<Category[]>("/categories", token);
  }

  static async getTags(token: string): Promise<Tag[]> {
    return authGet<Tag[]>("/tags", token);
  }

  static async createCategory(
    token: string,
    payload: { name: string; slug: string; description?: string; color?: string; icon?: string },
  ): Promise<Category> {
    return authPost<Category>("/categories", token, payload);
  }

  static async createTag(
    token: string,
    payload: { name: string; slug: string; color?: string },
  ): Promise<Tag> {
    return authPost<Tag>("/tags", token, payload);
  }

  // Upload
  static async getPresignedUploadUrl(
    token: string,
    folder: "article-covers" | "avatars" | "categories",
    contentType: string,
  ): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
    return authPost("/upload/presign", token, { folder, contentType });
  }

  // AI
  static async generateCoverImage(
    token: string,
    payload: { title: string; excerpt?: string },
  ): Promise<{ coverImage: string }> {
    return authPost("/ai/generate-cover", token, payload);
  }

  static async suggestArticleIdeas(
    token: string,
    payload: { keywords: string; language?: string },
  ): Promise<{ suggestions: string[] }> {
    return authPost("/ai/suggest-ideas", token, payload);
  }

  static async generateArticleAI(
    token: string,
    payload: { title?: string; topic?: string; tone?: string; language?: string; generateCoverImage?: boolean },
  ): Promise<GeneratedArticleResult> {
    return authPost("/ai/generate", token, payload);
  }
}

