"use client";

const baseClass =
  "w-full resize-none rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40";

interface AdminFormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  className?: string;
}

export function AdminFormTextarea({ className = "", ...props }: AdminFormTextareaProps) {
  return <textarea className={`${baseClass} ${className}`} {...props} />;
}
