"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { employeesForTenant } from "@/lib/data/dummy";

export default function HrmsPeoplePage() {
  const { tenantId, roleId, label } = useAppSettings();
  const people = employeesForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="People"
        titleAr="الأشخاص"
        descriptionEn="Company directory — profiles, org links, and future permissions."
        descriptionAr="دليل الشركة — الملفات والهيكل والصلاحيات لاحقاً."
      />

      {roleId === "employee" ? (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
          {label(
            "Read-only directory in this prototype.",
            "دليل للقراءة فقط في هذا النموذج."
          )}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((e) => (
          <Link
            key={e.id}
            href={`/hrms/people/${e.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, hsl(${e.avatarHue}, 55%, 42%), hsl(${e.avatarHue}, 60%, 55%))`,
                }}
              >
                {e.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#003366]">{e.name}</p>
                <p className="text-sm text-slate-600">{e.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="neutral">{e.department}</Badge>
                  <Badge variant="teal">{e.location}</Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
