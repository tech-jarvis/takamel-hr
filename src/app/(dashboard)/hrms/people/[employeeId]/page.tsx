"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { employeeById, employeesForTenant } from "@/lib/data/dummy";

export default function HrmsPersonPage() {
  const params = useParams();
  const id = String(params.employeeId);
  const { tenantId, label } = useAppSettings();
  const person = employeeById(tenantId, id);
  const all = employeesForTenant(tenantId);
  const manager = person?.managerId
    ? employeeById(tenantId, person.managerId)
    : null;

  if (!person) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">
          {label("Profile not found.", "الملف غير موجود.")}
        </p>
        <Link href="/hrms/people" className="mt-4 inline-block text-teal-700 hover:underline">
          {label("Back to people", "العودة للأشخاص")}
        </Link>
      </div>
    );
  }

  const reports = all.filter((e) => e.managerId === person.id);

  return (
    <div>
      <Link
        href="/hrms/people"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {label("People", "الأشخاص")}
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-1/3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-2xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, hsl(${person.avatarHue}, 55%, 42%), hsl(${person.avatarHue}, 60%, 55%))`,
              }}
            >
              {person.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h1 className="mt-4 text-center text-xl font-bold text-[#003366]">
              {person.name}
            </h1>
            <p className="text-center text-sm text-slate-600">{person.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-600" />
                {person.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" />
                {person.location}
              </li>
              <li>
                <Badge variant="neutral">{person.department}</Badge>
              </li>
              <li>
                {label("Start date", "تاريخ البدء")}: {person.startDate}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#003366]">
              {label("Manager", "المدير المباشر")}
            </h2>
            {manager ? (
              <Link
                href={`/hrms/people/${manager.id}`}
                className="mt-3 inline-block font-medium text-teal-700 hover:underline"
              >
                {manager.name} — {manager.title}
              </Link>
            ) : (
              <p className="mt-3 text-slate-500">
                {label("Executive / no manager in tree", "تنفيذي / لا مدير في الشجرة")}
              </p>
            )}
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#003366]">
              {label("Direct reports", "المرؤوسون المباشرون")}
            </h2>
            {reports.length === 0 ? (
              <p className="mt-3 text-slate-500">
                {label("None in prototype data.", "لا يوجد في البيانات التجريبية.")}
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {reports.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/hrms/people/${r.id}`}
                      className="font-medium text-teal-700 hover:underline"
                    >
                      {r.name}
                    </Link>
                    <span className="text-slate-500"> — {r.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-2xl border border-slate-200 border-dashed bg-slate-50/50 p-6">
            <h2 className="text-lg font-semibold text-[#003366]">
              {label("Documents & access", "المستندات والصلاحيات")}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {label(
                "Contract, Iqama, role assignments — placeholder for the full HRMS file cabinet.",
                "عقد، إقامة، أدوار — مساحة لمستودع المستندات الكامل."
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
