"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  GitBranch,
  LayoutDashboard,
  Rocket,
  UsersRound,
} from "lucide-react";
import {
  SECTION_ACCENTS,
  SECTION_HUB_HREF,
  SECTION_LABELS,
  moduleSectionFromPathname,
  type NavSection,
} from "@/lib/config/navigation";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { tenantById } from "@/lib/config/tenants";
import { cn } from "@/lib/utils/cn";

const SECTION_ICONS: Record<NavSection, typeof Building2> = {
  platform: Building2,
  intelligence: LayoutDashboard,
  recruitment: GitBranch,
  hr_suite: UsersRound,
  future: Rocket,
};

export function ModuleSwitcher({
  sections,
  onNavigate,
}: {
  sections: NavSection[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { label, tenantId } = useAppSettings();
  const active = moduleSectionFromPathname(pathname);
  const accent = tenantById(tenantId).accentTeal ?? "#00A3A3";

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label={label("Major modules", "الوحدات الرئيسية")}
      className="border-b border-[var(--border)] bg-gradient-to-b from-[#f0ebe3]/90 via-[var(--card)] to-[var(--surface)]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-3 py-2.5 sm:px-4 md:gap-2 md:px-6 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80">
        {sections.map((section) => {
          const Icon = SECTION_ICONS[section];
          const href = SECTION_HUB_HREF[section];
          const sl = SECTION_LABELS[section];
          const isActive = active === section;
          const isRecruitment = section === "recruitment";
          const acc = SECTION_ACCENTS[section];

          return (
            <Link
              key={section}
              href={href}
              onClick={() => onNavigate?.()}
              className={cn(
                "group flex min-w-0 shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold transition md:px-4 md:py-2.5",
                isActive
                  ? "border-transparent text-white shadow-md"
                  : cn(
                      "border-[var(--border)] bg-white/90 text-slate-700 shadow-sm ring-1 ring-black/[0.04] hover:border-teal-500/35 hover:bg-white hover:shadow-md",
                      acc.softBg
                    )
              )}
              style={
                isActive
                  ? {
                      background: isRecruitment
                        ? `linear-gradient(135deg, #7c5a1c 0%, ${accent} 50%, #2ECC71 100%)`
                        : `linear-gradient(135deg, #003366 0%, ${accent} 55%, #2ECC71 100%)`,
                    }
                  : undefined
              }
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition",
                  isActive
                    ? "border-white/25 bg-white/15 text-white"
                    : cn(
                        "border-slate-200/80 bg-slate-50 text-slate-600 group-hover:border-teal-200 group-hover:bg-teal-50/50 group-hover:text-[#003366]"
                      )
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="max-w-[9.5rem] truncate sm:max-w-[11rem]">
                {label(sl.labelEn, sl.labelAr)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
