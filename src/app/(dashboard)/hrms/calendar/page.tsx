"use client";

import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { calendarForTenant } from "@/lib/data/dummy";

export default function HrmsCalendarPage() {
  const { tenantId, label } = useAppSettings();
  const events = calendarForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Calendar"
        titleAr="التقويم"
        descriptionEn="Meetings, holidays, and leave blocks — connect to Exchange / Google later."
        descriptionAr="اجتماعات وعطل وكتل إجازة — ربط مع التقويم لاحقاً."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
          <CalendarDays className="h-5 w-5 text-teal-600" />
          <span className="font-semibold text-[#003366]">
            {label("March 2026", "مارس 2026")}
          </span>
        </div>
        <ul className="divide-y divide-slate-100">
          {events.length === 0 ? (
            <li className="px-5 py-10 text-center text-slate-500">
              {label("No events.", "لا أحداث.")}
            </li>
          ) : (
            events.map((ev) => (
              <li key={ev.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-medium text-slate-900">{ev.title}</p>
                  <p className="text-xs text-slate-500">
                    {ev.start} → {ev.end}
                  </p>
                </div>
                <Badge variant="teal" className="capitalize">
                  {ev.type}
                </Badge>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
