"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Building2,
  GitBranch,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import { defaultPostLoginPath } from "@/lib/auth/route-scope";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

const HERO_IMG =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";
const SECOND_IMG =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80";
const THIRD_IMG =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80";

export function ProductHome() {
  const router = useRouter();
  const { label, locale, setLocale } = useAppSettings();
  const { session, ready } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl object-contain ring-1 ring-[#C5A059]/40"
            />
            <div>
              <p className="font-bold text-[#003366]">Takamel HR</p>
              <p className="text-xs text-slate-500" dir="rtl">
                تكامل
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
            {ready && session ? (
              <Button
                type="button"
                className="rounded-xl px-4"
                onClick={() =>
                  router.push(defaultPostLoginPath(session.scope, session.roleId))
                }
              >
                {label("Open app", "فتح التطبيق")}
              </Button>
            ) : (
              <Button
                type="button"
                className="rounded-xl px-4"
                onClick={() => router.push("/login?scope=company")}
              >
                {label("Sign in", "تسجيل الدخول")}
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt=""
            fill
            className="object-cover brightness-[0.45]"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,51,102,0.92) 0%, rgba(0,163,163,0.55) 45%, rgba(46,204,113,0.35) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
            {label("Built for Saudi & GCC teams", "مصمم لفرق السعودية والخليج")}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            {label(
              "Recruitment and HR operations — clearly separated, deeply connected.",
              "التوظيف وعمليات الموارد البشرية — منفصلان بوضوح، متصلان بعمق."
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            {label(
              "Workable-class hiring, Sapling-style HR suite, and an AI layer — multitenant, Arabic-first, and ready for Nafath-era compliance workflows.",
              "توظيف بمستوى عالمي، وحزمة موارد بشرية حديثة، وطبقة ذكاء — متعددة المستأجرين، عربية أولاً، وجاهزة للامتثال.",
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              type="button"
              className="rounded-2xl px-8 py-3 text-base shadow-lg"
              onClick={() => router.push("/login?scope=company")}
            >
              {label("Start with your company", "ابدأ بشركتك")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl border-white/40 bg-white/10 px-8 py-3 text-base text-white backdrop-blur hover:bg-white/20"
              onClick={() =>
                router.push("/login?scope=platform&next=/platform/companies")
              }
            >
              {label("Platform manager", "مدير المنصة")}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-gradient-to-b from-[#f5f0e8] to-[var(--surface)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <h2 className="text-3xl font-bold text-[#003366]">
              {label("Two engines, one experience", "محركان، تجربة واحدة")}
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4 rounded-2xl border border-amber-200/60 bg-white/90 p-5 shadow-sm">
                <div className="rounded-xl bg-amber-100/80 p-3 text-amber-900">
                  <GitBranch className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">
                    {label("Recruitment workspace", "مساحة التوظيف")}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {label(
                      "Multi-channel jobs, resume AI, interview stages, candidate email, and handoff to HR — like Workable, tuned for KSA.",
                      "وظائف متعددة القنوات، فرز ذكاء، مقابلات، بريد مرشحين، وتسليم للموارد البشرية.",
                    )}
                  </p>
                </div>
              </li>
              <li className="flex gap-4 rounded-2xl border border-teal-200/60 bg-white/90 p-5 shadow-sm">
                <div className="rounded-xl bg-teal-100/80 p-3 text-teal-900">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003366]">
                    {label("HR suite & HRMS", "الحزمة والنظام")}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {label(
                      "Onboarding, org chart, PTO, tasks, reports, and role assignment for your super admin — same product area, not mixed with hiring screens.",
                      "انضمام، هيكل، إجازات، مهام، تقارير، وتعيين أدوار — نفس المنتج دون خلط مع شاشات التوظيف.",
                    )}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#003366]/10">
            <Image src={SECOND_IMG} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 to-transparent" />
            <p className="absolute bottom-6 start-6 end-6 text-sm font-medium text-white drop-shadow">
              {label(
                "RTL-ready layouts, warm neutrals, and Gulf-friendly hierarchy.",
                "تخطيط جاهز للعربية، ألوان دافئة، وهيكل يناسب أسلوب العمل في الخليج.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-bold text-[#003366]">
            {label("Product tour & tutorials", "جولة المنتج والشروحات")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {label(
              "Short guides your HR team can follow — videos and PDFs ship with the real product.",
              "أدلة قصيرة لفريق الموارد البشرية — الفيديوهات والملفات مع المنتج الفعلي.",
            )}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: label("Set up a company in 5 minutes", "إعداد الشركة في 5 دقائق"),
                d: label("Platform manager walkthrough", "جولة مدير المنصة"),
              },
              {
                t: label("Recruitment vs HR suite", "التوظيف مقابل حزمة الموارد"),
                d: label("Where each module lives", "مكان كل وحدة"),
              },
              {
                t: label("Roles & Saudi compliance", "الأدوار والامتثال"),
                d: label("Super admin and audit trail", "المسؤول الأعلى وسجل التدقيق"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#003366] to-teal-600 text-white">
                  <Play className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-[#003366]">{item.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                  <BookOpen className="h-4 w-4" />
                  {label("Watch (demo)", "مشاهدة (تجريبي)")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[#003366] py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Building2 className="h-10 w-10 text-[#C5A059]" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              {label("Multitenant by design", "متعدد المستأجرين بالتصميم")}
            </h2>
            <p className="mt-4 text-white/85">
              {label(
                "Platform managers provision companies. Each company has a super admin who assigns HR, hiring, and employee roles — all isolated per tenant.",
                "مدير المنصة ينشئ الشركات. لكل شركة مسؤول أعلى يعيّن أدوار الموارد والتوظيف والموظفين — معزول لكل مستأجر.",
              )}
            </p>
            <Button
              type="button"
              className="mt-8 rounded-2xl bg-white px-6 py-3 text-[#003366] hover:bg-slate-100"
              onClick={() =>
                router.push(
                  ready && session
                    ? defaultPostLoginPath(session.scope, session.roleId)
                    : "/login?scope=company"
                )
              }
            >
              {label("Open the prototype", "افتح النموذج")}
            </Button>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl ring-2 ring-[#C5A059]/40">
            <Image src={THIRD_IMG} alt="" fill className="object-cover opacity-90" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-10 text-center text-sm text-slate-500">
        Takamel HR — {label("Human resources, integrated", "موارد بشرية متكاملة")}
      </footer>
    </div>
  );
}
