"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Article } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { AdminAuthGate } from "@/features/admin/ui/AdminAuthGate";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { extractApiError } from "@/features/admin/lib/api-client";

export default function AdminArticleEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { auth, isReady } = useAdminAuth();
  const safeToken = auth?.accessToken ?? "";

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !params?.id) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await BlogAPI.getArticleById(params.id);
        if (!cancelled) {
          setArticle(data);
        }
      } catch (err) {
        if (!cancelled) setError(extractApiError(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [auth, params?.id]);

  if (!isReady) return <AdminLoadingState />;
  if (!auth) return <AdminAuthGate />;

  return (
    <>
      <AdminPageHeader
        title="Éditer l'article"
        description="Modifie le contenu et les méta-données de ton article."
        backLabel="Retour à la liste"
        onBack={() => router.push("/admin/articles")}
      />

      {isLoading && (
        <p className="text-sm text-white/60">Chargement de l&apos;article…</p>
      )}
      {error && <AdminAlert message={error} className="mb-4" />}

      {article && (
        <AdminArticleForm
          token={safeToken}
          articleId={params?.id}
          initialData={{
            title: article.title,
            excerpt: article.excerpt || "",
            content: article.content,
            coverImage: article.coverImage || "",
            status: article.status,
            categoryId: article.categoryId,
            tagIds: article.tags.map(({ tag }) => tag.id),
            metaTitle: article.metaTitle,
            metaDescription: article.metaDescription,
            metaKeywords: Array.isArray(article.metaKeywords) 
              ? article.metaKeywords.join(", ") 
              : article.metaKeywords || "",
          }}
        />
      )}
    </>
  );
}
