"use client";

const baseInputClass =
  "w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none ring-0 focus:border-[#C1FF00] focus:ring-2 focus:ring-[#C1FF00]/40";

interface AdminFormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  className?: string;
}

export function AdminFormInput({ className = "", ...props }: AdminFormInputProps) {
  return <input className={`${baseInputClass} ${className}`} {...props} />;
}
