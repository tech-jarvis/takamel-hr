"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { candidatesForJob, jobById } from "@/lib/data/dummy";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = String(params.jobId);
  const { tenantId, label } = useAppSettings();
  const job = jobById(tenantId, jobId);
  const candidates = candidatesForJob(tenantId, jobId);

  if (!job) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">{label("Job not found for this tenant.", "الوظيفة غير موجودة لهذا المستأجر.")}</p>
        <Link href="/recruitment" className="mt-4 inline-block text-teal-700 hover:underline">
          {label("Back to jobs", "العودة للوظائف")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/recruitment"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {label("All jobs", "كل الوظائف")}
      </Link>

      <PageHeader
        titleEn={job.title}
        titleAr={job.title}
        descriptionEn={`${job.department} · ${job.location} · ${job.type}`}
        descriptionAr={`${job.department} · ${job.location} · ${job.type}`}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {job.pipeline.map((stage) => (
          <div
            key={stage.stage}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-[#003366]">{stage.count}</p>
            <p className="text-sm text-slate-600">{stage.stage}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#003366]">
            {label("Candidates", "المرشحون")}
          </h2>
          <p className="text-sm text-slate-500">
            {label("AI summaries are illustrative only.", "ملخصات الذكاء للتوضيح فقط.")}
          </p>
        </div>
        <ul className="divide-y divide-slate-100">
          {candidates.length === 0 ? (
            <li className="px-6 py-8 text-center text-slate-500">
              {label("No candidates in prototype for this job.", "لا مرشحين في النموذج لهذه الوظيفة.")}
            </li>
          ) : (
            candidates.map((c) => (
              <li key={c.id} className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500">
                    {c.source} · {c.stage}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm text-slate-600">{c.aiSummary}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                  <Badge variant="teal" className="gap-1">
                    <Sparkles className="h-3 w-3 text-[#C5A059]" />
                    {label("Match", "التطابق")} {c.score}%
                  </Badge>
                  <button
                    type="button"
                    className="text-sm font-medium text-teal-700 hover:underline"
                  >
                    {label("Move stage", "تغيير المرحلة")}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
