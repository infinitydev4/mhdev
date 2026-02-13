"use client";

type AdminAlertVariant = "error" | "success";

const variantClasses: Record<AdminAlertVariant, string> = {
  error: "border-red-500/40 bg-red-500/10 text-red-200",
  success: "border-[#C1FF00]/40 bg-[#C1FF00]/10 text-[#C1FF00]",
};

interface AdminAlertProps {
  message: string;
  variant?: AdminAlertVariant;
  className?: string;
}

export function AdminAlert({ message, variant = "error", className = "" }: AdminAlertProps) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 text-xs ${variantClasses[variant]} ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
}
