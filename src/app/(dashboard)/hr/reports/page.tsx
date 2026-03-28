"use client";

import { BarChart3, FileSpreadsheet, PieChart } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { DeptDonutChart } from "@/components/analytics/dept-donut";
import { HeadcountChart } from "@/components/analytics/headcount-chart";
import { HiresExitsBar } from "@/components/analytics/hires-bar";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const { label } = useAppSettings();

  const cards = [
    {
      icon: <BarChart3 className="h-8 w-8 text-teal-600" />,
      en: "Headcount & movement",
      ar: "الأعداد والحركة",
      descEn: "Hires, transfers, and exits by cost center.",
      descAr: "تعيينات ونقل وخروج حسب مركز التكلفة.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-[#C5A059]" />,
      en: "Diversity & sourcing",
      ar: "التنوع والمصادر",
      descEn: "Funnel conversion and source effectiveness.",
      descAr: "فعالية المصادر وتحويل المسار.",
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-[#003366]" />,
      en: "Compliance pack",
      ar: "حزمة الامتثال",
      descEn: "Mudad-ready exports and audit snapshots.",
      descAr: "تصدير جاهز ولمحات تدقيق.",
    },
  ];

  return (
    <div>
      <PageHeader
        titleEn="Reports & analytics"
        titleAr="التقارير والتحليلات"
        descriptionEn="Visual summaries for leadership — HR suite analytics (separate from recruitment dashboards)."
        descriptionAr="ملخصات بصرية للقيادة — تحليلات حزمة الموارد (منفصلة عن لوحات التوظيف)."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Button className="rounded-xl">{label("New report", "تقرير جديد")}</Button>
        <Button variant="outline" className="rounded-xl">
          {label("Schedule email", "جدولة بريد")}
        </Button>
      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-3">
        <HeadcountChart
          title={label("Workforce growth", "نمو القوى العاملة")}
          subtitle={label("Rolling 6 months (sample)", "آخر 6 أشهر — عينة")}
        />
        <HiresExitsBar title={label("Movement", "الحركة")} />
        <DeptDonutChart title={label("Headcount mix", "توزيع الموظفين")} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.en}
            type="button"
            className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-white to-teal-50/40 p-6 text-left shadow-sm transition hover:border-teal-300/60 hover:shadow-md rtl:text-right"
          >
            <div className="w-fit rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-teal-100">
              {c.icon}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#003366]">
              {label(c.en, c.ar)}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {label(c.descEn, c.descAr)}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-teal-700">
              {label("Open builder →", "فتح المنشئ ←")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
