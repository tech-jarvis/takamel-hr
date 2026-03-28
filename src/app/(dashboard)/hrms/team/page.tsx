"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { demoCurrentEmployee, teamForTenant } from "@/lib/data/dummy";

export default function HrmsTeamPage() {
  const { tenantId, label } = useAppSettings();
  const me = demoCurrentEmployee(tenantId);
  const team = teamForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Team"
        titleAr="الفريق"
        descriptionEn="Manager, peers, and direct reports inferred from the org tree (demo rules)."
        descriptionAr="المدير والأقران والمرؤوسون من الشجرة التنظيمية (قواعد تجريبية)."
      />

      {me ? (
        <p className="mb-6 text-sm text-slate-600">
          {label("Viewing as", "عرض كـ")}: <strong>{me.name}</strong>
        </p>
      ) : null}

      {team.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <Users className="h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">
            {label("No teammates in prototype graph for this tenant.", "لا أعضاء فريق في البيانات التجريبية.")}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((e) => (
            <Link
              key={e.id}
              href={`/hrms/people/${e.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200"
            >
              <p className="font-semibold text-[#003366]">{e.name}</p>
              <p className="text-sm text-slate-600">{e.title}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="neutral">{e.department}</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
