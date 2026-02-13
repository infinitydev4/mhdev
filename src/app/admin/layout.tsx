"use client";

import { usePathname } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * Layout admin : protège les routes enfants (hors /admin login).
 * Les pages individuelles gèrent leur propre état d'auth car le layout
 * s'exécute côté client et ne peut pas rediriger côté serveur sans middleware.
 */
export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { auth, isReady } = useAdminAuth();

  // Attendre que l'auth soit initialisée pour éviter le flash de contenu
  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-sm text-white/60">Chargement...</div>
      </div>
    );
  }

  // Utilisateur non connecté : pas de layout wrapper (affiche login ou AuthGate)
  if (!auth) {
    return <>{children}</>;
  }

  // Utilisateur connecté : toujours wrapper avec AdminLayout
  return (
    <AdminLayout user={auth.user}>
      {children}
    </AdminLayout>
  );
}
