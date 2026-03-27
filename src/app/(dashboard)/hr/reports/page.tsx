"use client";

import { BarChart3, FileSpreadsheet, PieChart } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
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
        titleEn="Reports"
        titleAr="التقارير"
        descriptionEn="Saved views and scheduled delivery — UI only for now; charts wire to your warehouse later."
        descriptionAr="عروض محفوظة وجدولة — واجهة فقط؛ الربط مع مستودع البيانات لاحقاً."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Button className="rounded-xl">{label("New report", "تقرير جديد")}</Button>
        <Button variant="outline" className="rounded-xl">
          {label("Schedule email", "جدولة بريد")}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.en}
            type="button"
            className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-teal-200 hover:shadow-md rtl:text-right"
          >
            <div className="rounded-xl bg-slate-50 p-3 w-fit">{c.icon}</div>
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
