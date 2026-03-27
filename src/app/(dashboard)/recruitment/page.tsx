"use client";

import Link from "next/link";
import { MapPin, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobsForTenant } from "@/lib/data/dummy";

export default function RecruitmentPage() {
  const { tenantId, label } = useAppSettings();
  const jobs = jobsForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Recruitment"
        titleAr="التوظيف"
        descriptionEn="Workable-style requisitions with a clearer pipeline and AI-enriched candidate context (dummy data)."
        descriptionAr="طلبات توظيف بمسار أوضح وسياق مرشحين معزّز بالذكاء الاصطناعي (بيانات تجريبية)."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Button className="rounded-xl">
          <Plus className="h-4 w-4" />
          {label("New job", "وظيفة جديدة")}
        </Button>
        <Button variant="outline" className="rounded-xl">
          {label("Talent pool", "مجمع المواهب")}
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{label("Role", "المسمى")}</th>
              <th className="px-4 py-3">{label("Location", "الموقع")}</th>
              <th className="px-4 py-3">{label("Type", "النوع")}</th>
              <th className="px-4 py-3">{label("Pipeline", "المسار")}</th>
              <th className="px-4 py-3">{label("Status", "الحالة")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4">
                  <Link
                    href={`/recruitment/jobs/${job.id}`}
                    className="font-semibold text-[#003366] hover:underline"
                  >
                    {job.title}
                  </Link>
                  <p className="text-xs text-slate-500">{job.department}</p>
                </td>
                <td className="px-4 py-4 text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Badge variant="neutral">{job.type}</Badge>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 text-slate-700">
                    <Users className="h-4 w-4 text-teal-600" />
                    {job.applicants}{" "}
                    {label("applicants", "مرشح")}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant={
                      job.status === "Published"
                        ? "success"
                        : job.status === "Draft"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {job.status}
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
