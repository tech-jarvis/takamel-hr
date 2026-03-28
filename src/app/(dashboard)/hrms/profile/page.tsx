"use client";

import { Mail, MapPin, Phone, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoCurrentEmployee, employeeById } from "@/lib/data/dummy";

export default function HrmsProfilePage() {
  const { tenantId, label } = useAppSettings();
  const me = demoCurrentEmployee(tenantId);
  const manager = me?.managerId ? employeeById(tenantId, me.managerId) : null;

  if (!me) {
    return (
      <p className="text-slate-500">
        {label("No demo profile for this tenant.", "لا ملف تجريبي لهذا المستأجر.")}
      </p>
    );
  }

  return (
    <div>
      <PageHeader
        titleEn="My profile"
        titleAr="ملفي الشخصي"
        descriptionEn="Self-service profile — edit flows are UI-only in this prototype."
        descriptionAr="الملف الشخصي للموظف — التعديل واجهة فقط في النموذج."
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:w-80">
          <div
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl text-3xl font-bold text-white"
            style={{
              background: `linear-gradient(135deg, hsl(${me.avatarHue}, 55%, 42%), hsl(${me.avatarHue}, 60%, 55%))`,
            }}
          >
            {me.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </div>
          <h1 className="mt-4 text-center text-xl font-bold text-[#003366]">{me.name}</h1>
          <p className="text-center text-slate-600">{me.title}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="neutral">{me.department}</Badge>
            <Badge variant="teal">{me.location}</Badge>
          </div>
          <Button className="mt-6 w-full rounded-xl">{label("Edit profile", "تعديل الملف")}</Button>
        </div>

        <div className="flex-1 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
              <Mail className="h-5 w-5 text-teal-600" />
              {label("Contact", "التواصل")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                {me.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                +966 50 *** **{me.id.slice(-2)}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {me.location}
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
              <Shield className="h-5 w-5 text-[#C5A059]" />
              {label("Work", "العمل")}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              {label("Start date", "تاريخ البدء")}: <strong>{me.startDate}</strong>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {label("Manager", "المدير")}:{" "}
              <strong>{manager ? manager.name : "—"}</strong>
            </p>
          </section>

          <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6">
            <p className="text-sm text-slate-600">
              {label(
                "National ID / Iqama and bank details would appear here with masked values and document upload.",
                "تظهر الهوية والإقامة والبيانات البنكية هنا بقيم مخفية ورفع مستندات."
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
