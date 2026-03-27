"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { tasksForTenant } from "@/lib/data/dummy";

export default function TasksPage() {
  const { tenantId, roleId, label } = useAppSettings();
  const tasks = tasksForTenant(tenantId, roleId);

  return (
    <div>
      <PageHeader
        titleEn="Tasks"
        titleAr="المهام"
        descriptionEn="Role-aware queue: HR admins see team work; employees see items assigned to them."
        descriptionAr="قائمة حسب الدور: مسؤولو الموارد يرون عمل الفريق؛ الموظف يرى ما يخصه."
      />

      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <li className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            {label("No tasks for this view.", "لا مهام لهذا العرض.")}
          </li>
        ) : (
          tasks.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{t.title}</p>
                <p className="text-sm text-slate-500">
                  {label("Assignee", "المكلف")}: {t.assignee} · {t.due}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">{t.area}</Badge>
                <Badge
                  variant={
                    t.priority === "High"
                      ? "warning"
                      : t.priority === "Medium"
                        ? "teal"
                        : "neutral"
                  }
                >
                  {t.priority}
                </Badge>
                <button
                  type="button"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-teal-700 hover:bg-teal-50"
                >
                  {label("Done", "تم")}
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
