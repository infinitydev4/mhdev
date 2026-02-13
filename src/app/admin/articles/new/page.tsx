"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoadingState } from "@/features/admin/ui/AdminLoadingState";
import { AdminAuthGate } from "@/features/admin/ui/AdminAuthGate";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";

export default function AdminArticleNewPage() {
  const router = useRouter();
  const { auth, isReady } = useAdminAuth();
  const token = auth?.accessToken ?? "";

  if (!isReady) return <AdminLoadingState />;
  if (!auth) return <AdminAuthGate />;

  return (
    <>
      <AdminPageHeader
        title="Créer un article"
        description="Rédige et optimise un nouvel article de blog avec l'aide de l'IA."
        backLabel="Retour à l'aperçu"
        onBack={() => router.push("/admin")}
      />
      <AdminArticleForm token={token} />
    </>
  );
}
