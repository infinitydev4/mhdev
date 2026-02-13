"use client";

import { useState } from "react";
import type { StoredAuth } from "@/hooks/useAdminAuth";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { AdminAPI } from "@/lib/api/admin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { AdminAuthGate } from "@/features/admin/ui/AdminAuthGate";
import { AdminAlert } from "@/features/admin/ui/AdminAlert";
import { validateLoginCredentials } from "@/features/admin/lib/validators";
import { extractApiError } from "@/features/admin/lib/api-client";

export default function AdminPage() {
  const { auth, isReady, login, logout } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
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
  };

  if (!isReady) {
    return <AdminLoadingState />;
  }

  if (!auth) {
    return (
      <AdminAuthGate
        title="Accès admin blog"
        description="Connecte-toi avec un compte admin ou modérateur existant."
      >
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
              Accès réservé : les droits sont gérés par ton backend (RBAC NestJS + Prisma).
            </p>
          </form>
      </AdminAuthGate>
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-archivo text-lg md:text-xl tracking-wide">
            Rédaction d&apos;articles
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Crée et optimise tes articles de blog directement depuis ton portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span>Se déconnecter</span>
        </button>
      </div>
      <AdminArticleForm token={auth.accessToken} />
    </>
  );
}
