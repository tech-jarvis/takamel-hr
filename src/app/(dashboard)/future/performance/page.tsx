"use client";

import { Target } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";

export default function FuturePerformancePage() {
  const { label } = useAppSettings();
  return (
    <div>
      <PageHeader
        titleEn="Performance"
        titleAr="الأداء"
        descriptionEn="Goals, OKRs, and continuous feedback — next phase after core HRMS stabilizes."
        descriptionAr="أهداف ونتائج وملاحظات مستمرة — المرحلة التالية."
      />
      <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/30 p-10 text-center">
        <Target className="mx-auto h-12 w-12 text-teal-600" />
        <p className="mt-4 text-lg font-medium text-[#003366]">
          {label("Coming next", "قادم لاحقاً")}
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
