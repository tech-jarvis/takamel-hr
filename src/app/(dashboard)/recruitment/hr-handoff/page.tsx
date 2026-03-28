"use client";

import { RecruitmentModulePlaceholder } from "@/components/recruitment/module-placeholder";

export default function RecruitmentHrHandoffPage() {
  return (
    <RecruitmentModulePlaceholder
      titleEn="Handoff to HR suite"
      titleAr="التسليم لحزمة الموارد البشرية"
      introEn="When a candidate is hired, push profile, documents, and start-date triggers into HR operations without duplicate data entry."
      introAr="عند التعيين: نقل الملف والمستندات وتاريخ البدء إلى عمليات الموارد البشرية دون تكرار."
      checklist={[
        { en: "Pending hire record", ar: "سجل التعيين المعلق", done: true },
        { en: "Sync to People directory", ar: "مزامنة مع الأشخاص", done: false },
        { en: "Kick off onboarding workflow", ar: "بدء سير انضمام", done: false },
        { en: "Provision email & groups", ar: "تجهيز البريد والمجموعات", done: false },
      ]}
    />
  );
}
