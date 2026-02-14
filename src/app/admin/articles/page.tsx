"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Article } from "@/types/blog";
import { AdminAPI } from "@/lib/api/admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useArticles } from "@/features/admin/hooks/useArticles";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import {
  getArticleStatusLabel,
  getArticleStatusClass,
  getNextArticleStatus,
} from "@/features/admin/domain/utils";
import { extractApiError } from "@/features/admin/lib/api-client";

export default function AdminArticlesPage() {
  const { auth } = useAdminAuth();
  const {
    articles,
    isLoading,
    error,
    updateArticleInList,
    removeArticleFromList,
  } = useArticles(Boolean(auth));
  const [actionError, setActionError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const safeToken = auth?.accessToken ?? "";

  const openMenu = (articleId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (openMenuId === articleId) {
      setOpenMenuId(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + 4, left: rect.right - 160 });
    setOpenMenuId(articleId);
  };

  useEffect(() => {
    if (!openMenuId) return;
    const handler = () => setOpenMenuId(null);
    const timer = setTimeout(() => document.addEventListener("click", handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
    };
  }, [openMenuId]);

  const handleStatusClick = useCallback(
    async (article: Article) => {
      if (!safeToken) return;
      setActionError(null);
      const nextStatus = getNextArticleStatus(article.status);
      try {
        const updated = await AdminAPI.updateArticle(safeToken, article.id, {
          status: nextStatus,
        });
        updateArticleInList(article.id, { status: updated.status });
      } catch (err) {
        setActionError(extractApiError(err));
      }
    },
    [safeToken, updateArticleInList]
  );

  const handleDelete = useCallback(
    async (article: Article) => {
      if (!safeToken) return;
      setActionError(null);
      const confirmed =
        typeof window !== "undefined" &&
        window.confirm(
          `Supprimer l'article "${article.title}" ? Cette action est définitive.`
        );
      if (!confirmed) return;

      try {
        await AdminAPI.deleteArticle(safeToken, article.id);
        removeArticleFromList(article.id);
      } catch (err) {
        setActionError(extractApiError(err));
      } finally {
        setOpenMenuId(null);
      }
    },
    [safeToken, removeArticleFromList]
  );


  return (
    <>
      <AdminPageHeader
        title="Articles du blog"
        description="Gère les articles publiés et prépare tes prochains contenus."
        actions={
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(193,255,0,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(193,255,0,0.8)]"
          >
            Créer un article
          </Link>
        }
      />

      <section className="rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="font-archivo text-base md:text-lg tracking-wide">
            Liste des articles
          </h3>
          {isLoading && (
            <span className="text-xs text-white/60">
              Chargement des articles…
            </span>
          )}
        </div>

        {error && <AdminAlert message={error} className="mb-4" />}
        {actionError && <AdminAlert message={actionError} className="mb-4" />}

        {!articles.length && !isLoading ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 px-4 py-6 text-center text-sm text-white/60">
            Aucun article trouvé pour l&apos;instant. Commence par en créer un
            depuis le bouton &laquo; Créer un article &raquo;.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
                  <th className="py-2 pr-4">Titre</th>
                  <th className="py-2 px-4">Statut</th>
                  <th className="py-2 px-4">Catégorie</th>
                  <th className="py-2 px-4">Publié le</th>
                  <th className="py-2 px-4 text-right">Vues</th>
                  <th className="py-2 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/5"
                  >
                    <td className="py-2 pr-4 align-middle">
                      <div className="flex flex-col">
                        <span className="truncate font-medium text-white">
                          {article.title}
                        </span>
                        {article.excerpt && (
                          <span className="text-xs text-white/50">
                            {article.excerpt.length > 80
                              ? `${article.excerpt.slice(0, 80)}…`
                              : article.excerpt}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 align-middle">
                      <button
                        type="button"
                        onClick={() => handleStatusClick(article)}
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${getArticleStatusClass(article.status)}`}
                      >
                        {getArticleStatusLabel(article.status)}
                      </button>
                    </td>
                    <td className="py-2 px-4 align-middle text-xs text-white/70">
                      {article.category?.name ? (
                        <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white">
                          {article.category.name}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2 px-4 align-middle text-xs text-white/70">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(
                            "fr-FR",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )
                        : "—"}
                    </td>
                    <td className="py-2 px-4 align-middle text-right text-xs text-white/70">
                      {article.views}
                    </td>
                    <td className="py-2 pr-4 align-middle text-right">
                      <button
                        type="button"
                        onClick={(e) => openMenu(article.id, e)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs text-white/70 hover:bg-white/10"
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {openMenuId &&
        menuPosition &&
        typeof document !== "undefined" &&
        (() => {
          const article = articles.find((a) => a.id === openMenuId);
          if (!article) return null;
          return createPortal(
            <div
              className="fixed z-[9999] w-40 rounded-xl border border-white/10 bg-black/95 py-1 text-[11px] text-white/80 shadow-xl"
              style={{ top: menuPosition.top, left: menuPosition.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href={`/admin/articles/${article.id}`}
                className="block px-3 py-2 hover:bg-white/10"
                onClick={() => setOpenMenuId(null)}
              >
                Voir les détails
              </Link>
              <Link
                href={`/admin/articles/${article.id}/edit`}
                className="block px-3 py-2 hover:bg-white/10"
                onClick={() => setOpenMenuId(null)}
              >
                Éditer
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(article)}
                className="block w-full px-3 py-2 text-left text-red-300 hover:bg-red-500/20"
              >
                Supprimer
              </button>
            </div>,
            document.body
          );
        })()}
    </>
  );
}
