"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";

export default function FutureLearningPage() {
  const { label } = useAppSettings();
  return (
    <div>
      <PageHeader
        titleEn="Learning"
        titleAr="التعلم"
        descriptionEn="Kallidus-style journeys, skills, and compliance training will live here."
        descriptionAr="مسارات تعلم ومهارات وتدريب امتثال — قريباً."
      />
      <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/40 p-10 text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-[#C5A059]" />
        <p className="mt-4 text-lg font-medium text-[#003366]">
          {label("On the roadmap", "في خارطة الطريق")}
        </p>
        <p className="mt-2 text-slate-600">
          {label(
            "LMS hooks, content authoring, and Arabic-first catalogs.",
            "ربط أنظمة تعلم، إنشاء محتوى، وكتالوجات عربية أولاً."
          )}
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
