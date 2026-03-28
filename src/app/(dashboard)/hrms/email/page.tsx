"use client";

import { useState } from "react";
import { Inbox, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mailForTenant } from "@/lib/data/dummy";

export default function HrmsEmailPage() {
  const { tenantId, label } = useAppSettings();
  const [folder, setFolder] = useState<"inbox" | "sent">("inbox");
  const items = mailForTenant(tenantId, folder);

  return (
    <div>
      <PageHeader
        titleEn="Email"
        titleAr="البريد"
        descriptionEn="In-app mail mirror — prototype list only (no SMTP)."
        descriptionAr="بريد داخل التطبيق — قائمة تجريبية فقط."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={folder === "inbox" ? "primary" : "outline"}
          className="rounded-xl"
          onClick={() => setFolder("inbox")}
        >
          <Inbox className="h-4 w-4" />
          {label("Inbox", "الوارد")}
        </Button>
        <Button
          variant={folder === "sent" ? "primary" : "outline"}
          className="rounded-xl"
          onClick={() => setFolder("sent")}
        >
          <Send className="h-4 w-4" />
          {label("Sent", "الصادر")}
        </Button>
      </div>

      <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.length === 0 ? (
          <li className="px-5 py-12 text-center text-slate-500">
            {label("No messages.", "لا رسائل.")}
          </li>
        ) : (
          items.map((m) => (
            <li key={m.id} className="px-5 py-4 hover:bg-slate-50/80">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{m.subject}</p>
                  <p className="text-xs text-slate-500">
                    {label("From", "من")}: {m.from}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{m.preview}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xs text-slate-400">{m.at}</span>
                  {m.unread ? (
                    <Badge variant="teal">{label("Unread", "غير مقروء")}</Badge>
                  ) : null}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
