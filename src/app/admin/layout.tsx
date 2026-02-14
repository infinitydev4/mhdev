"use client";

import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * Couche interne qui consomme le contexte d'auth.
 * Affiche le loader, le login (children nus) ou le layout avec sidebar.
 */
function AdminAuthShell({ children }: { children: React.ReactNode }) {
  const { auth, isReady } = useAdminAuth();

  // Phase 1 : Restauration de l'auth depuis localStorage
  if (!isReady) {
    return <AdminLoadingState />;
  }

  // Phase 2 : Non connecté — affiche la page enfant sans wrapper (login)
  if (!auth) {
    return <>{children}</>;
  }

  // Phase 3 : Connecté — sidebar + header + contenu
  return (
    <AdminLayout user={auth.user}>
      {children}
    </AdminLayout>
  );
}

/**
 * Layout racine admin.
 * Le Provider DOIT wrapper le shell pour que useAdminAuth() fonctionne.
 */
export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminAuthShell>{children}</AdminAuthShell>
    </AdminAuthProvider>
  );
}
