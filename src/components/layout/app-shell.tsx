"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  NAV_ITEMS,
  SECTION_ACCENTS,
  SECTION_LABELS,
  SECTION_ORDER,
  type NavSection,
} from "@/lib/config/navigation";
import { TENANTS, tenantById } from "@/lib/config/tenants";
import { ROLES, roleAllowed } from "@/lib/config/roles";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { ModuleSwitcher } from "@/components/layout/module-switcher";
import { cn } from "@/lib/utils/cn";

/** Avoid parent path matching child (e.g. /recruitment vs /recruitment/jobs). */
function navLinkActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  const parentsExact = ["/dashboard", "/recruitment", "/hrms/home", "/security", "/roadmap"];
  if (parentsExact.includes(href)) return false;
  return pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, session, updateRole } = useAuth();
  const { tenantId, setTenantId, roleId, locale, setLocale, label } =
    useAppSettings();
  const tenant = tenantById(tenantId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);

  const scope = session?.scope ?? "company";
  const navRoleId = session?.roleId ?? roleId;

  useEffect(() => {
    if (!session) return;
    if (session.scope === "platform" && session.roleId !== "platform_manager") {
      updateRole("platform_manager");
    } else if (
      session.scope === "company" &&
      session.roleId === "platform_manager"
    ) {
      updateRole("company_super_admin");
    }
  }, [session, updateRole]);

  const navFiltered = useMemo(
    () =>
      NAV_ITEMS.filter((item) =>
        roleAllowed(navRoleId, item.roles, { loginScope: scope })
      ),
    [navRoleId, scope]
  );

  const bySection = useMemo(() => {
    const m = new Map<NavSection, typeof NAV_ITEMS>();
    SECTION_ORDER.forEach((s) => m.set(s, []));
    navFiltered.forEach((item) => {
      m.get(item.section)?.push(item);
    });
    return m;
  }, [navFiltered]);

  const visibleModuleSections = useMemo(
    () =>
      SECTION_ORDER.filter((s) => (bySection.get(s) ?? []).length > 0),
    [bySection]
  );

  const accent = tenant.accentTeal ?? "#00A3A3";

  return (
    <div className="flex min-h-screen bg-[var(--surface)] text-slate-900">
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
          "fixed inset-y-0 start-0 z-50 flex w-72 flex-col border-e border-[var(--border)] bg-[var(--card)] shadow-md transition-transform lg:static lg:translate-x-0",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-[var(--border)] bg-gradient-to-r from-[#003366]/5 to-teal-500/5 px-4">
          <Image
            src="/logo.png"
            alt="Takamel HR"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-contain ring-1 ring-[#C5A059]/30"
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
            className="rounded-lg p-2 text-slate-500 hover:bg-white/60 lg:hidden"
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
            const acc = SECTION_ACCENTS[section];
            return (
              <div key={section} className="mb-7">
                <div className="mb-2 flex items-start gap-2 px-2">
                  <span className={cn("mt-1 h-8 w-1 shrink-0 rounded-full", acc.bar)} />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#003366]/80">
                      {label(sl.labelEn, sl.labelAr)}
                    </p>
                    {sl.subtitleEn ? (
                      <p className="mt-0.5 text-[10px] leading-tight text-slate-500">
                        {label(sl.subtitleEn, sl.subtitleAr ?? sl.subtitleEn)}
                      </p>
                    ) : null}
                  </div>
                </div>
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active = navLinkActive(pathname, item.href);
                    const isRecruitment = section === "recruitment";
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                            active
                              ? "text-white shadow-md"
                              : isRecruitment
                                ? "text-slate-700 hover:bg-amber-50/90"
                                : section === "hr_operations"
                                  ? "text-slate-700 hover:bg-teal-50/60"
                                  : "text-slate-600 hover:bg-slate-50"
                          )}
                          style={
                            active
                              ? {
                                  background: isRecruitment
                                    ? `linear-gradient(135deg, #7c5a1c 0%, ${accent} 50%, #2ECC71 100%)`
                                    : `linear-gradient(135deg, #003366 0%, ${accent} 55%, #2ECC71 100%)`,
                                }
                              : undefined
                          }
                        >
                          <span className="leading-snug">
                            {label(item.labelEn, item.labelAr)}
                          </span>
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

        <div className="border-t border-[var(--border)] bg-slate-50/80 p-3 text-xs text-slate-600">
          <p className="font-medium text-[#003366]">
            {label("Scope", "النطاق")}:{" "}
            <span className="text-slate-700">
              {scope === "platform"
                ? label("Platform", "منصة")
                : label("Company", "شركة")}
            </span>
          </p>
          <p className="mt-1 text-slate-500">
            {scope === "company"
              ? label(
                  "One organization per session — use Security to review.",
                  "مؤسسة واحدة لكل جلسة — راجع الأمان للتفاصيل."
                )
              : label(
                  "Switch tenant to preview any customer company.",
                  "بدّل المستأجر لمعاينة أي شركة عميل."
                )}
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center gap-3 border-b border-[var(--border)] bg-[var(--card)]/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/85">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative">
            {scope === "company" ? (
              <div
                className="flex max-w-[240px] items-center gap-2 rounded-xl border border-teal-200/80 bg-teal-50/40 px-3 py-2 text-sm shadow-sm"
                title={label(
                  "Organization is fixed for company sign-in.",
                  "المؤسسة مثبتة لتسجيل دخول الشركة."
                )}
              >
                <Building2 className="h-4 w-4 shrink-0 text-[#003366]" />
                <span className="truncate font-medium text-slate-800">
                  {label(tenant.nameEn, tenant.nameAr)}
                </span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setTenantOpen(!tenantOpen);
                  }}
                  className="flex max-w-[220px] items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-left text-sm shadow-sm hover:bg-slate-50/80"
                >
                  <Building2 className="h-4 w-4 shrink-0 text-[#003366]" />
                  <span className="truncate font-medium text-slate-800">
                    {label(tenant.nameEn, tenant.nameAr)}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                </button>
                {tenantOpen ? (
                  <div className="absolute start-0 top-full z-50 mt-1 w-64 rounded-xl border border-[var(--border)] bg-white py-1 shadow-lg">
                    {TENANTS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setTenantId(t.id);
                          setTenantOpen(false);
                        }}
                        className={cn(
                          "flex w-full flex-col items-start px-3 py-2 text-start text-sm hover:bg-teal-50/80",
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
              </>
            )}
          </div>

          <div className="ms-auto flex flex-wrap items-center gap-2">
            {session?.email ? (
              <span
                className="hidden max-w-[160px] truncate text-xs text-slate-500 md:inline"
                title={session.email}
              >
                {session.email}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/login");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              title={label("Sign out", "تسجيل الخروج")}
            >
              <LogOut className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">{label("Sign out", "خروج")}</span>
            </button>
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Globe className="h-4 w-4 text-teal-600" />
              {locale === "en" ? "العربية" : "English"}
            </button>
            <span className="hidden items-center gap-1 rounded-full border border-[#C5A059]/30 bg-gradient-to-r from-[#003366]/8 via-teal-500/10 to-emerald-500/10 px-3 py-1.5 text-xs font-medium text-[#003366] md:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              {label("Saudi-ready HR", "موارد بشرية جاهزة للسعودية")}
            </span>
          </div>
        </header>

        <ModuleSwitcher
          sections={visibleModuleSections}
          onNavigate={() => setMobileOpen(false)}
        />

        <div className="border-b border-[var(--border)] bg-gradient-to-r from-[#003366]/5 via-teal-500/10 to-emerald-500/10 px-4 py-2 text-xs text-slate-700 md:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              <strong>{label("Company", "الشركة")}:</strong>{" "}
              {label(tenant.nameEn, tenant.nameAr)}
            </span>
            <span>
              <strong>{label("Scope", "النطاق")}:</strong>{" "}
              {scope === "platform"
                ? label("Platform", "المنصة")
                : label("Company", "الشركة")}
            </span>
            <span>
              <strong>{label("Role", "الدور")}:</strong>{" "}
              {label(
                ROLES.find((r) => r.id === navRoleId)?.labelEn ?? navRoleId,
                ROLES.find((r) => r.id === navRoleId)?.labelAr ?? navRoleId
              )}
            </span>
          </div>
        </div>

        <main className="takamel-main flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
