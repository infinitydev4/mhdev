"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AdminAuthGateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminAuthGate({
  title = "Accès admin requis",
  description = "Connecte-toi depuis l'onglet principal du studio admin.",
  children,
}: AdminAuthGateProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-black/80 p-6 shadow-[0_0_45px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <div className="mb-4 text-center">
          <h1 className="font-archivo text-xl tracking-wide">{title}</h1>
          <p className="mt-1 text-sm text-white/60">{description}</p>
        </div>
        {children ?? (
          <Link
            href="/admin"
            className="mt-2 flex w-full items-center justify-center rounded-full border border-[#C1FF00] bg-[#C1FF00] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_35px_rgba(193,255,0,0.7)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(193,255,0,0.9)]"
          >
            Aller à la page de connexion
          </Link>
        )}
      </motion.div>
    </main>
  );
}
