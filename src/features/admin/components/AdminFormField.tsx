"use client";

interface AdminFormFieldProps {
  label: string;
  id?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function AdminFormField({ label, id, error, hint, children }: AdminFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-white/50">{hint}</p>}
      {error && (
        <p className="mt-1 text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
