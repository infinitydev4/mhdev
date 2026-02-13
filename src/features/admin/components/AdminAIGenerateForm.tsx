"use client";

import { useState } from "react";
import { AdminAPI } from "@/lib/api/admin";
import { useAIGeneration } from "../hooks/useAIGeneration";
import { AdminFormField } from "./AdminFormField";
import { AdminFormInput } from "./AdminFormInput";
import { AdminAlert } from "../ui/AdminAlert";
import { extractApiError } from "../lib/api-client";
import type { GeneratedArticle } from "../hooks/useAIGeneration";

const TONE_OPTIONS = [
  { value: "professional", label: "Professionnel" },
  { value: "technical", label: "Technique" },
  { value: "marketing", label: "Marketing" },
  { value: "conversational", label: "Conversationnel" },
] as const;

const LANG_OPTIONS = [
  { value: "fr", label: "Français" },
  { value: "en", label: "Anglais" },
  { value: "es", label: "Espagnol" },
] as const;

interface AdminAIGenerateFormProps {
  token: string;
  onApply: (data: GeneratedArticle) => void;
  collapsed?: boolean;
}

export function AdminAIGenerateForm({
  token,
  onApply,
  collapsed = true,
}: AdminAIGenerateFormProps) {
  const [expanded, setExpanded] = useState(!collapsed);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestError, setSuggestError] = useState<string | null>(null);
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("fr");
  const [generateCoverImage, setGenerateCoverImage] = useState(false);

  const { generate, isGenerating, error } = useAIGeneration({
    token,
    onSuccess: (data) => onApply(data),
  });

  const handleSuggest = async () => {
    if (!keywords.trim() || keywords.trim().length < 2) return;
    setSuggestError(null);
    setIsSuggesting(true);
    try {
      const { suggestions: data } = await AdminAPI.suggestArticleIdeas(token, {
        keywords: keywords.trim(),
        language,
      });
      setSuggestions(data ?? []);
    } catch (err) {
      setSuggestError(extractApiError(err));
      setSuggestions([]);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generate({
      title: title.trim() || undefined,
      topic: topic.trim() || undefined,
      tone,
      language,
      generateCoverImage: generateCoverImage || undefined,
    });
  };

  return (
    <div className="mb-6 rounded-2xl border border-[#8364FF]/30 bg-[#8364FF]/5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="font-archivo text-sm font-medium text-[#8364FF]">
            Générer avec l&apos;IA
          </span>
          <span className="text-[11px] text-white/50">
            Titre ou sujet → contenu SEO
          </span>
        </div>
        <span className="text-white/50">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-[#8364FF]/20 px-4 py-4"
        >
          {/* Suggestions par mots-clés */}
          <div className="mb-4 space-y-2">
            <AdminFormField label="Mots-clés pour des idées">
              <div className="flex flex-wrap gap-2">
                <AdminFormInput
                  type="text"
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                    setSuggestError(null);
                  }}
                  placeholder="Ex : Ruby on Rails, API, performance"
                  className="min-w-0 flex-1 sm:min-w-[180px]"
                />
                <button
                  type="button"
                  onClick={handleSuggest}
                  disabled={isSuggesting || keywords.trim().length < 2}
                  className="shrink-0 rounded-full border border-[#8364FF]/50 bg-[#8364FF]/10 px-4 py-2 text-xs font-medium text-[#8364FF] transition-colors hover:bg-[#8364FF]/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSuggesting ? (
                    <>
                      <span className="mr-1.5 inline-block h-3 w-3 animate-spin rounded-full border-2 border-[#8364FF] border-t-transparent" />
                      Suggestions…
                    </>
                  ) : (
                    "Suggérer 3 idées"
                  )}
                </button>
              </div>
            </AdminFormField>
            {suggestError && (
              <AdminAlert message={suggestError} className="mb-2" />
            )}
            {suggestions.length > 0 && (
              <div className="rounded-xl border border-[#8364FF]/20 bg-black/40 p-3">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Cliquez pour utiliser comme titre
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestionClick(s)}
                      className="rounded-lg border border-[#8364FF]/40 bg-[#8364FF]/10 px-3 py-2 text-left text-sm text-white transition-colors hover:bg-[#8364FF]/25 hover:border-[#8364FF]/60"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <AdminFormField label="Titre exact (optionnel)">
              <AdminFormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : 7 bonnes pratiques React"
              />
            </AdminFormField>
            <AdminFormField label="Sujet / thème (optionnel)">
              <AdminFormInput
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex : optimisation Next.js"
              />
            </AdminFormField>
          </div>
          <p className="mb-3 text-[11px] text-white/50">
            Indiquez au moins un titre ou un sujet. Utilisez les suggestions ci-dessus ou saisissez directement.
          </p>

          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="generateCoverImage"
              checked={generateCoverImage}
              onChange={(e) => setGenerateCoverImage(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black/60 text-[#8364FF] focus:ring-[#8364FF]"
            />
            <label
              htmlFor="generateCoverImage"
              className="text-sm text-white/80"
            >
              Générer une image de couverture (OpenAI DALL-E ou Banana Pro)
            </label>
          </div>

          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <AdminFormField label="Ton">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#8364FF] focus:ring-2 focus:ring-[#8364FF]/40"
              >
                {TONE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </AdminFormField>
            <AdminFormField label="Langue">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#8364FF] focus:ring-2 focus:ring-[#8364FF]/40"
              >
                {LANG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </AdminFormField>
          </div>

          {error && <AdminAlert message={error} className="mb-3" />}

          <button
            type="submit"
            disabled={isGenerating || (!title.trim() && !topic.trim())}
            className="inline-flex items-center gap-2 rounded-full border border-[#8364FF] bg-[#8364FF]/20 px-4 py-2 text-xs font-semibold text-[#8364FF] transition-colors hover:bg-[#8364FF]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#8364FF] border-t-transparent" />
                Génération en cours…
              </>
            ) : (
              "Générer l'article"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
