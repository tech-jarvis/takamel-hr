"use client";

import { Building2, Globe, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { tenantById } from "@/lib/config/tenants";

export default function OrganizationPage() {
  const { tenantId, label } = useAppSettings();
  const { session } = useAuth();
  const tenant = tenantById(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Organization"
        titleAr="المؤسسة"
        descriptionEn="Single source of truth for company profile, ownership, and admin controls."
        descriptionAr="مصدر موحّد لبيانات الشركة والملكية وضوابط الإدارة."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <Building2 className="h-7 w-7 text-[#003366]" />
            <div>
              <h2 className="text-lg font-semibold text-[#003366]">
                {label(tenant.nameEn, tenant.nameAr)}
              </h2>
              <p className="text-sm text-slate-500">
                {tenant.slug} · {tenant.country} · {tenant.industry}
              </p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                {label("Primary domain", "النطاق الأساسي")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">{tenant.slug}.takamel.sa</dd>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                {label("Compliance profile", "ملف الامتثال")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">
                {label("Saudi baseline (demo)", "خط أساس سعودي (تجريبي)")}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                {label("Owner account", "حساب المالك")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">{session?.email ?? "—"}</dd>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                {label("Data isolation", "عزل البيانات")}
              </dt>
              <dd className="mt-1 font-medium text-emerald-700">
                {label("Tenant scoped", "مستوى المستأجر")}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#003366]">
            {label("Admin checklist", "قائمة الإدارة")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-800">
              <Users className="h-4 w-4" />
              {label("Define roles and permissions", "تحديد الأدوار والصلاحيات")}
            </li>
            <li className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
              <Globe className="h-4 w-4" />
              {label("Set SSO / Nafath policy (roadmap)", "سياسة SSO / نفاذ (قادم)")}
            </li>
            <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-slate-600">
              {label(
                "Prototype: this page is intentionally focused to avoid overlap with HR operations screens.",
                "النموذج: هذه الصفحة مركزة لتجنب التداخل مع شاشات عمليات الموارد البشرية."
              )}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
