"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser } from "@/types/auth";
import { AdminAPI } from "@/lib/api/admin";

// ─── Types ────────────────────────────────────────────────────

export interface StoredAuth {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

interface AdminAuthContextValue {
  auth: StoredAuth | null;
  isReady: boolean;
  login: (payload: StoredAuth) => void;
  logout: () => void;
}

// ─── Constants ────────────────────────────────────────────────

const STORAGE_KEY = "mhdev-admin-auth";

// ─── Context ──────────────────────────────────────────────────

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────

export { AdminAuthContext };

/**
 * Hook interne qui gere la logique d'auth (lecture localStorage, login, logout).
 * Utilise UNIQUEMENT par AdminAuthProvider.
 */
export function useAdminAuthProvider(): AdminAuthContextValue {
  const [auth, setAuth] = useState<StoredAuth | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Restaurer l'auth depuis localStorage au mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(STORAGE_KEY);

    const restore = async () => {
      if (!raw) {
        setIsReady(true);
        return;
      }

      try {
        const parsed = JSON.parse(raw) as StoredAuth;

        if (parsed?.user && parsed?.accessToken) {
          setAuth(parsed);
          setIsReady(true);
          return;
        }

        // Token present mais pas de user : tenter de recuperer le profil
        if (parsed?.accessToken) {
          try {
            const profile = await AdminAPI.getProfile(parsed.accessToken);
            const fixed: StoredAuth = {
              user: profile,
              accessToken: parsed.accessToken,
              refreshToken: parsed.refreshToken,
            };
            setAuth(fixed);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fixed));
          } catch {
            window.localStorage.removeItem(STORAGE_KEY);
          }
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsReady(true);
      }
    };

    void restore();
  }, []);

  const login = useCallback((payload: StoredAuth) => {
    setAuth(payload);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return useMemo(
    () => ({ auth, isReady, login, logout }),
    [auth, isReady, login, logout],
  );
}

// ─── Consumer Hook ────────────────────────────────────────────

/**
 * Hook pour acceder a l'etat d'auth admin.
 * Doit etre utilise dans un composant enfant de AdminAuthProvider.
 */
export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error(
      "useAdminAuth must be used within an AdminAuthProvider. " +
        "Wrap your admin layout with <AdminAuthProvider>.",
    );
  }
  return context;
}
