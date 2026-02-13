"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AdminAPI } from "@/lib/api/admin";
import { AdminAlert } from "../ui/AdminAlert";
import { extractApiError } from "../lib/api-client";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

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
  const [isUploading, setIsUploading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setCoverError(
        `Format non autorisé. Utilisez: ${ALLOWED_TYPES.join(", ")}`
      );
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setCoverError(`Fichier trop volumineux. Maximum: ${MAX_SIZE_MB} MB`);
      return;
    }

    setCoverError(null);
    setIsUploading(true);
    try {
      const { uploadUrl, publicUrl } = await AdminAPI.getPresignedUploadUrl(
        token,
        "article-covers",
        file.type
      );

      const putResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!putResponse.ok) {
        throw new Error("Échec de l'upload vers le stockage");
      }

      setCoverImage(publicUrl);
    } catch (err) {
      setCoverError(extractApiError(err));
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const isDataUrl = coverImage.startsWith("data:");
  const showPreview = Boolean(coverImage);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium uppercase tracking-wide text-white/60">
        Image de couverture (S3, URL ou IA)
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

      <div className="flex flex-wrap gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-full border border-[#C1FF00]/50 bg-[#C1FF00]/10 px-4 py-2 text-xs font-medium text-[#C1FF00] transition-colors hover:bg-[#C1FF00]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#C1FF00] border-t-transparent" />
              Upload…
            </>
          ) : (
            <>
              <span>📁</span>
              Choisir un fichier (S3)
            </>
          )}
        </button>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40"
          placeholder="https://... ou uploadez un fichier"
        />
      </div>

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
            "Recréer l'image (IA)"
          ) : (
            "Générer une image (IA)"
          )}
        </button>
      )}

      {coverError && <AdminAlert message={coverError} />}

      <p className="text-[11px] text-white/50">
        Upload S3, URL, data URL ou image générée par l&apos;IA. JPEG, PNG, WebP
        ou GIF. Max {MAX_SIZE_MB} MB.
      </p>
    </div>
  );
}
