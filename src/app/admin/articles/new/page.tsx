"use client";

import { useRouter } from "next/navigation";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";

export default function AdminArticleNewPage() {
  const router = useRouter();
  const { auth } = useAdminAuth();
  const token = auth?.accessToken ?? "";

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
