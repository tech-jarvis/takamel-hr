"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { employeesForTenant } from "@/lib/data/dummy";
import type { Employee } from "@/lib/data/dummy";

export default function HrmsOrgChartPage() {
  const { tenantId, label } = useAppSettings();
  const people = employeesForTenant(tenantId);
  const byManager = new Map<string | null, Employee[]>();
  people.forEach((e) => {
    const k = e.managerId;
    if (!byManager.has(k)) byManager.set(k, []);
    byManager.get(k)!.push(e);
  });
  const roots = byManager.get(null) ?? [];

  return (
    <div>
      <PageHeader
        titleEn="Org chart"
        titleAr="الهيكل التنظيمي"
        descriptionEn="Reporting lines — links open people profiles."
        descriptionAr="خطوط الإشراف — الروابط تفتح ملفات الأشخاص."
      />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ul className="space-y-2">
          {roots.length === 0 ? (
            <li className="text-slate-500">
              {label("No root roles for this tenant.", "لا جذر لهذا المستأجر.")}
            </li>
          ) : (
            roots.map((r) => (
              <OrgNode key={r.id} employee={r} byManager={byManager} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function OrgNode({
  employee,
  byManager,
}: {
  employee: Employee;
  byManager: Map<string | null, Employee[]>;
}) {
  const children = byManager.get(employee.id) ?? [];
  return (
    <li className="ms-4 border-s-2 border-teal-100 ps-4 rtl:border-e-2 rtl:border-s-0 rtl:pe-4 rtl:ps-0">
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
        <Link
          href={`/hrms/people/${employee.id}`}
          className="font-semibold text-[#003366] hover:underline"
        >
          {employee.name}
        </Link>
        <p className="text-sm text-slate-600">{employee.title}</p>
        <p className="text-xs text-slate-500">{employee.department}</p>
      </div>
      {children.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {children.map((c) => (
            <OrgNode key={c.id} employee={c} byManager={byManager} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
