"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const INDUSTRIES = [
  "Technology",
  "Retail",
  "Hospitality",
  "Healthcare",
  "Finance",
  "Government",
] as const;

type Step = 0 | 1 | 2;

export function NewCompanyWizard({
  open,
  onClose,
  onComplete,
}: {
  open: boolean;
  onClose: () => void;
  onComplete: (summary: { name: string; industry: string; adminEmail: string }) => void;
}) {
  const { label } = useAppSettings();
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState<string>(INDUSTRIES[0]);
  const [adminEmail, setAdminEmail] = useState("");

  if (!open) return null;

  function reset() {
    setStep(0);
    setName("");
    setIndustry(INDUSTRIES[0]);
    setAdminEmail("");
  }

  function close() {
    reset();
    onClose();
  }

  function finish() {
    onComplete({ name: name.trim() || "New organization", industry, adminEmail: adminEmail.trim() });
    close();
  }

  const canNext =
    step === 0
      ? name.trim().length >= 2
      : step === 1
        ? adminEmail.includes("@")
        : true;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
        role="dialog"
        aria-modal
        aria-labelledby="wizard-title"
      >
        <button
          type="button"
          onClick={close}
          className="absolute end-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label={label("Close", "إغلاق")}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-[var(--border)] bg-gradient-to-r from-violet-600/10 to-teal-500/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-800">
            {label("Step", "خطوة")} {step + 1} / 3
          </p>
          <h2 id="wizard-title" className="mt-1 text-xl font-bold text-[#003366]">
            {label("Register a customer company", "تسجيل شركة عميل")}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {label(
              "Prototype wizard — no backend. Mirrors a real onboarding flow.",
              "معالج نموذجي — بلا خادم. يعكس تدفق التشغيل الفعلي.",
            )}
          </p>
        </div>

        <div className="px-6 py-6">
          {step === 0 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="wiz-name">
                  {label("Legal / brand name", "الاسم القانوني / التجاري")}
                </label>
                <input
                  id="wiz-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-violet-500/25 focus:ring-2"
                  placeholder={label("e.g. Gulf Logistics LLC", "مثال: شركة الخليج للخدمات")}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="wiz-ind">
                  {label("Industry", "القطاع")}
                </label>
                <select
                  id="wiz-ind"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-violet-500/25 focus:ring-2"
                >
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                {label(
                  "We will send this person an owner invite and first-login instructions.",
                  "سنرسل له دعوة المالك وتعليمات أول دخول.",
                )}
              </p>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="wiz-email">
                  {label("Company super admin email", "بريد مسؤول الشركة")}
                </label>
                <input
                  id="wiz-email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-violet-500/25 focus:ring-2"
                  placeholder="admin@customer.sa"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>
                  <strong>{label("Organization:", "المؤسسة:")}</strong> {name.trim() || "—"}
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>
                  <strong>{label("Industry:", "القطاع:")}</strong> {industry}
                </span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>
                  <strong>{label("Owner:", "المالك:")}</strong> {adminEmail || "—"}
                </span>
              </li>
              <li className="rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-amber-950/90">
                {label(
                  "Next in production: tenant provisioning, DNS, billing, and compliance checklist.",
                  "لاحقاً في الإنتاج: إنشاء المستأجر والفوترة وقائمة الامتثال.",
                )}
              </li>
            </ul>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => (step === 0 ? close() : setStep((s) => (s - 1) as Step))}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            {step === 0 ? label("Cancel", "إلغاء") : label("Back", "رجوع")}
          </Button>
          {step < 2 ? (
            <Button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="gap-1 bg-violet-700 hover:opacity-95"
            >
              {label("Continue", "متابعة")}
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={finish}
              className={cn("gap-1 bg-gradient-to-r from-violet-700 to-teal-600")}
            >
              <Check className="h-4 w-4" />
              {label("Confirm & queue", "تأكيد وإضافة للقائمة")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
