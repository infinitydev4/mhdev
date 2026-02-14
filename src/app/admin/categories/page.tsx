"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Category, Tag } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";
import { AdminAPI } from "@/lib/api/admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminFormField } from "@/features/admin/components/AdminFormField";
import { AdminFormInput } from "@/features/admin/components/AdminFormInput";
import { AdminFormTextarea } from "@/features/admin/components/AdminFormTextarea";
import { slugify } from "@/features/admin/domain/utils";
import { validateCategoryOrTagName } from "@/features/admin/lib/validators";
import { extractApiError } from "@/features/admin/lib/api-client";

type ActiveTab = "categories" | "tags";

export default function AdminCategoriesPage() {
  const { auth } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("categories");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<ActiveTab>("categories");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);

  const safeToken = auth?.accessToken ?? "";

  const openDrawer = (mode: ActiveTab) => {
    setDrawerMode(mode);
    setName("");
    setSlug("");
    setDescription("");
    setColor("");
    setDrawerError(null);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (!auth) return;
    let cancelled = false;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [cats, tgs] = await Promise.all([
          BlogAPI.getCategories(),
          BlogAPI.getTags(),
        ]);
        if (!cancelled) {
          setCategories(cats);
          setTags(tgs);
        }
      } catch (err) {
        if (!cancelled) setError(extractApiError(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadData();
    return () => {
      cancelled = true;
    };
  }, [auth]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug) setSlug(slugify(value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDrawerError(null);

    if (!safeToken) {
      setDrawerError("Session expirée, reconnecte-toi.");
      return;
    }

    const validation = validateCategoryOrTagName(name);
    if (!validation.valid) {
      setDrawerError(validation.message ?? "Validation échouée.");
      return;
    }

    const finalSlug = slug.trim() || slugify(name);

    setIsSubmitting(true);
    try {
      if (drawerMode === "categories") {
        const created = await AdminAPI.createCategory(safeToken, {
          name: name.trim(),
          slug: finalSlug,
          description: description.trim() || undefined,
          color: color.trim() || undefined,
          icon: undefined,
        });
        setCategories((prev) => [created, ...prev]);
      } else {
        const created = await AdminAPI.createTag(safeToken, {
          name: name.trim(),
          slug: finalSlug,
          color: color.trim() || undefined,
        });
        setTags((prev) => [created, ...prev]);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      setDrawerError(extractApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Catégories & Tags"
        description="Structure ton contenu par thématiques et mots-clés pour un blog lisible et SEO friendly."
      />

      <section className="relative rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-full border border-white/10 bg-black/60 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "categories"
                  ? "bg-[#FF8656] text-black shadow-[0_0_18px_rgba(255,134,86,0.7)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Catégories
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tags")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "tags"
                  ? "bg-[#8364FF] text-white shadow-[0_0_18px_rgba(131,100,255,0.7)]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Tags
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeTab === "categories" && (
              <button
                type="button"
                onClick={() => openDrawer("categories")}
                className="inline-flex items-center gap-2 rounded-full border border-[#FF8656] bg-[#FF8656] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(255,134,86,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,134,86,0.8)]"
              >
                Créer une catégorie
              </button>
            )}
            {activeTab === "tags" && (
              <button
                type="button"
                onClick={() => openDrawer("tags")}
                className="inline-flex items-center gap-2 rounded-full border border-[#8364FF] bg-[#8364FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_25px_rgba(131,100,255,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(131,100,255,0.8)]"
              >
                Créer un tag
              </button>
            )}
            {isLoading && (
              <span className="text-xs text-white/60">
                Chargement des données…
              </span>
            )}
          </div>
        </div>

        {error && <AdminAlert message={error} className="mb-4" />}

        <AnimatePresence mode="wait">
          {activeTab === "categories" ? (
            <motion.div
              key="categories-tab"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {categories.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
                        <th className="py-2 pr-4">Nom</th>
                        <th className="py-2 px-4">Slug</th>
                        <th className="py-2 px-4">Articles</th>
                        <th className="py-2 px-4">Couleur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr
                          key={category.id}
                          className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/5"
                        >
                          <td className="py-2 pr-4 align-middle">
                            <div className="flex flex-col">
                              <span className="font-medium text-white">
                                {category.name}
                              </span>
                              {category.description && (
                                <span className="text-xs text-white/50">
                                  {category.description}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2 px-4 align-middle text-xs text-white/70">
                            {category.slug}
                          </td>
                          <td className="py-2 px-4 align-middle text-xs text-white/70">
                            {category.articlesCount}
                          </td>
                          <td className="py-2 px-4 align-middle text-xs text-white/70">
                            {category.color ? (
                              <span className="inline-flex items-center gap-2">
                                <span
                                  className="h-3 w-3 rounded-full border border-white/20"
                                  style={{ backgroundColor: category.color }}
                                />
                                <span>{category.color}</span>
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 px-4 py-6 text-center text-sm text-white/60">
                  Aucune catégorie configurée. Utilise le bouton &laquo; Créer une catégorie &raquo; pour commencer.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="tags-tab"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs text-white/80"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: tag.color || "#8364FF" }}
                      />
                      <span>#{tag.name}</span>
                      <span className="text-[10px] text-white/50">
                        {tag.articlesCount} article{tag.articlesCount > 1 ? "s" : ""}
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 px-4 py-6 text-center text-sm text-white/60">
                  Aucun tag configuré. Utilise le bouton &laquo; Créer un tag &raquo; pour en ajouter.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0"
                onClick={() => setIsDrawerOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="relative z-10 h-full w-full max-w-md border-l border-white/10 bg-black/95 px-4 py-6 shadow-[0_0_40px_rgba(0,0,0,0.9)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-archivo text-base md:text-lg tracking-wide">
                      {drawerMode === "categories"
                        ? "Nouvelle catégorie"
                        : "Nouveau tag"}
                    </h3>
                    <p className="mt-1 text-xs text-white/60">
                      {drawerMode === "categories"
                        ? "Organise tes articles par thématiques claires."
                        : "Ajoute des tags précis pour filtrer ton contenu."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AdminFormField label="Nom">
                    <AdminFormInput
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder={
                        drawerMode === "categories"
                          ? "Ex : Architecture SaaS"
                          : "Ex : rails, nextjs, tdd…"
                      }
                    />
                  </AdminFormField>
                  <AdminFormField
                    label="Slug"
                    hint="Utilisé dans l'URL de l'API et du blog."
                  >
                    <AdminFormInput
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      placeholder="architecture-saas"
                    />
                  </AdminFormField>
                  {drawerMode === "categories" && (
                    <AdminFormField label="Description">
                      <AdminFormTextarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Courte description pour comprendre quand utiliser cette catégorie."
                      />
                    </AdminFormField>
                  )}
                  <AdminFormField label="Couleur (optionnel)">
                    <AdminFormInput
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="#8364FF"
                    />
                  </AdminFormField>
                  {drawerError && (
                    <AdminAlert message={drawerError} className="mb-2" />
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(193,255,0,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(193,255,0,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? "Enregistrement..."
                        : drawerMode === "categories"
                          ? "Créer la catégorie"
                          : "Créer le tag"}
                    </button>
                  </div>
                </form>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
