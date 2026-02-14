"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { StoredAuth } from "@/hooks/useAdminAuth";
import { AdminAPI } from "@/lib/api/admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { validateLoginCredentials } from "@/features/admin/lib/validators";
import { extractApiError } from "@/features/admin/lib/api-client";

type AccentColor = "purple" | "lime" | "orange" | "cyan";

interface StatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  accent?: AccentColor;
}

const ACCENT_CLASSES: Record<AccentColor, string> = {
  purple: "border-[#8364FF]/40 bg-[#8364FF]/5 text-[#8364FF]",
  lime: "border-[#C1FF00]/40 bg-[#C1FF00]/5 text-[#C1FF00]",
  orange: "border-[#FF8656]/40 bg-[#FF8656]/5 text-[#FF8656]",
  cyan: "border-cyan-500/40 bg-cyan-500/5 text-cyan-400",
} as const;

function StatCard({ label, value, sublabel, accent }: StatCardProps) {
  const c = accent ? ACCENT_CLASSES[accent] : "border-white/10 bg-white/5 text-white";

  return (
    <div
      className={`rounded-2xl border p-4 transition-all hover:bg-white/[0.07] ${c}`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-white/50">
        {label}
      </p>
      <p className="mt-1 font-archivo text-2xl font-semibold">{value}</p>
      {sublabel && (
        <p className="mt-0.5 text-[11px] text-white/50">{sublabel}</p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { auth, login, logout } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { stats, isLoading, error: statsError } = useAdminDashboard(
    Boolean(auth)
  );

  const handleLogin = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const validation = validateLoginCredentials(email, password);
    if (!validation.valid) {
      setError(validation.message ?? "Validation échouée.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await AdminAPI.login(email.trim(), password.trim());
      const payload: StoredAuth = {
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
      login(payload);
      setPassword("");
    } catch (err: unknown) {
      setError(extractApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, login]);

  if (!auth) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/80 p-6 shadow-[0_0_45px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="mb-4 text-center">
            <h1 className="font-archivo text-xl tracking-wide">Accès admin blog</h1>
            <p className="mt-1 text-sm text-white/60">
              Connecte-toi avec un compte admin ou modérateur existant.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
                placeholder="admin@mhdev.xyz"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && <AdminAlert message={error} />}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_35px_rgba(193,255,0,0.7)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(193,255,0,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
            <p className="mt-2 text-center text-[11px] text-white/45">
              Accès réservé aux administrateurs et modérateurs.
            </p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-archivo text-lg md:text-xl tracking-wide">
            Vue d&apos;ensemble
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Statistiques et analytics du blog en un coup d&apos;œil.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(193,255,0,0.6)] transition-transform hover:-translate-y-0.5"
          >
            + Créer un article
          </Link>
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Se déconnecter
          </button>
        </div>
      </div>

      {statsError && <AdminAlert message={statsError} className="mb-4" />}

      {isLoading ? (
        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 text-center text-sm text-white/60">
          Chargement des statistiques…
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Stats principales */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total articles"
              value={stats.totalArticles}
              accent="purple"
            />
            <StatCard
              label="Publiés"
              value={stats.published}
              sublabel="visibles sur le blog"
              accent="lime"
            />
            <StatCard
              label="Brouillons"
              value={stats.drafts}
              accent="orange"
            />
            <StatCard
              label="Total vues"
              value={stats.totalViews.toLocaleString("fr-FR")}
              accent="cyan"
            />
          </section>

          {/* Taxonomies */}
          <section className="rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6">
            <h3 className="font-archivo text-base md:text-lg tracking-wide">
              Taxonomies
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/admin/articles"
                className="inline-flex items-center gap-2 rounded-xl border border-[#C1FF00]/30 bg-[#C1FF00]/5 px-4 py-2 text-sm text-[#C1FF00] transition-colors hover:bg-[#C1FF00]/15"
              >
                <span className="font-semibold">{stats.totalArticles}</span>
                <span className="text-white/70">articles</span>
              </Link>
              <Link
                href="/admin/categories"
                className="inline-flex items-center gap-2 rounded-xl border border-[#FF8656]/30 bg-[#FF8656]/5 px-4 py-2 text-sm text-[#FF8656] transition-colors hover:bg-[#FF8656]/15"
              >
                <span className="font-semibold">{stats.categoriesCount}</span>
                <span className="text-white/70">catégories</span>
              </Link>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <span className="font-semibold">{stats.tagsCount}</span>
                <span>tags</span>
              </span>
            </div>
          </section>

          {/* Top articles par vues */}
          <section className="rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-archivo text-base md:text-lg tracking-wide">
                Top 5 articles (vues)
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs text-[#C1FF00] hover:underline"
              >
                Voir tout →
              </Link>
            </div>
            {stats.topArticlesByViews.length === 0 ? (
              <p className="text-sm text-white/50">
                Aucun article publié pour l&apos;instant.
              </p>
            ) : (
              <ul className="space-y-2">
                {stats.topArticlesByViews.map((article, i) => (
                  <li key={article.id}>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm transition-colors hover:border-white/10 hover:bg-white/5"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white/40">
                          #{i + 1}
                        </span>
                        <span className="truncate text-white">
                          {article.title}
                        </span>
                      </span>
                      <span className="ml-2 shrink-0 text-xs text-white/50">
                        {article.views} vues
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Articles récents */}
          <section className="rounded-3xl border border-white/10 bg-black/70 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-archivo text-base md:text-lg tracking-wide">
                Articles récents
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs text-[#C1FF00] hover:underline"
              >
                Voir tout →
              </Link>
            </div>
            {stats.recentArticles.length === 0 ? (
              <p className="text-sm text-white/50">Aucun article.</p>
            ) : (
              <ul className="space-y-2">
                {stats.recentArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm transition-colors hover:border-white/10 hover:bg-white/5"
                    >
                      <span className="truncate text-white">
                        {article.title}
                      </span>
                      <span className="ml-2 shrink-0 text-[11px] text-white/50">
                        {new Date(article.createdAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-black/40 px-4 py-8 text-center text-sm text-white/60">
          Aucune donnée disponible.
        </div>
      )}
    </>
  );
}
