"use client";

import Link from "next/link";
import { Banknote, ClipboardCheck, GraduationCap, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";

const ROADMAP = [
  {
    id: "learning",
    href: "/future/learning",
    icon: GraduationCap,
    titleEn: "Learning",
    titleAr: "التعلم",
    blurbEn: "LMS, compliance learning, and Arabic-first catalogs.",
    blurbAr: "نظام التعلم والتدريب والكتالوجات العربية.",
  },
  {
    id: "performance",
    href: "/future/performance",
    icon: Target,
    titleEn: "Performance",
    titleAr: "الأداء",
    blurbEn: "Goals, OKRs, and manager cadence.",
    blurbAr: "الأهداف ونتائجها ودورة تقييم المدير.",
  },
  {
    id: "reviews",
    href: "/future/reviews",
    icon: ClipboardCheck,
    titleEn: "Reviews",
    titleAr: "التقييمات",
    blurbEn: "360, calibration, and development plans.",
    blurbAr: "360 والمعايرة وخطط التطوير.",
  },
  {
    id: "payroll",
    href: "/future/payroll",
    icon: Banknote,
    titleEn: "Payroll",
    titleAr: "الرواتب",
    blurbEn: "Mudad/GOSI and compliant payslips.",
    blurbAr: "التكامل مع مدد والتأمينات ومسيرات متوافقة.",
  },
];

export default function RoadmapPage() {
  const { label } = useAppSettings();

  return (
    <div>
      <PageHeader
        titleEn="Product roadmap"
        titleAr="خارطة الطريق"
        descriptionEn="One place for upcoming modules so the current product flow stays focused and non-overlapping."
        descriptionAr="مكان موحّد للوحدات القادمة حتى يبقى تدفق المنتج الحالي واضحاً بلا تداخل."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {ROADMAP.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
          >
            <item.icon className="h-8 w-8 text-[#003366]" />
            <h2 className="mt-4 text-lg font-semibold text-[#003366]">
              {label(item.titleEn, item.titleAr)}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {label(item.blurbEn, item.blurbAr)}
            </p>
            <p className="mt-4 text-sm font-medium text-teal-700">
              {label("Open module details", "فتح تفاصيل الوحدة")} →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
