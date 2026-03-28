"use client";

import { RecruitmentModulePlaceholder } from "@/components/recruitment/module-placeholder";

export default function RecruitmentCommsPage() {
  return (
    <RecruitmentModulePlaceholder
      titleEn="Candidate email & sequences"
      titleAr="بريد المرشحين والتسلسلات"
      introEn="Branded templates, delay steps, and two-way sync with the candidate timeline."
      introAr="قوالب العلامة وتأخير الخطوات والمزامنة مع خط زمن المرشح."
      checklist={[
        { en: "Template library (AR/EN)", ar: "مكتبة قوالب", done: false },
        { en: "Automated nurture sequences", ar: "تسلسلات تلقائية", done: false },
        { en: "In-app + email thread view", ar: "عرض المحادثات", done: false },
        { en: "Unsubscribe & consent tracking", ar: "إلغاء الاشتراك والموافقة", done: false },
      ]}
    />
  );
}
