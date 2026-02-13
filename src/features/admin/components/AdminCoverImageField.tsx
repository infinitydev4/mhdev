"use client";

import { useState } from "react";
import Image from "next/image";
import { AdminAPI } from "@/lib/api/admin";
import { AdminAlert } from "../ui/AdminAlert";
import { extractApiError } from "../lib/api-client";

interface AdminCoverImageFieldProps {
  token: string;
  coverImage: string;
  setCoverImage: (url: string) => void;
  title: string;
  excerpt: string;
}

export function AdminCoverImageField({
  token,
  coverImage,
  setCoverImage,
  title,
  excerpt,
}: AdminCoverImageFieldProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);

  const handleRegenerate = async () => {
    if (!title.trim() || title.trim().length < 3) {
      setCoverError("Indiquez un titre d'au moins 3 caractères pour régénérer.");
      return;
    }
    setCoverError(null);
    setIsRegenerating(true);
    try {
      const { coverImage: newUrl } = await AdminAPI.generateCoverImage(token, {
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
      });
      setCoverImage(newUrl);
    } catch (err) {
      setCoverError(extractApiError(err));
    } finally {
      setIsRegenerating(false);
    }
  };

  const isDataUrl = coverImage.startsWith("data:");
  const showPreview = Boolean(coverImage);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium uppercase tracking-wide text-white/60">
        Image de couverture (URL ou générée par IA)
      </label>

      {showPreview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
          {isDataUrl ? (
            <img
              src={coverImage}
              alt="Aperçu"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={coverImage}
              alt="Aperçu"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      )}

      <input
        type="text"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
        placeholder="https://... ou laissez l'IA générer"
      />

      {(showPreview || title.trim().length >= 3) && (
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={isRegenerating || !title.trim()}
          className="inline-flex items-center gap-2 rounded-full border border-[#8364FF]/50 bg-[#8364FF]/10 px-3 py-1.5 text-xs font-medium text-[#8364FF] transition-colors hover:bg-[#8364FF]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRegenerating ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#8364FF] border-t-transparent" />
              Génération…
            </>
          ) : showPreview ? (
            "Recréer l'image"
          ) : (
            "Générer une image"
          )}
        </button>
      )}

      {coverError && <AdminAlert message={coverError} />}

      <p className="text-[11px] text-white/50">
        URL, data URL ou image générée par l&apos;IA. Format 16:9 recommandé.
      </p>
    </div>
  );
}
