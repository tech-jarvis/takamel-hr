"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Briefcase,
  ClipboardList,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { featuresForTenant } from "@/lib/config/features";
import { tenantById } from "@/lib/config/tenants";
import {
  aiInsightsForTenant,
  jobsForTenant,
  onboardingForTenant,
  tasksForTenant,
} from "@/lib/data/dummy";
import { DeptDonutChart } from "@/components/analytics/dept-donut";
import { HeadcountChart } from "@/components/analytics/headcount-chart";
import { HiresExitsBar } from "@/components/analytics/hires-bar";

export default function DashboardPage() {
  const { tenantId, roleId, label } = useAppSettings();
  const tenant = tenantById(tenantId);
  const jobs = jobsForTenant(tenantId);
  const onboarding = onboardingForTenant(tenantId);
  const tasks = tasksForTenant(tenantId, roleId);
  const insights = aiInsightsForTenant(tenantId);
  const features = featuresForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn={`Welcome back — ${tenant.nameEn}`}
        titleAr={`مرحباً بعودتك — ${tenant.nameAr}`}
        descriptionEn="Operational snapshot for this tenant. Switch organization or role from the header to see how navigation and data change."
        descriptionAr="لمحة تشغيلية لهذا المستأجر. بدّل المؤسسة أو الدور من الشريط العلوي لرؤية التغيير."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Briefcase className="h-5 w-5" />}
          title={label("Open roles", "الوظائف المفتوحة")}
          value={String(jobs.filter((j) => j.status === "Published").length)}
          hint={label("Published jobs", "وظائف منشورة")}
        />
        <MetricCard
          icon={<Users className="h-5 w-5" />}
          title={label("Onboarding", "الانضمام")}
          value={String(onboarding.length)}
          hint={label("Active journeys", "رحلات نشطة")}
        />
        <MetricCard
          icon={<ClipboardList className="h-5 w-5" />}
          title={label("Tasks", "المهام")}
          value={String(tasks.length)}
          hint={label("In your queue", "في قائمتك")}
        />
        <MetricCard
          icon={<TrendingUp className="h-5 w-5" />}
          title={label("AI insights", "رؤى ذكية")}
          value={String(insights.length)}
          hint={
            features.aiCopilot
              ? label("Copilot on", "المساعد مفعّل")
              : label("Copilot off", "المساعد معطّل")
          }
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
            {label("AI highlights", "أبرز الذكاء الاصطناعي")}
          </h2>
          <ul className="mt-4 space-y-4">
            {insights.map((i) => (
              <li
                key={i.id}
                className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-slate-800">{i.title}</p>
                  <Badge
                    variant={i.impact === "high" ? "teal" : "neutral"}
                    className="shrink-0 capitalize"
                  >
                    {i.impact}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{i.detail}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/ai"
            className="mt-4 inline-block text-sm font-medium text-teal-700 hover:underline"
          >
            {label("Open AI layer →", "فتح طبقة الذكاء ←")}
          </Link>
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
