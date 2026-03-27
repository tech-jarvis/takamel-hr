"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { NAV_ITEMS } from "@/lib/config/navigation";
import { ROLES, roleAllowed } from "@/lib/config/roles";

const MATRIX_IDS = [
  "ai",
  "recruitment",
  "onboarding",
  "offboarding",
  "employees",
  "org",
  "tasks",
  "reports",
  "roles",
] as const;

export default function RolesPage() {
  const { label } = useAppSettings();
  const items = NAV_ITEMS.filter((n) =>
    MATRIX_IDS.includes(n.id as (typeof MATRIX_IDS)[number])
  );

  return (
    <div>
      <PageHeader
        titleEn="Roles & access"
        titleAr="الأدوار والصلاحيات"
        descriptionEn="Matrix shows which prototype areas each role can open. Platform admin bypasses restrictions."
        descriptionAr="الجدول يوضح من يصل لأي منطقة. مسؤول المنصة يتجاوز القيود."
      />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="sticky start-0 z-10 bg-slate-50 px-4 py-3">
                {label("Area", "المنطقة")}
              </th>
              {ROLES.map((r) => (
                <th key={r.id} className="px-3 py-3 text-center">
                  {label(r.labelEn, r.labelAr)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="sticky start-0 z-10 bg-white px-4 py-3 font-medium text-slate-800">
                  {label(item.labelEn, item.labelAr)}
                </td>
                {ROLES.map((r) => {
                  const ok = roleAllowed(r.id, item.roles);
                  return (
                    <td key={r.id} className="px-3 py-3 text-center">
                      <span
                        className={
                          ok
                            ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                            : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                        }
                        title={ok ? "Allowed" : "Hidden"}
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
    </div>
  );
}
