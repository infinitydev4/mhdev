"use client";

import { useState, useCallback } from "react";

export interface GeneratedArticle {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  suggestedTags: string[];
  metaKeywords: string[];
  coverImage?: string;
}

export interface UseAIGenerationOptions {
  token: string;
  onSuccess?: (data: GeneratedArticle) => void;
}

export function useAIGeneration({ token, onSuccess }: UseAIGenerationOptions) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (params: {
      title?: string;
      topic?: string;
      tone?: string;
      language?: string;
      generateCoverImage?: boolean;
    }) => {
      if (!params.title && !params.topic) {
        setError("Indiquez un titre ou un sujet.");
        return null;
      }

      setError(null);
      setIsGenerating(true);

      try {
        const { AdminAPI } = await import("@/lib/api/admin");
        const data = await AdminAPI.generateArticleAI(token, params);
        onSuccess?.(data);
        return data;
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "La génération a échoué.";
        setError(msg);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [token, onSuccess]
  );

  return { generate, isGenerating, error };
}
