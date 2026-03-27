import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  const v: Record<Variant, string> = {
    primary:
      "text-white shadow-sm bg-gradient-to-r from-[#003366] via-[#00A3A3] to-[#2ECC71] hover:opacity-95",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "text-slate-700 hover:bg-slate-100",
    outline:
      "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
  };
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50",
        v[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
