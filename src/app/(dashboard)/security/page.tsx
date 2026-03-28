"use client";

import { useRouter } from "next/navigation";
import { KeyRound, MonitorSmartphone, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { tenantById } from "@/lib/config/tenants";

export default function SecurityPage() {
  const router = useRouter();
  const { label } = useAppSettings();
  const { session, signOut } = useAuth();
  const tenant = session?.tenantId ? tenantById(session.tenantId) : null;

  return (
    <div>
      <PageHeader
        titleEn="Security & session"
        titleAr="الأمان والجلسة"
        descriptionEn="Who you are, which organization is bound to this browser session, and how to leave safely. Production would add MFA, device trust, and audit logs."
        descriptionAr="من أنت وأي مؤسسة مرتبطة بهذه الجلسة وكيف تخرج بأمان. في الإنتاج تُضاف المصادقة الثنائية وأجهزة موثوقة وسجلات التدقيق."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#003366]">
            <Shield className="h-8 w-8 text-teal-600" />
            <h2 className="text-lg font-semibold">
              {label("Active session", "الجلسة النشطة")}
            </h2>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">
                {label("Signed in as", "مسجّل الدخول")}
              </dt>
              <dd className="mt-0.5 font-medium text-slate-900">
                {session?.email ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">
                {label("Access mode", "نمط الوصول")}
              </dt>
              <dd className="mt-0.5 font-medium text-slate-900">
                {session?.scope === "platform"
                  ? label("Platform operator", "مشغّل المنصة")
                  : label("Company workspace", "مساحة العمل للشركة")}
              </dd>
            </div>
            {session?.scope === "company" && tenant ? (
              <div>
                <dt className="text-slate-500">
                  {label("Bound organization", "المؤسسة المرتبطة")}
                </dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {label(tenant.nameEn, tenant.nameAr)}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-slate-500">
                {label("Session started", "بداية الجلسة")}
              </dt>
              <dd className="mt-0.5 font-mono text-xs text-slate-700">
                {session?.signedInAt
                  ? new Date(session.signedInAt).toLocaleString()
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#003366]">
            <KeyRound className="h-8 w-8 text-[#C5A059]" />
            <h2 className="text-lg font-semibold">
              {label("Hardening (roadmap)", "التعزيز (خارطة الطريق)")}
            </h2>
          </div>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
            <li>{label("Nafath / SSO integration", "تكامل نفاذ / SSO")}</li>
            <li>{label("Step-up MFA for sensitive actions", "مصادقة ثنائية للإجراءات الحساسة")}</li>
            <li>{label("IP allowlists & geo policies for KSA", "قوائم IP وسياسات جغرافية")}</li>
            <li>{label("Immutable audit trail", "سجل تدقيق غير قابل للتعديل")}</li>
          </ul>
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-950/90">
            <MonitorSmartphone className="h-4 w-4 shrink-0" />
            {label(
              "This prototype stores session in localStorage only — do not use for real data.",
              "النموذج يخزن الجلسة محلياً فقط — لا تستخدمه لبيانات حقيقية."
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-red-200 text-red-800 hover:bg-red-50"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          {label("Sign out everywhere (this browser)", "تسجيل الخروج (هذا المتصفح)")}
        </Button>
      </div>
    </div>
  );
}
