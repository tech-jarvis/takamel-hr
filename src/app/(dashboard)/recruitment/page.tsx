"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  GitBranch,
  Inbox,
  Mail,
  Share2,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MODULES: {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  href: string;
  icon: typeof Sparkles;
  status: "live" | "partial" | "planned";
}[] = [
  {
    titleEn: "Jobs & multi-channel posting",
    titleAr: "الوظائف والنشر متعدد القنوات",
    descEn: "Career site, LinkedIn, Bayt, Indeed, referrals — one draft, many destinations.",
    descAr: "الموقع ولينكدإن وبيت وإنديد وإحالات — مسودة واحدة ووجوه متعددة.",
    href: "/recruitment/jobs",
    icon: Share2,
    status: "live",
  },
  {
    titleEn: "Sourcing & job boards",
    titleAr: "الاستقطاب ولوحات الوظائف",
    descEn: "Budget per channel, sponsored slots, and conversion analytics.",
    descAr: "ميزانية لكل قناة وإعلانات وتحليل التحويل.",
    href: "/recruitment/sourcing",
    icon: Building2,
    status: "partial",
  },
  {
    titleEn: "Resume inbox & AI screening",
    titleAr: "استقبال السير والفرز بالذكاء",
    descEn: "Parse CVs, score against JD, de-bias checks, Arabic + English.",
    descAr: "تحليل السير، تقييم مقابل الوصف، فحص انحياز، عربي وإنجليزي.",
    href: "/recruitment/resumes",
    icon: Bot,
    status: "partial",
  },
  {
    titleEn: "Interview stages & scorecards",
    titleAr: "مراحل المقابلة وبطاقات التقييم",
    descEn: "Workable-style pipeline: phone, panel, assignment, offer approval.",
    descAr: "مسار كـ Workable: هاتف، لجنة، مهمة، موافقة عرض.",
    href: "/recruitment/pipeline",
    icon: GitBranch,
    status: "partial",
  },
  {
    titleEn: "Candidate email & sequences",
    titleAr: "بريد المرشحين والتسلسلات",
    descEn: "Templates, scheduling, GDPR-style consent, SMS optional.",
    descAr: "قوالب وجدولة وموافقات ورسائل نصية اختيارية.",
    href: "/recruitment/comms",
    icon: Mail,
    status: "planned",
  },
  {
    titleEn: "Handoff to HR suite",
    titleAr: "التسليم لحزمة الموارد البشرية",
    descEn: "Hired candidate → pending hire → onboarding tasks without retyping data.",
    descAr: "المرشح المعيّن → انضمام معلق → مهام دون إعادة إدخال.",
    href: "/recruitment/hr-handoff",
    icon: UserPlus,
    status: "planned",
  },
];

export default function RecruitmentHubPage() {
  const { label } = useAppSettings();

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-teal-50/80 p-8 shadow-sm md:p-10">
        <div
          className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #C5A059 0%, transparent 70%)" }}
        />
        <PageHeader
          titleEn="Recruitment workspace"
          titleAr="مساحة التوظيف"
          descriptionEn="Everything here is talent acquisition — separate from HR operations & HRMS. Below is the roadmap: live, in progress, and planned (Workable-class)."
          descriptionAr="كل ما هنا لاستقطاب المواهب — منفصل عن عمليات الموارد البشرية. أدناه خارطة: جاهز، قيد العمل، ومخطط."
        />
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link href="/recruitment/jobs">
            <Button className="rounded-2xl px-5">
              {label("Open jobs", "فتح الوظائف")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
          <Link href="/recruitment/resumes">
            <Button variant="outline" className="rounded-2xl border-amber-300/80 bg-white/80 px-5">
              <Sparkles className="h-4 w-4 text-[#C5A059]" />
              {label("AI screening", "الفرز بالذكاء")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {MODULES.map((m) => {
          const Icon = m.icon;
          const statusLabel =
            m.status === "live"
              ? label("Live", "مفعّل")
              : m.status === "partial"
                ? label("In progress", "قيد التنفيذ")
                : label("Planned", "مخطط");
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-sm transition hover:border-amber-300/80 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-[#003366]/10 to-amber-100/80 p-3 text-[#003366]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-[#003366] group-hover:text-teal-800">
                      {label(m.titleEn, m.titleAr)}
                    </h2>
                    <Badge
                      variant={m.status === "live" ? "success" : m.status === "partial" ? "gold" : "neutral"}
                    >
                      {statusLabel}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {label(m.descEn, m.descAr)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                    {label("Explore", "استكشف")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-10 rounded-2xl border border-dashed border-teal-300/60 bg-teal-50/40 p-6">
        <div className="flex items-center gap-2 text-[#003366]">
          <Inbox className="h-5 w-5" />
          <h3 className="font-semibold">{label("Integrated with HR suite", "متكامل مع حزمة الموارد البشرية")}</h3>
        </div>
        <p className="mt-2 text-sm text-slate-700">
          {label(
            "Offers accepted here sync to People, onboarding tasks, and access provisioning — no duplicate entry (when wired).",
            "العروض المقبولة تنتقل للأشخاص ومهام الانضمام والصلاحيات دون تكرار (عند الربط)."
          )}
        </p>
      </section>
    </div>
  );
}
