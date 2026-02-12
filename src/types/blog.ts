export enum Role {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  articlesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  articlesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ArticleStatus;
  publishedAt?: string;
  views: number;
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords: string[];
  author: User;
  authorId: string;
  category?: Category;
  categoryId?: string;
  tags: { tag: Tag }[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedArticles {
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ArticleFilters {
  search?: string;
  status?: ArticleStatus | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  categoryId?: string;
  tag?: string;
  authorId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}
