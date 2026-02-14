"use client";

import { AdminAuthContext, useAdminAuthProvider } from "@/hooks/useAdminAuth";

/**
 * Provider d'authentification admin.
 * Wrappe toutes les routes /admin pour partager un seul état d'auth
 * entre le layout, les pages et tous les sous-composants.
 */
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const value = useAdminAuthProvider();

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
