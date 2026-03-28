"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";
import { selfOnboardingForTenant } from "@/lib/data/dummy";

export default function HrmsSelfOnboardingPage() {
  const { tenantId, label } = useAppSettings();
  const steps = selfOnboardingForTenant(tenantId);
  const done = steps.filter((s) => s.done).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

  return (
    <div>
      <PageHeader
        titleEn="My onboarding"
        titleAr="انضمامي"
        descriptionEn="Your checklist before and after day one — separate from the admin onboarding pipeline."
        descriptionAr="قائمتك قبل وبعد أول يوم عمل — منفصلة عن مسار الإدارة."
      />

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-600">
              {label("Progress", "التقدم")}
            </p>
            <p className="text-3xl font-bold text-[#003366]">{pct}%</p>
          </div>
          <div className="h-3 flex-1 max-w-md overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#003366] to-[#2ECC71]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {steps.length === 0 ? (
          <li className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            {label("No checklist for this tenant.", "لا قائمة لهذا المستأجر.")}
          </li>
        ) : (
          steps.map((s) => (
            <li
              key={s.id}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {s.done ? (
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
              ) : (
                <Circle className="h-6 w-6 shrink-0 text-slate-300" />
              )}
              <div className="min-w-0 flex-1">
                <p className={`font-medium ${s.done ? "text-slate-500 line-through" : "text-slate-900"}`}>
                  {s.title}
                </p>
                {s.due ? (
                  <p className="mt-1 text-xs text-slate-500">
                    {label("Due", "الاستحقاق")}: {s.due}
                  </p>
                ) : null}
              </div>
              {!s.done ? (
                <Button variant="outline" className="shrink-0 rounded-xl text-sm">
                  {label("Complete", "إكمال")}
                </Button>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
