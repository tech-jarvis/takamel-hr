"use client";

import { RecruitmentModulePlaceholder } from "@/components/recruitment/module-placeholder";

export default function RecruitmentResumesPage() {
  return (
    <RecruitmentModulePlaceholder
      titleEn="Resumes & AI screening"
      titleAr="السير الذاتية والفرز بالذكاء"
      introEn="Parse PDFs, score against the JD, explain matches in Arabic, and log human override for audit."
      introAr="تحليل PDF، تقييم مقابل الوصف، شرح التطابق بالعربية، وتسجيل تدخل البشر للتدقيق."
      checklist={[
        { en: "CV parsing (AR/EN)", ar: "تحليل السيرة عربي/إنجليزي", done: true },
        { en: "Semantic match score", ar: "درجة التطابق الدلالي", done: true },
        { en: "Bias & fairness prompts", ar: "تلميحات الانحياز والعدالة", done: false },
        { en: "Bulk upload from email", ar: "رفع جماعي من البريد", done: false },
      ]}
    />
  );
}
