import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: "neutral" | "teal" | "gold" | "success" | "warning";
  className?: string;
}) {
  const styles: Record<typeof variant, string> = {
    neutral: "bg-slate-100 text-slate-700",
    teal: "bg-teal-50 text-teal-800 border border-teal-200/80",
    gold: "bg-amber-50 text-amber-900 border border-amber-200/80",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
