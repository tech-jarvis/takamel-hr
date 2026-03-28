"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TENANTS } from "@/lib/config/tenants";

export default function PlatformCompaniesPage() {
  const { label, tenantId, setTenantId } = useAppSettings();
  const [created, setCreated] = useState<string[]>([]);

  function createDemo() {
    const name = `Demo Co ${created.length + 1}`;
    setCreated((c) => [...c, name]);
  }

  return (
    <div>
      <PageHeader
        titleEn="Companies"
        titleAr="الشركات"
        descriptionEn="Register a new organization on the platform. Prototype: mock create + existing demo tenants."
        descriptionAr="تسجيل مؤسسة جديدة على المنصة. النموذج: إنشاء وهمي + مستأجرون تجريبيون."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Button type="button" className="rounded-xl" onClick={createDemo}>
          <Plus className="h-4 w-4" />
          {label("New company", "شركة جديدة")}
        </Button>
      </div>

      {created.length > 0 ? (
        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-900">
          {label("Queued (UI only):", "في الانتظار (واجهة فقط):")}{" "}
          {created.join(", ")}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-violet-100 bg-violet-50/50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">{label("Organization", "المؤسسة")}</th>
              <th className="px-4 py-3">{label("Industry", "القطاع")}</th>
              <th className="px-4 py-3">{label("Country", "الدولة")}</th>
              <th className="px-4 py-3">{label("Action", "إجراء")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TENANTS.map((t) => (
              <tr key={t.id} className="hover:bg-violet-50/30">
                <td className="px-4 py-4 font-medium text-slate-900">
                  {label(t.nameEn, t.nameAr)}
                </td>
                <td className="px-4 py-4 text-slate-600">{t.industry}</td>
                <td className="px-4 py-4">
                  <Badge variant="neutral">{t.country}</Badge>
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setTenantId(t.id)}
                    className="text-sm font-medium text-violet-700 hover:underline"
                  >
                    {tenantId === t.id
                      ? label("Active", "نشط")
                      : label("Switch context", "تبديل السياق")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
