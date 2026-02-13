"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { StoredAuth } from "@/hooks/useAdminAuth";

/**
 * Hook qui encapsule la logique d'authentification requise pour les pages admin.
 * Retourne l'auth si l'utilisateur est connecté, null sinon.
 * Utilise isReady pour éviter le flash de contenu non authentifié.
 */
export function useRequireAuth(): {
  auth: StoredAuth | null;
  isReady: boolean;
  isAuthenticated: boolean;
} {
  const { auth, isReady } = useAdminAuth();

  return {
    auth,
    isReady,
    isAuthenticated: Boolean(auth),
  };
}
