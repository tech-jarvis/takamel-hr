"use client";

import Link from "next/link";
import { Building2, Server, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";

export default function PlatformOverviewPage() {
  const { label } = useAppSettings();

  return (
    <div>
      <PageHeader
        titleEn="Platform overview"
        titleAr="نظرة المنصة"
        descriptionEn="Takamel is multitenant SaaS. Platform managers onboard new companies and configure isolation, domains, and compliance defaults."
        descriptionAr="تكامل متعدد المستأجرين. مدير المنصة يضيف الشركات ويعزل البيانات والنطاقات والامتثال."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Building2,
            tEn: "Companies",
            tAr: "الشركات",
            dEn: "Create tenants, regions, and data residency flags.",
            dAr: "إنشاء المستأجرين والمناطق ومواقع البيانات.",
            href: "/platform/companies",
          },
          {
            icon: Shield,
            tEn: "Security baseline",
            tAr: "الأمن الأساسي",
            dEn: "SSO, audit logs, and Nafath-ready auth patterns (roadmap).",
            dAr: "SSO وسجلات تدقيق وأنماط نفاذ (خارطة).",
            href: "/platform/companies",
          },
          {
            icon: Server,
            tEn: "Health",
            tAr: "الصحة",
            dEn: "API status and queue depth — prototype placeholders.",
            dAr: "حالة الواجهات والطوابير — عناصر نموذجية.",
            href: "/dashboard",
          },
        ].map((c) => (
          <div
            key={c.tEn}
            className="rounded-2xl border border-violet-200/60 bg-gradient-to-b from-violet-50/80 to-white p-6 shadow-sm"
          >
            <c.icon className="h-8 w-8 text-violet-700" />
            <h2 className="mt-4 font-semibold text-[#003366]">{label(c.tEn, c.tAr)}</h2>
            <p className="mt-2 text-sm text-slate-600">{label(c.dEn, c.dAr)}</p>
            <Link href={c.href} className="mt-4 inline-block">
              <Button variant="outline" className="rounded-xl border-violet-200">
                {label("Open", "فتح")}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
