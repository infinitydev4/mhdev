"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArticleStatus } from "@/types/blog";
import { AdminAPI } from "@/lib/api/admin";
import { AdminMarkdownEditor } from "@/components/admin/AdminMarkdownEditor";
import { useTaxonomies } from "@/features/admin/hooks/useTaxonomies";
import { AdminFormField } from "@/features/admin/components/AdminFormField";
import { AdminFormInput } from "@/features/admin/components/AdminFormInput";
import { AdminFormTextarea } from "@/features/admin/components/AdminFormTextarea";
import { AdminAIGenerateForm } from "@/features/admin/components/AdminAIGenerateForm";
import { AdminCoverImageField } from "@/features/admin/components/AdminCoverImageField";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { validateArticleForm } from "@/features/admin/lib/validators";
import { extractApiError } from "@/features/admin/lib/api-client";
import type { GeneratedArticle } from "@/features/admin/hooks/useAIGeneration";

interface AdminArticleFormProps {
  token: string;
}

const STATUS_OPTIONS: { value: ArticleStatus; label: string }[] = [
  { value: ArticleStatus.DRAFT, label: "Brouillon" },
  { value: ArticleStatus.PUBLISHED, label: "Publié" },
  { value: ArticleStatus.ARCHIVED, label: "Archivé" },
] as const;

export function AdminArticleForm({ token }: AdminArticleFormProps) {
  const { categories, tags, error: taxonomyError } = useTaxonomies(token);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<ArticleStatus>(ArticleStatus.DRAFT);
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const remainingMetaDescription = useMemo(
    () => 160 - metaDescription.length,
    [metaDescription],
  );

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleApplyGenerated = useCallback(
    (data: GeneratedArticle) => {
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || "");
      setCoverImage(data.coverImage || "");
      setMetaTitle(data.metaTitle || "");
      setMetaDescription(data.metaDescription || "");
      setMetaKeywords(
        (data.metaKeywords?.length ? data.metaKeywords : data.suggestedTags || []).join(", ")
      );
      if (data.suggestedTags?.length && tags.length) {
        const ids = data.suggestedTags
          .map((name) => tags.find((t) => t.name.toLowerCase() === name.toLowerCase())?.id)
          .filter(Boolean) as string[];
        setSelectedTagIds((prev) => [...new Set([...prev, ...ids])]);
      }
    },
    [tags]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validation = validateArticleForm({
      title,
      content,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
    });
    if (!validation.valid) {
      setError(validation.message ?? "Validation échouée.");
      return;
    }

    setIsSubmitting(true);
    try {
      await AdminAPI.createArticle(token, {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        status,
        categoryId: categoryId || undefined,
        tagIds: selectedTagIds.length ? selectedTagIds : undefined,
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
        metaKeywords: metaKeywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      });

      setSuccess("Article créé avec succès.");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setStatus(ArticleStatus.DRAFT);
      setCategoryId(undefined);
      setSelectedTagIds([]);
      setMetaTitle("");
      setMetaDescription("");
      setMetaKeywords("");
    } catch (err: unknown) {
      setError(extractApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-black/70 p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-archivo text-xl md:text-2xl tracking-wide">
            Nouvel article
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Rédige un article optimisé SEO, prêt à être publié sur ton blog.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#C1FF00]/40 bg-[#C1FF00]/10 px-3 py-1 text-[#C1FF00]">
            ● Live preview
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#8364FF]/40 bg-[#8364FF]/10 px-3 py-1 text-[#8364FF]">
            SEO ready
          </span>
        </div>
      </div>

      <AdminAIGenerateForm
        token={token}
        onApply={handleApplyGenerated}
        collapsed={true}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {taxonomyError && (
          <AdminAlert message={taxonomyError} className="mb-4" />
        )}

        {/* Ligne titre + statut */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <AdminFormField label="Titre de l'article">
            <AdminFormInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : 7 bonnes pratiques pour scaler une application Rails + React"
            />
          </AdminFormField>
          <AdminFormField label="Statut">
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                    status === option.value
                      ? "border-[#C1FF00] bg-[#C1FF00]/10 text-[#C1FF00]"
                      : "border-white/10 bg-black/40 text-white/60 hover:border-white/30 hover:bg-black/60"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </AdminFormField>
        </div>

        {/* Ligne résumé + cover */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-white/60 mb-1.5">
              Résumé (excerpt)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
              placeholder="Phrase d’accroche courte pour les cartes et le SEO."
            />
          </div>
          <div>
            <AdminCoverImageField
              token={token}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              title={title}
              excerpt={excerpt}
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-white/60 mb-1.5">
            Contenu (Markdown)
          </label>
          <AdminMarkdownEditor value={content} onChange={setContent} />
          <p className="mt-1 text-[11px] text-white/50">
            Utilise la barre d’outils pour structurer ton article (titres, listes, blocs de code…).
          </p>
        </div>

        {/* Catégories / Tags */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-white/60 mb-1.5">
              Catégorie
            </label>
            <select
              value={categoryId || ""}
              onChange={(e) =>
                setCategoryId(e.target.value ? e.target.value : undefined)
              }
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
            >
              <option value="">Aucune catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-white/60 mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto rounded-xl border border-white/10 bg-black/50 px-2 py-2">
              {tags.map((tag) => {
                const isActive = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      isActive
                        ? "border-[#FF8656] bg-[#FF8656]/20 text-[#FF8656]"
                        : "border-white/15 bg-black/40 text-white/60 hover:border-[#FF8656]/60 hover:text-white"
                    }`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
              {tags.length === 0 && (
                <p className="text-[11px] text-white/40">
                  Aucun tag configuré pour l’instant.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="grid gap-4 md:grid-cols-2">
          <AdminFormField
            label="Meta title"
            hint="60 caractères max pour Google."
          >
            <AdminFormInput
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Titre optimisé pour Google (60 caractères max)."
              maxLength={60}
            />
          </AdminFormField>
          <AdminFormField
            label="Meta description"
            hint={`${remainingMetaDescription} caractères restants (160 max).`}
          >
            <AdminFormTextarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              placeholder="Description claire pour les résultats de recherche."
              maxLength={160}
            />
          </AdminFormField>
        </div>

        <AdminFormField
          label="Mots-clés (séparés par des virgules)"
          hint="rails, next.js, optimisation, tdd..."
        >
          <AdminFormInput
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            placeholder="rails, next.js, optimisation, tdd..."
          />
        </AdminFormField>

        {/* Messages */}
        {error && <AdminAlert message={error} className="mb-4" />}
        {success && (
          <AdminAlert message={success} variant="success" className="mb-4" />
        )}

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-white/50">
            Astuce : publie en brouillon d&apos;abord, relis à froid, puis passe en &quot;Publié&quot;.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(193,255,0,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(193,255,0,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer l’article"}
            </button>
          </div>
        </div>
      </form>
    </motion.section>
  );
}

