"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { offboardingForTenant } from "@/lib/data/dummy";

export default function OffboardingPage() {
  const { tenantId, label } = useAppSettings();
  const rows = offboardingForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Offboarding"
        titleAr="إنهاء الخدمة"
        descriptionEn="Checklists and compliance handoffs — prototype rows only."
        descriptionAr="قوائم تحقق وتسليم امتثال — بيانات تجريبية."
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{label("Employee", "الموظف")}</th>
              <th className="px-4 py-3">{label("Last day", "آخر يوم")}</th>
              <th className="px-4 py-3">{label("Checklist", "قائمة التحقق")}</th>
              <th className="px-4 py-3">{label("Status", "الحالة")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  {label("No offboarding cases for this tenant.", "لا حالات إنهاء لهذا المستأجر.")}
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-4 font-medium text-slate-900">{r.name}</td>
                  <td className="px-4 py-4 text-slate-600">{r.lastDay}</td>
                  <td className="px-4 py-4 text-slate-600">{r.checklist}</td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        r.status === "Complete"
                          ? "success"
                          : r.status === "In progress"
                            ? "teal"
                            : "warning"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
