"use client";

import { RecruitmentModulePlaceholder } from "@/components/recruitment/module-placeholder";

export default function RecruitmentSourcingPage() {
  return (
    <RecruitmentModulePlaceholder
      titleEn="Sourcing & job boards"
      titleAr="الاستقطاب ولوحات الوظائف"
      introEn="Push jobs to multiple boards with spend caps and UTM tracking. Full integrations are on the roadmap."
      introAr="نشر الوظائف على عدة مواقع مع حدود إنفاف وتتبع. التكامل الكامل في خارطة الطريق."
      checklist={[
        { en: "LinkedIn & Bayt connectors", ar: "ربط لينكدإن وبيت", done: false },
        { en: "Sponsored job slots", ar: "فتحات إعلانية", done: false },
        { en: "Source-of-hire reporting", ar: "تقارير مصدر التوظيف", done: true },
        { en: "Arabic + English job copy variants", ar: "نسختان عربي/إنجليزي", done: true },
      ]}
    />
  );
}
