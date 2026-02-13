"use client";

import { useEffect, useState, useCallback } from "react";
import type { Category, Tag } from "@/types/blog";
import { AdminAPI } from "@/lib/api/admin";

interface UseTaxonomiesResult {
  categories: Category[];
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook centralisé pour charger catégories et tags.
 * Évite les requêtes dupliquées entre AdminArticleForm, AdminArticleEditPage et AdminCategoriesPage.
 */
export function useTaxonomies(token: string | undefined): UseTaxonomiesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTaxonomies = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);
    try {
      const [cats, tgs] = await Promise.all([
        AdminAPI.getCategories(token),
        AdminAPI.getTags(token),
      ]);
      setCategories(cats);
      setTags(tgs);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible de charger les catégories et tags."
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    void fetchTaxonomies();
  }, [token, fetchTaxonomies]);

  return { categories, tags, isLoading, error, refetch: fetchTaxonomies };
}
