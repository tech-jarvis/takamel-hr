"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  const { label, locale, setLocale } = useAppSettings();
  return (
    <div className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 163, 163, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(46, 204, 113, 0.15), transparent)",
        }}
      />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-contain shadow-sm"
          />
          <div>
            <p className="text-lg font-bold text-[#003366]">Takamel HR</p>
            <p className="text-sm text-slate-500" dir="rtl">
              تكامل
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {locale === "en" ? "العربية" : "English"}
        </button>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-8 md:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-900">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
          {label("AI layer across hire → manage → grow", "طبقة ذكاء من التوظيف إلى الإدارة والنمو")}
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#003366] md:text-5xl">
          {label(
            "One connected HR operating system for the Kingdom.",
            "نظام موارد بشرية متكامل ومتصل للمملكة."
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          {label(
            "Prototype: multitenant, role-aware, and variable by design — recruitment that feels like Workable, HR operations like Sapling, with an AI fabric inspired by the best people platforms.",
            "نموذج أولي: متعدد المستأجرين، يحترم الأدوار، وقابل للتخصيص — توظيف بجودة أعلى من الأدوات العالمية، وعمليات بشرية حديثة، مع طبقة ذكاء اصطناعي موحدة."
          )}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/dashboard">
            <Button className="rounded-2xl px-6 py-3 text-base">
              {label("Open workspace", "فتح مساحة العمل")}
              <ArrowRight className="h-4 w-4 ltr:rotate-0 rtl:rotate-180" />
            </Button>
          </Link>
          <Link href="/recruitment">
            <Button variant="outline" className="rounded-2xl px-6 py-3 text-base">
              {label("See recruitment", "استكشف التوظيف")}
            </Button>
          </Link>
        </div>
        <ul className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              en: "Variable tenants & roles",
              ar: "مستأجرون وأدوار قابلة للتغيير",
            },
            {
              en: "Hiring pipeline + AI screening",
              ar: "مسار توظيف وفحص بالذكاء الاصطناعي",
            },
            {
              en: "Onboarding, org chart, reports",
              ar: "انضمام، هيكل، تقارير",
            },
          ].map((item) => (
            <li
              key={item.en}
              className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur"
            >
              <p className="font-medium text-slate-800">{label(item.en, item.ar)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
