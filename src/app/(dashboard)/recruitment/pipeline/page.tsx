"use client";

import { RecruitmentModulePlaceholder } from "@/components/recruitment/module-placeholder";

export default function RecruitmentPipelinePage() {
  return (
    <RecruitmentModulePlaceholder
      titleEn="Interview stages"
      titleAr="مراحل المقابلة"
      introEn="Configurable stages, scorecards, panel feedback, and SLA timers — aligned with Workable-style pipelines."
      introAr="مراحل قابلة للتخصيص وبطاقات تقييم وملاحظات اللجنة ومواعيد — بأسلوب Workable."
      checklist={[
        { en: "Stage templates per job family", ar: "قوالب مراحل لكل عائلة وظائف", done: true },
        { en: "Interview kits & scorecards", ar: "أدوات المقابلة والبطاقات", done: false },
        { en: "Calendar holds (Google / M365)", ar: "حجز التقويم", done: false },
        { en: "Offer approval chain", ar: "سلسلة موافقة العرض", done: false },
      ]}
    />
  );
}
