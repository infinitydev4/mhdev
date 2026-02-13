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
  const { auth } = useAdminAuth();

  // Page de login (/admin exact) : pas de layout wrapper
  if (pathname === "/admin" && !auth) {
    return <>{children}</>;
  }

  // Utilisateur non connecté sur une sous-route : la page gère l'affichage (AuthGate)
  if (!auth) {
    return <>{children}</>;
  }

  // Utilisateur connecté : wrapper avec AdminLayout pour les pages authentifiées
  return (
    <AdminLayout user={auth.user}>
      {children}
    </AdminLayout>
  );
}
