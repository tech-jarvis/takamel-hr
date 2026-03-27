"use client";

import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";

export default function FutureReviewsPage() {
  const { label } = useAppSettings();
  return (
    <div>
      <PageHeader
        titleEn="Reviews"
        titleAr="التقييمات"
        descriptionEn="Calibration, 360°, and development plans — paired with performance data."
        descriptionAr="معايرة وتقييم 360° وخطط تطوير — مع بيانات الأداء."
      />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center">
        <ClipboardCheck className="mx-auto h-12 w-12 text-[#003366]" />
        <p className="mt-4 text-lg font-medium text-[#003366]">
          {label("Planned module", "وحدة مخططة")}
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-teal-700 hover:underline"
        >
          {label("Back to overview", "العودة للنظرة العامة")}
        </Link>
      </div>
    </div>
  );
}
