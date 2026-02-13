"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Article } from "@/types/blog";
import { ArticleStatus } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";
import { AdminAPI } from "@/lib/api/admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminMarkdownEditor } from "@/components/admin/AdminMarkdownEditor";
import { useTaxonomies } from "@/features/admin/hooks/useTaxonomies";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { AdminAuthGate } from "@/features/admin/ui/AdminAuthGate";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { TagSelector } from "@/features/admin/components/TagSelector";
import { AdminFormField } from "@/features/admin/components/AdminFormField";
import { AdminFormInput } from "@/features/admin/components/AdminFormInput";
import { AdminFormTextarea } from "@/features/admin/components/AdminFormTextarea";
import { AdminCoverImageField } from "@/features/admin/components/AdminCoverImageField";
import { validateArticleForm } from "@/features/admin/lib/validators";
import { extractApiError } from "@/features/admin/lib/api-client";

export default function AdminArticleEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { auth, isReady } = useAdminAuth();
  const safeToken = auth?.accessToken ?? "";
  const { categories, tags } = useTaxonomies(safeToken);

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<ArticleStatus>(ArticleStatus.DRAFT);
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setTitle(data.title);
          setExcerpt(data.excerpt || "");
          setContent(data.content);
          setCoverImage(data.coverImage || "");
          setStatus(data.status);
          setCategoryId(data.categoryId);
          setSelectedTagIds(data.tags.map(({ tag }) => tag.id));
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

  const toggleTag = useCallback((id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!safeToken || !params?.id) {
      setError("Session expirée, reconnecte-toi.");
      return;
    }

    const validation = validateArticleForm({ title, content });
    if (!validation.valid) {
      setError(validation.message ?? "Validation échouée.");
      return;
    }

    setIsSubmitting(true);
    try {
      await AdminAPI.updateArticle(safeToken, params.id, {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        status,
        categoryId: categoryId || null,
        tagIds: selectedTagIds,
      });
      setSuccess("Article mis à jour avec succès.");
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <section className="rounded-3xl border border-white/10 bg-black/70 p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        {isLoading && (
          <p className="text-sm text-white/60">Chargement de l&apos;article…</p>
        )}
        {error && <AdminAlert message={error} className="mb-4" />}
        {success && (
          <AdminAlert message={success} variant="success" className="mb-4" />
        )}

        {article && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <AdminFormField label="Titre">
                <AdminFormInput
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </AdminFormField>
              <AdminFormField label="Statut">
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ArticleStatus)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
                >
                  <option value={ArticleStatus.DRAFT}>Brouillon</option>
                  <option value={ArticleStatus.PUBLISHED}>Publié</option>
                  <option value={ArticleStatus.ARCHIVED}>Archivé</option>
                </select>
              </AdminFormField>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <AdminFormField label="Résumé">
                <AdminFormTextarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
              </AdminFormField>
              <div>
                <AdminCoverImageField
                  token={safeToken}
                  coverImage={coverImage}
                  setCoverImage={setCoverImage}
                  title={title}
                  excerpt={excerpt}
                />
              </div>
            </div>

            <AdminFormField label="Contenu (Markdown)">
              <AdminMarkdownEditor value={content} onChange={setContent} />
            </AdminFormField>

            <div className="grid gap-4 md:grid-cols-2">
              <AdminFormField label="Catégorie">
                <select
                  value={categoryId || ""}
                  onChange={(e) =>
                    setCategoryId(e.target.value ? e.target.value : undefined)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
                >
                  <option value="">Aucune</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </AdminFormField>
              <AdminFormField label="Tags">
                <TagSelector
                  tags={tags}
                  selectedIds={selectedTagIds}
                  onToggle={toggleTag}
                />
              </AdminFormField>
            </div>

            <div className="flex justify-end gap-2 border-t border-white/10 pt-2">
              <button
                type="button"
                onClick={() => router.push("/admin/articles")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(193,255,0,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(193,255,0,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Enregistrement..." : "Mettre à jour l'article"}
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
