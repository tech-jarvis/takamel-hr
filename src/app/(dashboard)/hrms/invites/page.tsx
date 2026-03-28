"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invitesForTenant } from "@/lib/data/dummy";

export default function HrmsInvitesPage() {
  const { tenantId, label } = useAppSettings();
  const rows = invitesForTenant(tenantId);

  return (
    <div>
      <PageHeader
        titleEn="Invites"
        titleAr="الدعوات"
        descriptionEn="Send workspace invites and track acceptance — tokens would be emailed in production."
        descriptionAr="إرسال دعوات وتتبع القبول — الرموز تُرسل بالبريد في الإنتاج."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Button className="rounded-xl">{label("Invite user", "دعوة مستخدم")}</Button>
        <Button variant="outline" className="rounded-xl">
          {label("Bulk invite", "دعوة جماعية")}
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{label("Email", "البريد")}</th>
              <th className="px-4 py-3">{label("Role", "الدور")}</th>
              <th className="px-4 py-3">{label("Sent", "أُرسلت")}</th>
              <th className="px-4 py-3">{label("Status", "الحالة")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4 font-mono text-sm text-slate-800">{r.email}</td>
                <td className="px-4 py-4 text-slate-600">{r.role}</td>
                <td className="px-4 py-4 text-slate-600">{r.sentAt}</td>
                <td className="px-4 py-4">
                  <Badge variant={r.status === "Accepted" ? "success" : "warning"}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {label(
          "Try the flow: open /invite/demo-token in a fresh session (or from the login page).",
          "جرّب: افتح /invite/demo-token في جلسة جديدة (أو من صفحة تسجيل الدخول)."
        )}
      </p>
    </div>
  );
}
