"use client";

import { useRouter } from "next/navigation";
import { Building2, Mail } from "lucide-react";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { label } = useAppSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003366]">
        {label("Forgot password?", "نسيت كلمة المرور؟")}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {label(
          "This prototype has no email server and cannot send reset links. Nothing you enter here is processed.",
          "هذا النموذج لا يملك خادم بريد ولا يمكنه إرسال روابط الاستعادة. لا يُعالج أي إدخال هنا.",
        )}
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-teal-200/80 bg-teal-50/40 p-5 text-sm text-slate-800">
        <div className="flex gap-3">
          <Building2 className="h-5 w-5 shrink-0 text-teal-700" />
          <p>
            {label(
              "If you use Takamel through your employer, contact your HR or IT administrator. They can reset access or invite you again.",
              "إذا كنت تستخدم تكامل عبر جهة عملك، تواصل مع مسؤول الموارد البشرية أو تقنية المعلومات لإعادة تعيين الوصول أو إرسال دعوة جديدة.",
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <Mail className="h-5 w-5 shrink-0 text-teal-700" />
          <p>
            {label(
              "In production, self-service reset would use a verified work email and optional Nafath / SSO — with rate limits and audit logs.",
              "في الإنتاج، ستكون الاستعادة الذاتية عبر بريد العمل الموثّق مع نفاذ أو SSO — مع حدود معدل وسجلات تدقيق.",
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="flex-1 rounded-xl py-3"
          onClick={() => router.push("/login?scope=company")}
        >
          {label("Back to company sign in", "العودة لتسجيل دخول الشركة")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-xl py-3"
          onClick={() => router.push("/login?scope=platform")}
        >
          {label("Platform sign in", "دخول المنصة")}
        </Button>
      </div>
    </div>
  );
}
