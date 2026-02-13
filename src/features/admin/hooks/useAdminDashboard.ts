"use client";

import { useEffect, useState, useCallback } from "react";
import type { Article, Category, Tag } from "@/types/blog";
import { ArticleStatus } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";

export interface DashboardStats {
  totalArticles: number;
  published: number;
  drafts: number;
  archived: number;
  totalViews: number;
  categoriesCount: number;
  tagsCount: number;
  topArticlesByViews: Article[];
  recentArticles: Article[];
}

interface UseAdminDashboardResult {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const EMPTY_STATS: DashboardStats = {
  totalArticles: 0,
  published: 0,
  drafts: 0,
  archived: 0,
  totalViews: 0,
  categoriesCount: 0,
  tagsCount: 0,
  topArticlesByViews: [],
  recentArticles: [],
};

export function useAdminDashboard(enabled: boolean): UseAdminDashboardResult {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);
    try {
      const [articlesRes, categories, tags] = await Promise.all([
        BlogAPI.getArticles({
          limit: 200,
          sortBy: "createdAt",
          order: "DESC",
          light: true,
        }),
        BlogAPI.getCategories(),
        BlogAPI.getTags(),
      ]);

      const articles = articlesRes.data ?? [];
      const total = articlesRes.meta?.total ?? articles.length;
      const published = articles.filter((a) => a.status === ArticleStatus.PUBLISHED).length;
      const drafts = articles.filter((a) => a.status === ArticleStatus.DRAFT).length;
      const archived = articles.filter((a) => a.status === ArticleStatus.ARCHIVED).length;
      const totalViews = articles.reduce((sum, a) => sum + (a.views ?? 0), 0);

      const topByViews = [...articles]
        .filter((a) => a.status === ArticleStatus.PUBLISHED)
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        .slice(0, 5);

      const recent = [...articles].slice(0, 5);

      setStats({
        totalArticles: total,
        published,
        drafts,
        archived,
        totalViews,
        categoriesCount: categories?.length ?? 0,
        tagsCount: tags?.length ?? 0,
        topArticlesByViews: topByViews,
        recentArticles: recent,
      });
    } catch (err) {
      setStats(EMPTY_STATS);
      setError(
        err instanceof Error ? err.message : "Impossible de charger les statistiques."
      );
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    void fetchStats();
  }, [enabled, fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
