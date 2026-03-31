"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { NAV_ITEMS } from "@/lib/config/navigation";
import { ROLES, roleAllowed, type RoleId } from "@/lib/config/roles";
import { employeesForTenant } from "@/lib/data/dummy";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "matrix" as const, en: "Access matrix", ar: "مصفوفة الصلاحيات" },
  { id: "assign" as const, en: "Assign to employees", ar: "تعيين للموظفين" },
];

/** Demo mapping employee → role (super admin can change in real product). */
const DEMO_ASSIGNMENTS: Record<string, RoleId> = {
  e1: "company_super_admin",
  e2: "hiring_manager",
  e3: "hr_admin",
};

export default function RolesPage() {
  const { label, tenantId } = useAppSettings();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("matrix");
  const items = NAV_ITEMS.filter((n) => !n.badge);
  const people = employeesForTenant(tenantId);

  const matrixRoles = useMemo(
    () => ROLES.filter((r) => r.id !== "platform_manager"),
    []
  );

  return (
    <div>
      <PageHeader
        titleEn="Roles & assignments"
        titleAr="الأدوار والتعيين"
        descriptionEn="Company super admin defines who can open Recruitment vs HR suite screens. Platform managers operate at tenant level separately."
        descriptionAr="مسؤول الشركة يحدد من يصل لشاشات التوظيف مقابل حزمة الموارد. مدير المنصة يعمل على مستوى المستأجرين."
      />

      <div className="mb-6 rounded-2xl border border-[#003366]/15 bg-gradient-to-r from-[#003366]/6 to-teal-500/10 px-4 py-3 text-sm text-slate-700">
        <p className="font-medium text-[#003366]">
          {label("Two different things", "أمران مختلفان")}
        </p>
        <p className="mt-1 text-slate-600">
          {label(
            "The matrix below is the target access model for your company (no “platform manager” column — that lives on the operator console). Current session role is shown in the context bar.",
            "الجدول أدناه هو نموذج الصلاحيات المستهدف للشركة (دون عمود «مدير المنصة» — ذلك في واجهة المشغّل). الدور الحالي للجلسة يظهر في شريط السياق.",
          )}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition",
              tab === t.id
                ? "bg-gradient-to-r from-[#003366] to-teal-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-100/80"
            )}
          >
            {label(t.en, t.ar)}
          </button>
        ))}
      </div>

      {tab === "matrix" ? (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm rtl:text-right">
            <thead className="border-b border-slate-100 bg-gradient-to-r from-[#003366]/8 to-teal-500/10 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="sticky start-0 z-10 bg-[#f0ebe3] px-4 py-3">
                  {label("Area", "المنطقة")}
                </th>
                {matrixRoles.map((r) => (
                  <th key={r.id} className="px-3 py-3 text-center">
                    {label(r.labelEn, r.labelAr)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-teal-50/20">
                  <td className="sticky start-0 z-10 bg-[var(--card)] px-4 py-3 font-medium text-slate-800">
                    <span className="text-slate-500">{item.section} · </span>
                    {label(item.labelEn, item.labelAr)}
                  </td>
                  {matrixRoles.map((r) => {
                    const ok = roleAllowed(r.id, item.roles, {
                      loginScope: "company",
                    });
                    return (
                      <td key={r.id} className="px-3 py-3 text-center">
                        <span
                          className={
                            ok
                              ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                              : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                          }
                        >
                          {ok ? "✓" : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="border-b border-[var(--border)] bg-amber-50/50 px-5 py-3 text-sm text-amber-950/90">
            {label(
              "Prototype: edit UI only. In production, super admin publishes roles to IdP / Takamel directory.",
              "نموذج: الواجهة فقط. في الإنتاج ينشر المسؤول الأعلى الأدوار لدليل المنصة.",
            )}
          </div>
          <table className="w-full text-left text-sm rtl:text-right">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">{label("Employee", "الموظف")}</th>
                <th className="px-4 py-3">{label("Title", "المسمى")}</th>
                <th className="px-4 py-3">{label("Assigned role", "الدور المعيّن")}</th>
                <th className="px-4 py-3">{label("Action", "إجراء")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {people.map((e) => {
                const rid = DEMO_ASSIGNMENTS[e.id] ?? "employee";
                const rn = ROLES.find((r) => r.id === rid);
                return (
                  <tr key={e.id} className="hover:bg-teal-50/20">
                    <td className="px-4 py-4 font-medium text-slate-900">{e.name}</td>
                    <td className="px-4 py-4 text-slate-600">{e.title}</td>
                    <td className="px-4 py-4">
                      <Badge variant="teal">{rn ? label(rn.labelEn, rn.labelAr) : rid}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="text-sm font-medium text-teal-700 hover:underline"
                      >
                        {label("Change role", "تغيير الدور")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
