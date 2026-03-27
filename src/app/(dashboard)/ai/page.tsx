"use client";

import { Bot, Cpu, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { featuresForTenant } from "@/lib/config/features";
import { aiInsightsForTenant } from "@/lib/data/dummy";

export default function AiLayerPage() {
  const { tenantId, label } = useAppSettings();
  const features = featuresForTenant(tenantId);
  const insights = aiInsightsForTenant(tenantId);

  const tiles = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      en: "Recruiting copilot",
      ar: "مساعد التوظيف",
      on: features.aiCopilot,
      detailEn: "Drafts screens, rejection emails, and interview guides in Arabic and English.",
      detailAr: "صياغة شاشات ورسائل وأسئلة مقابلة بالعربية والإنجليزية.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      en: "Policy-grounded answers",
      ar: "إجابات مبنية على السياسات",
      on: true,
      detailEn: "Uses your handbook and Saudi labor context for consistent guidance.",
      detailAr: "يعتمد دليلك وسياق العمل في المملكة.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      en: "Screening & ranking",
      ar: "فرز وتصنيف",
      on: features.aiScreening,
      detailEn: "Semantic match to JD + culture signals; bias checks before human review.",
      detailAr: "تطابق دلالي مع الوصف وإشارات ثقافية؛ فحص انحياز قبل المراجعة البشرية.",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      en: "Employee Q&A",
      ar: "أسئلة الموظفين",
      on: features.aiCopilot,
      detailEn: "Self-serve HR answers with audit trail to ticketing when needed.",
      detailAr: "إجابات ذاتية مع سجل تدقيق وتحويل للتذاكر عند الحاجة.",
    },
  ];

  return (
    <div>
      <PageHeader
        titleEn="AI layer"
        titleAr="طبقة الذكاء الاصطناعي"
        descriptionEn="A single intelligence fabric across hiring and HRMS — configurable per tenant in this prototype."
        descriptionAr="طبقة ذكاء موحدة عبر التوظيف والموارد البشرية — قابلة للضبط لكل مستأجر في هذا النموذج."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map((tile) => (
          <div
            key={tile.en}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="rounded-xl bg-gradient-to-br from-[#003366]/10 via-teal-500/10 to-emerald-500/10 p-3 text-[#003366]">
              {tile.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">
                  {label(tile.en, tile.ar)}
                </h2>
                <Badge variant={tile.on ? "success" : "neutral"}>
                  {tile.on ? label("Enabled", "مفعّل") : label("Off", "معطّل")}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {label(tile.detailEn, tile.detailAr)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50/50 to-white p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
          <span className="text-[#C5A059]">◇</span>
          {label("Signals for this tenant", "إشارات لهذا المستأجر")}
        </h2>
        <ul className="mt-4 space-y-3">
          {insights.map((i) => (
            <li key={i.id} className="text-sm text-slate-700">
              <span className="font-medium text-slate-900">{i.title}:</span>{" "}
              {i.detail}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
