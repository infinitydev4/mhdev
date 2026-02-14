"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { AuthUser } from "@/types/auth";

interface AdminLayoutProps {
  user: AuthUser;
  children: React.ReactNode;
}

function getUserDisplay(user: AuthUser) {
  const firstInitial =
    user?.firstName && user.firstName.length > 0 ? user.firstName.charAt(0) : "M";
  const lastInitial =
    user?.lastName && user.lastName.length > 0 ? user.lastName.charAt(0) : "H";

  return {
    firstInitial,
    lastInitial,
    firstName: user?.firstName ?? "Admin",
    lastName: user?.lastName ?? "MHDEV",
    role:
      user?.role === "ADMIN"
        ? "Admin"
        : user?.role === "MODERATOR"
          ? "Modérateur"
          : "Auteur",
    email: user?.email ?? "admin@mhdev.xyz",
  };
}

export function AdminLayout({ user, children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => setIsSidebarOpen((v) => !v), []);

  const isOverview = pathname === "/admin";
  const isArticles = pathname?.startsWith("/admin/articles") ?? false;
  const isCategories = pathname?.startsWith("/admin/categories") ?? false;

  const display = getUserDisplay(user);

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white font-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar — relative pour que le bouton toggle puisse déborder */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 70 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="relative flex flex-col bg-black/80 border-r border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(131,100,255,0.35)]"
          style={{ overflow: "visible" }}
        >
          {/* Header sidebar */}
          <div className="flex h-16 items-center px-4 border-b border-white/10">
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8364FF] text-black font-archivo text-lg shadow-[0_0_20px_rgba(131,100,255,0.8)]">
                MH
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-archivo text-sm tracking-wide">Admin</span>
                  <span className="font-protest text-xs text-[#C1FF00] leading-tight">
                    Blog Studio
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex-1 space-y-1 px-2">
            <Link
              href="/admin"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                isOverview
                  ? "bg-[#8364FF]/10 text-white hover:bg-[#8364FF]/30 border-[#8364FF]/40"
                  : "text-white/70 hover:text-white hover:bg-white/5 border-transparent"
              }`}
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#8364FF]/20 text-[#8364FF]">
                ✦
              </span>
              {isSidebarOpen && <span>Vue d&apos;ensemble</span>}
            </Link>
            <Link
              href="/admin/articles"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                isArticles
                  ? "bg-[#C1FF00]/10 text-white hover:bg-[#C1FF00]/20 border-[#C1FF00]/40"
                  : "text-white/70 hover:text-white hover:bg-white/5 border-transparent"
              }`}
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C1FF00]/10 text-[#C1FF00]">
                ✎
              </span>
              {isSidebarOpen && <span>Articles</span>}
            </Link>
            <Link
              href="/admin/categories"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                isCategories
                  ? "bg-[#FF8656]/10 text-white hover:bg-[#FF8656]/20 border-[#FF8656]/40"
                  : "text-white/70 hover:text-white hover:bg-white/5 border-transparent"
              }`}
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF8656]/10 text-[#FF8656]">
                #
              </span>
              {isSidebarOpen && <span>Catégories &amp; Tags</span>}
            </Link>
          </nav>

          {/* Bas de sidebar : user info + bouton toggle à l'extérieur */}
          <div className="relative px-3 pb-4">
            {isSidebarOpen ? (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#8364FF]/20 via-black to-black p-3 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-xl bg-black/60 flex items-center justify-center text-[#C1FF00] text-sm">
                    {display.firstInitial}
                    {display.lastInitial}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-medium text-sm">
                      {display.firstName} {display.lastName}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-[#C1FF00]">
                      {display.role}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-xl bg-black/60 flex items-center justify-center text-[#C1FF00] text-sm">
                  {display.firstInitial}
                  {display.lastInitial}
                </div>
              </div>
            )}

            {/* Bouton toggle — collé au bord droit de la sidebar, carré côté sidebar, arrondi côté extérieur */}
            <button
              onClick={toggleSidebar}
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 flex h-8 w-3.5 items-center justify-center rounded-r-md border-y border-r border-white/15 bg-black/90 shadow-[2px_0_10px_rgba(131,100,255,0.3)] hover:bg-[#8364FF]/20 hover:border-[#8364FF]/50 transition-all"
              aria-label="Basculer la sidebar"
            >
              <span className="text-[8px] text-white/60">
                {isSidebarOpen ? "◀" : "▶"}
              </span>
            </button>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6">
            <div className="flex flex-col">
              <span className="font-protest text-sm text-[#C1FF00]">
                Studio éditorial
              </span>
              <h1 className="font-archivo text-lg tracking-wide">
                Dashboard Blog
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C1FF00]" />
                <span>En ligne</span>
              </span>
              <span className="text-[11px] uppercase tracking-wide">
                {display.email}
              </span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-5xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
