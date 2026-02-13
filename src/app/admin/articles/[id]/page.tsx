"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Article } from "@/types/blog";
import { BlogAPI } from "@/lib/api/blog";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { AdminAuthGate } from "@/features/admin/ui/AdminAuthGate";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { getArticleStatusLabel } from "@/features/admin/domain/utils";

export default function AdminArticleDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { auth, isReady } = useAdminAuth();
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
        if (!cancelled) setArticle(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Impossible de charger l'article."
          );
        }
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
        title="Détail de l'article"
        description="Aperçu rapide du contenu et des métadonnées de l'article."
        backLabel="Retour à la liste"
        onBack={() => router.push("/admin/articles")}
      />

      <section className="rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {isLoading && (
          <p className="text-sm text-white/60">Chargement de l&apos;article…</p>
        )}
        {error && <AdminAlert message={error} className="mb-4" />}
        {article && (
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/60">
                {article.category?.name ?? "Sans catégorie"}
              </span>
              <h1 className="mt-2 font-archivo text-xl md:text-2xl tracking-wide">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mt-1 text-sm text-white/60">{article.excerpt}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-white/60">
              <span>
                Statut : <strong>{getArticleStatusLabel(article.status)}</strong>
              </span>
              <span>
                Vues : <strong>{article.views}</strong>
              </span>
              {article.publishedAt && (
                <span>
                  Publié le{" "}
                  <strong>
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </strong>
                </span>
              )}
            </div>
            <div className="border-t border-white/10 pt-4">
              <h3 className="mb-4 text-sm font-semibold text-white/80">
                Contenu
              </h3>
              <div
                className="prose prose-invert max-w-none text-sm
                  prose-headings:font-archivo prose-headings:font-bold
                  prose-h1:text-2xl prose-h1:text-[#C1FF00] prose-h1:mb-4
                  prose-h2:text-xl prose-h2:text-[#8364FF] prose-h2:mb-3 prose-h2:mt-6
                  prose-h3:text-lg prose-h3:text-white prose-h3:mb-2 prose-h3:mt-4
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-3
                  prose-a:text-[#8364FF] prose-a:no-underline hover:prose-a:text-[#C1FF00] prose-a:transition-colors
                  prose-strong:text-white prose-strong:font-bold
                  prose-code:text-[#C1FF00] prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px]
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-4
                  prose-blockquote:border-l-4 prose-blockquote:border-[#8364FF] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-300
                  prose-li:mb-1
                  prose-img:rounded-xl prose-img:shadow-lg"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({
                      inline,
                      className,
                      children,
                      ...props
                    }: {
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                    }) {
                      const codeContent = String(children).replace(/\n$/, "");
                      if (inline) {
                        return (
                          <code
                            className={`rounded bg-gray-800 px-1.5 py-0.5 text-[#C1FF00] text-[13px] ${className ?? ""}`}
                            {...props}
                          >
                            {codeContent}
                          </code>
                        );
                      }
                      return (
                        <pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm">
                          <code className={className} {...props}>
                            {codeContent}
                          </code>
                        </pre>
                      );
                    },
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
