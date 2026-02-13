"use client";

import { motion } from "framer-motion";

export function AdminLoadingState() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white/70"
      >
        <span className="h-2 w-2 rounded-full bg-[#C1FF00] animate-pulse" />
        <span>Initialisation du studio admin…</span>
      </motion.div>
    </main>
  );
}
