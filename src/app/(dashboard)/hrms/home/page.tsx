"use client";

import Link from "next/link";
import { Bell, CheckSquare, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { homeFeedForTenant } from "@/lib/data/dummy";

const kindIcon = {
  announcement: Megaphone,
  policy: Bell,
  task: CheckSquare,
};

export default function HrmsHomePage() {
  const { tenantId, label } = useAppSettings();
  const items = homeFeedForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Home"
        titleAr="الرئيسية"
        descriptionEn="Updates, announcements, and nudges — similar to Sapling “My updates”."
        descriptionAr="تحديثات وإعلانات وتنبيهات — مثل صفحة التحديثات في أنظمة الموارد البشرية."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              {label("No feed items for this tenant.", "لا عناصر في الموجز لهذا المستأجر.")}
            </p>
          ) : (
            items.map((item) => {
              const Icon = kindIcon[item.kind];
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-teal-50 p-2 text-teal-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold text-[#003366]">{item.title}</h2>
                        <Badge variant="neutral" className="capitalize">
                          {item.kind}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                      <p className="mt-2 text-xs text-slate-400">{item.at}</p>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#003366]">
              {label("Shortcuts", "اختصارات")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/hrms/pto" className="text-teal-700 hover:underline">
                  {label("Request time off", "طلب إجازة")}
                </Link>
              </li>
              <li>
                <Link href="/hrms/email" className="text-teal-700 hover:underline">
                  {label("Open email", "البريد")}
                </Link>
              </li>
              <li>
                <Link href="/hrms/calendar" className="text-teal-700 hover:underline">
                  {label("Calendar", "التقويم")}
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
