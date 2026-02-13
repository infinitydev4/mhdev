"use client";

import type { Tag } from "@/types/blog";

interface TagSelectorProps {
  tags: Tag[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function TagSelector({ tags, selectedIds, onToggle }: TagSelectorProps) {
  return (
    <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto rounded-xl border border-white/10 bg-black/50 px-2 py-2">
      {tags.map((tag) => {
        const isActive = selectedIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => onToggle(tag.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "border-[#FF8656] bg-[#FF8656]/20 text-[#FF8656]"
                : "border-white/15 bg-black/40 text-white/60 hover:border-[#FF8656]/60 hover:text-white"
            }`}
          >
            #{tag.name}
          </button>
        );
      })}
      {tags.length === 0 && (
        <p className="text-[11px] text-white/40">Aucun tag configuré.</p>
      )}
    </div>
  );
}
