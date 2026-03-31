"use client";

import { ArrowRight, FileText, Mail, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const PIPELINE = [
  { key: "applied", en: "Applied", ar: "تقديم", active: false },
  { key: "screen", en: "AI screen", ar: "فرز ذكاء", active: false },
  { key: "interview", en: "Interviews", ar: "مقابلات", active: false },
  { key: "offer", en: "Offer", ar: "عرض", active: true },
  { key: "handoff", en: "HR handoff", ar: "تسليم HR", active: true },
  { key: "employee", en: "Active employee", ar: "موظف نشط", active: false },
] as const;

export default function RecruitmentHrHandoffPage() {
  const router = useRouter();
  const { label } = useAppSettings();

  return (
    <div>
      <PageHeader
        titleEn="Handoff to HR suite"
        titleAr="التسليم لحزمة الموارد البشرية"
        descriptionEn="Single view of how a hire moves from recruitment into HR operations — data, tasks, and ownership. Demo state only."
        descriptionAr="رؤية واحدة لانتقال التعيين من التوظيف إلى عمليات الموارد البشرية — بيانات ومهام ومسؤوليات. حالة تجريبية."
      />

      <div className="mb-10 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label("Candidate journey", "مسار المرشح")}
        </p>
        <div className="flex min-w-[640px] items-center gap-1">
          {PIPELINE.map((p, i) => (
            <div key={p.key} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex flex-1 flex-col items-center rounded-xl px-2 py-3 text-center text-xs font-medium sm:text-sm",
                  p.active
                    ? "bg-gradient-to-br from-amber-100 to-teal-50 text-[#003366] ring-2 ring-amber-300/60"
                    : "bg-slate-50 text-slate-500"
                )}
              >
                <span>{label(p.en, p.ar)}</span>
              </div>
              {i < PIPELINE.length - 1 ? (
                <ArrowRight className="mx-0.5 h-4 w-4 shrink-0 text-slate-300 rtl:rotate-180" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/50 to-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">
                {label("Recruitment record", "سجل التوظيف")}
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#003366]">Sara Al-Mutairi</h2>
              <p className="text-sm text-slate-600">
                {label("Senior Product Analyst · Riyadh", "محلل منتج أول · الرياض")}
              </p>
            </div>
            <Badge variant="gold">{label("Offer accepted", "تم قبول العرض")}</Badge>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-700" />
              sara.mutairi@email.sa
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-700" />
              {label("CV + screening score 0.87", "السيرة + درجة الفرز ٠٫٨٧")}
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-700" />
              {label("Hiring manager: Fahad Al-Otaibi", "مدير التوظيف: فهد العتيبي")}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button" variant="outline" className="rounded-xl text-sm" disabled>
              {label("Open in pipeline", "فتح في المسار")}
            </Button>
            <Link href="/recruitment/jobs">
              <Button type="button" variant="ghost" className="rounded-xl text-sm">
                {label("Back to jobs", "العودة للوظائف")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-200/70 bg-gradient-to-b from-teal-50/40 to-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-teal-900">
            <UserCheck className="h-6 w-6" />
            <h2 className="text-lg font-semibold text-[#003366]">
              {label("HR operations package", "حزمة عمليات الموارد البشرية")}
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {label(
              "What HR receives when recruitment marks “hired” — no duplicate typing.",
              "ما تستلمه الموارد البشرية عند وضع علامة «تم التعيين» — دون إدخال مكرر.",
            )}
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              {
                en: "Create pending employee & org placement",
                ar: "إنشاء موظف معلق والموضع التنظيمي",
                done: true,
              },
              { en: "Sync documents to employee file", ar: "مزامنة المستندات لملف الموظف", done: false },
              { en: "Trigger onboarding workflow & tasks", ar: "تشغيل سير الانضمام والمهام", done: false },
              { en: "Provision email / groups (IT handoff)", ar: "تجهيز البريد والمجموعات (تسليم تقنية)", done: false },
              { en: "Notify payroll when eligible", ar: "إشعار الرواتب عند الأهلية", done: false },
            ].map((row) => (
              <li
                key={row.en}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white/80 px-3 py-2.5"
              >
                <span className="text-slate-800">{label(row.en, row.ar)}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                    row.done ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {row.done ? label("Ready", "جاهز") : label("Queued", "في الانتظار")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-dashed border-teal-300/80 bg-teal-50/30 p-3 text-xs text-teal-950/90">
            {label(
              "Coming: webhook from recruitment → HR queue, SLA timers, and audit who approved the hire.",
              "قادم: ربط من التوظيف لطابور الموارد البشرية ومؤقتات SLA وتدقيق من وافق على التعيين.",
            )}
          </div>
          <Button
            type="button"
            className="mt-4 rounded-xl"
            onClick={() => router.push("/hr/onboarding")}
          >
            {label("Open onboarding (admin)", "فتح الانضمام (إداري)")}
          </Button>
        </div>
      </div>
    </div>
  );
}
