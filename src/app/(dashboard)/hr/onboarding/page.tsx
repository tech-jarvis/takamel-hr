"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { onboardingForTenant } from "@/lib/data/dummy";

export default function OnboardingPage() {
  const { tenantId, label } = useAppSettings();
  const rows = onboardingForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Onboarding"
        titleAr="الانضمام"
        descriptionEn="Journeys, owners, and progress — tied to this tenant. Click-through flows can plug in later."
        descriptionAr="رحلات ومسؤولون وتقدم — مرتبطون بهذا المستأجر."
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{label("New hire", "الموظف الجديد")}</th>
              <th className="px-4 py-3">{label("Role", "المسمى")}</th>
              <th className="px-4 py-3">{label("Start", "البداية")}</th>
              <th className="px-4 py-3">{label("Owner", "المسؤول")}</th>
              <th className="px-4 py-3">{label("Progress", "التقدم")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4 font-medium text-slate-900">{r.name}</td>
                <td className="px-4 py-4 text-slate-600">{r.role}</td>
                <td className="px-4 py-4 text-slate-600">{r.startDate}</td>
                <td className="px-4 py-4 text-slate-600">{r.owner}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#003366] to-[#2ECC71]"
                        style={{ width: `${r.progress}%` }}
                      />
                    </div>
                    <Badge variant="teal">{r.progress}%</Badge>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
