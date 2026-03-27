"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronDown,
  Globe,
  Menu,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { NAV_ITEMS, SECTION_LABELS, type NavSection } from "@/lib/config/navigation";
import { TENANTS, tenantById } from "@/lib/config/tenants";
import { ROLES, roleAllowed } from "@/lib/config/roles";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

const SECTION_ORDER: NavSection[] = [
  "intelligence",
  "talent",
  "hr",
  "future",
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { tenantId, setTenantId, roleId, setRoleId, locale, setLocale, label } =
    useAppSettings();
  const tenant = tenantById(tenantId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const navFiltered = useMemo(
    () => NAV_ITEMS.filter((item) => roleAllowed(roleId, item.roles)),
    [roleId]
  );

  const bySection = useMemo(() => {
    const m = new Map<NavSection, typeof NAV_ITEMS>();
    SECTION_ORDER.forEach((s) => m.set(s, []));
    navFiltered.forEach((item) => {
      m.get(item.section)?.push(item);
    });
    return m;
  }, [navFiltered]);

  const accent = tenant.accentTeal ?? "#00A3A3";

  return (
    <div className="flex min-h-screen bg-[var(--surface)] text-slate-900">
      {/* Mobile overlay */}
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex w-72 flex-col border-e border-slate-200 bg-white shadow-sm transition-transform lg:static lg:translate-x-0",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-4">
          <Image
            src="/logo.png"
            alt="Takamel HR"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#003366]">
              Takamel HR
            </p>
            <p className="truncate text-xs text-slate-500" dir="rtl">
              تكامل
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {SECTION_ORDER.map((section) => {
            const items = bySection.get(section) ?? [];
            if (items.length === 0) return null;
            const sl = SECTION_LABELS[section];
            return (
              <div key={section} className="mb-6">
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {label(sl.labelEn, sl.labelAr)}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        pathname.startsWith(item.href));
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                            active
                              ? "text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-50"
                          )}
                          style={
                            active
                              ? {
                                  background: `linear-gradient(135deg, #003366 0%, ${accent} 55%, #2ECC71 100%)`,
                                }
                              : undefined
                          }
                        >
                          <span>{label(item.labelEn, item.labelAr)}</span>
                          {item.badge === "soon" ? (
                            <Badge variant="gold" className="text-[10px]">
                              {label("Soon", "قريباً")}
                            </Badge>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3 text-xs text-slate-500">
          <p className="font-medium text-slate-600">
            {label("Multitenant prototype", "نموذج متعدد المستأجرين")}
          </p>
          <p className="mt-1">
            {label("Data is local dummy only.", "البيانات وهمية محلياً فقط.")}
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setTenantOpen(!tenantOpen);
                setRoleOpen(false);
              }}
              className="flex max-w-[220px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50"
            >
              <Building2 className="h-4 w-4 shrink-0 text-[#003366]" />
              <span className="truncate font-medium text-slate-800">
                {label(tenant.nameEn, tenant.nameAr)}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
            </button>
            {tenantOpen ? (
              <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                {TENANTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTenantId(t.id);
                      setTenantOpen(false);
                    }}
                    className={cn(
                      "flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-slate-50",
                      t.id === tenantId && "bg-teal-50"
                    )}
                  >
                    <span className="font-medium text-slate-800">
                      {label(t.nameEn, t.nameAr)}
                    </span>
                    <span className="text-xs text-slate-500">{t.industry}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setRoleOpen(!roleOpen);
                setTenantOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            >
              <Shield className="h-4 w-4 text-[#C5A059]" />
              <span className="max-w-[160px] truncate font-medium text-slate-800">
                {label(
                  ROLES.find((r) => r.id === roleId)?.labelEn ?? "",
                  ROLES.find((r) => r.id === roleId)?.labelAr ?? ""
                )}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            {roleOpen ? (
              <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRoleId(r.id);
                      setRoleOpen(false);
                    }}
                    className={cn(
                      "flex w-full flex-col items-start px-3 py-2 text-left hover:bg-slate-50",
                      r.id === roleId && "bg-amber-50/80"
                    )}
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {label(r.labelEn, r.labelAr)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {label(r.descriptionEn, r.descriptionAr ?? r.descriptionEn)}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Globe className="h-4 w-4 text-teal-600" />
              {locale === "en" ? "العربية" : "English"}
            </button>
            <span className="hidden items-center gap-1 rounded-full bg-gradient-to-r from-[#003366]/10 via-teal-500/10 to-emerald-500/10 px-3 py-1.5 text-xs font-medium text-[#003366] md:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              {label("AI-assisted", "مدعوم بالذكاء الاصطناعي")}
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
