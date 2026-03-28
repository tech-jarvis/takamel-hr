"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";

export function RecruitmentModulePlaceholder({
  titleEn,
  titleAr,
  introEn,
  introAr,
  checklist,
}: {
  titleEn: string;
  titleAr: string;
  introEn: string;
  introAr: string;
  checklist: { en: string; ar: string; done: boolean }[];
}) {
  const { label } = useAppSettings();

  return (
    <div>
      <Link
        href="/recruitment"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {label("Recruitment hub", "مركز التوظيف")}
      </Link>
      <PageHeader titleEn={titleEn} titleAr={titleAr} descriptionEn={introEn} descriptionAr={introAr} />
      <div className="mt-8 rounded-2xl border border-amber-200/50 bg-gradient-to-b from-amber-50/50 to-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900/80">
          {label("Capability checklist", "قائمة القدرات")}
        </h2>
        <ul className="mt-4 space-y-3">
          {checklist.map((row, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              {row.done ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
              )}
              <span className={row.done ? "text-slate-500 line-through" : ""}>
                {label(row.en, row.ar)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="gold">{label("Recruitment module", "وحدة التوظيف")}</Badge>
          <Badge variant="teal">{label("Not HR suite", "ليس حزمة الموارد فقط")}</Badge>
        </div>
      </div>
    </div>
  );
}
