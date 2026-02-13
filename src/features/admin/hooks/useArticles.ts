"use client";

import { useEffect, useState, useCallback } from "react";
import type { Article } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";

interface UseArticlesResult {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateArticleInList: (id: string, updates: Partial<Article>) => void;
  removeArticleFromList: (id: string) => void;
}

const DEFAULT_LIMIT = 20;

/**
 * Hook pour charger et gérer la liste des articles en admin.
 * Centralise la logique de fetch et les mises à jour optimistes.
 */
export function useArticles(authPresent: boolean): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    if (!authPresent) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await BlogAPI.getArticles({
        limit: DEFAULT_LIMIT,
        sortBy: "createdAt",
        order: "DESC",
        light: true,
      });
      setArticles(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible de charger les articles."
      );
    } finally {
      setIsLoading(false);
    }
  }, [authPresent]);

  useEffect(() => {
    if (!authPresent) return;
    void fetchArticles();
  }, [authPresent, fetchArticles]);

  const updateArticleInList = useCallback((id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  }, []);

  const removeArticleFromList = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return {
    articles,
    isLoading,
    error,
    refetch: fetchArticles,
    updateArticleInList,
    removeArticleFromList,
  };
}
