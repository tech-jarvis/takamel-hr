"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ptoForTenant } from "@/lib/data/dummy";

export default function HrmsPtoPage() {
  const { tenantId, label } = useAppSettings();
  const rows = ptoForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Time off (PTO)"
        titleAr="الإجازات"
        descriptionEn="Request, approve, and track balances — policies hook in from admin settings later."
        descriptionAr="طلب وموافقة وتتبع الأرصدة — السياسات تربط لاحقاً من الإعدادات."
      />

      <div className="mb-6">
        <Button className="rounded-xl">{label("New request", "طلب جديد")}</Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{label("Employee", "الموظف")}</th>
              <th className="px-4 py-3">{label("Type", "النوع")}</th>
              <th className="px-4 py-3">{label("Dates", "التواريخ")}</th>
              <th className="px-4 py-3">{label("Days", "أيام")}</th>
              <th className="px-4 py-3">{label("Status", "الحالة")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4 font-medium text-slate-900">{r.employeeName}</td>
                <td className="px-4 py-4 text-slate-600">{r.type}</td>
                <td className="px-4 py-4 text-slate-600">
                  {r.start} – {r.end}
                </td>
                <td className="px-4 py-4">{r.days}</td>
                <td className="px-4 py-4">
                  <Badge
                    variant={
                      r.status === "Approved"
                        ? "success"
                        : r.status === "Pending"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
