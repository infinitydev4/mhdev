"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  backLabel?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  backLabel,
  onBack,
  actions,
}: AdminPageHeaderProps) {
  const { logout } = useAdminAuth();

  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        {onBack && backLabel && (
          <button
            type="button"
            onClick={onBack}
            className="mb-2 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
          >
            ← {backLabel}
          </button>
        )}
        <h2 className="font-archivo text-lg md:text-xl tracking-wide">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-white/60">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {actions}
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
}
