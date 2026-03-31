"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Briefcase,
  ClipboardList,
  Clock3,
  UserCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { featuresForTenant } from "@/lib/config/features";
import { tenantById } from "@/lib/config/tenants";
import {
  candidatesForTenant,
  jobsForTenant,
  onboardingForTenant,
  tasksForTenant,
} from "@/lib/data/dummy";
import { DeptDonutChart } from "@/components/analytics/dept-donut";
import { HeadcountChart } from "@/components/analytics/headcount-chart";
import { HiresExitsBar } from "@/components/analytics/hires-bar";

export default function DashboardPage() {
  const { tenantId, roleId, label } = useAppSettings();
  const { session } = useAuth();
  const tenant = tenantById(tenantId);
  const jobs = jobsForTenant(tenantId);
  const candidates = candidatesForTenant(tenantId);
  const onboarding = onboardingForTenant(tenantId);
  const tasks = tasksForTenant(tenantId, roleId);
  const features = featuresForTenant(tenantId);
  const published = jobs.filter((j) => j.status === "Published");
  const offers = candidates.filter((c) => c.stage === "Offer");
  const timeToFillDays = Math.max(18, 45 - published.length * 3);
  const onboardingEta = onboarding.length > 0 ? "6d" : "0d";

  return (
    <div>
      <PageHeader
        titleEn={`Welcome back — ${tenant.nameEn}`}
        titleAr={`مرحباً بعودتك — ${tenant.nameAr}`}
        descriptionEn="Operational snapshot for the current company and role shown in the context bar."
        descriptionAr="لمحة تشغيلية للشركة والدور الحاليين الظاهرين في شريط السياق."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Briefcase className="h-5 w-5" />}
          title={label("Open roles", "الوظائف المفتوحة")}
          value={String(published.length)}
          hint={label("Published jobs", "وظائف منشورة")}
        />
        <MetricCard
          icon={<Clock3 className="h-5 w-5" />}
          title={label("Avg. time to fill", "متوسط زمن التوظيف")}
          value={`${timeToFillDays}d`}
          hint={label("Hiring speed", "سرعة التوظيف")}
        />
        <MetricCard
          icon={<UserCheck className="h-5 w-5" />}
          title={label("Offer acceptance", "قبول العروض")}
          value={`${offers.length}/${Math.max(candidates.length, 1)}`}
          hint={label("Candidate conversion", "تحويل المرشحين")}
        />
        <MetricCard
          icon={<ClipboardList className="h-5 w-5" />}
          title={label("Onboarding SLA", "مؤشر الانضمام")}
          value={onboardingEta}
          hint={label("Time to complete", "زمن الإنجاز")}
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <HeadcountChart
          title={label("Headcount trend", "اتجاه عدد الموظفين")}
          subtitle={label("Demo series for this tenant view", "سلسلة تجريبية")}
        />
        <HiresExitsBar title={label("Hires vs exits", "التعيينات مقابل الخروج")} />
        <DeptDonutChart title={label("By department", "حسب القسم")} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#003366]">
            {label("Demo journey shortcuts", "اختصارات رحلة العرض")}
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              {
                id: "journey-a",
                href: session?.scope === "platform" ? "/platform/companies" : "/admin/organization",
                en: session?.scope === "platform" ? "A. Platform creates a company" : "A. Company profile and controls",
                ar: session?.scope === "platform" ? "أ. المنصة تنشئ شركة" : "أ. ملف الشركة والضوابط",
              },
              {
                id: "journey-b",
                href: "/admin/organization",
                en: "B. Company admin configures org",
                ar: "ب. مسؤول الشركة يضبط المؤسسة",
              },
              {
                id: "journey-c",
                href: "/recruitment/hr-handoff",
                en: "C. Candidate handoff to HR",
                ar: "ج. تسليم المرشح إلى الموارد",
              },
            ].map((j) => (
              <li key={j.id}>
                <Link
                  href={j.href}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-sm font-medium text-slate-800 hover:border-teal-200 hover:bg-teal-50/40"
                >
                  <span>{label(j.en, j.ar)}</span>
                  <span className="text-teal-700">→</span>
                </Link>
              </li>
            ))}
          </ul>
          {!features.aiCopilot ? null : (
            <p className="mt-4 text-xs text-slate-500">
              {label(
                "AI remains embedded in screening, insights, and workflow hints — not a separate module.",
                "الذكاء مدمج في الفرز والرؤى والتنبيهات — وليس وحدة مستقلة."
              )}
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#003366]">
            {label("Upcoming tasks", "المهام القادمة")}
          </h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {tasks.slice(0, 5).map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-medium text-slate-800">{t.title}</p>
                  <p className="text-xs text-slate-500">
                    {t.assignee} · {t.area}
                  </p>
                </div>
                <Badge
                  variant={
                    t.priority === "High"
                      ? "warning"
                      : t.priority === "Medium"
                        ? "teal"
                        : "neutral"
                  }
                >
                  {t.priority}
                </Badge>
              </li>
            ))}
          </ul>
          <Link
            href="/hr/tasks"
            className="mt-2 inline-block text-sm font-medium text-teal-700 hover:underline"
          >
            {label("All tasks →", "كل المهام ←")}
          </Link>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  hint,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div className="flex items-center justify-between text-teal-600">
        <span className="rounded-lg bg-teal-50 p-2 text-teal-700">{icon}</span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-[#003366]">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}
