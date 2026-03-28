"use client";

import Link from "next/link";
import { Banknote } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useAppSettings } from "@/components/providers/app-settings-provider";

export default function FuturePayrollPage() {
  const { label } = useAppSettings();
  return (
    <div>
      <PageHeader
        titleEn="Payroll"
        titleAr="الرواتب"
        descriptionEn="Mudad integration, GOSI, WPS, and payslips — planned as a separate module linked to People data."
        descriptionAr="التكامل مع مدد والتأمينات ومسير الرواتب — وحدة منفصلة مرتبطة ببيانات الموظفين."
      />
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-white py-20">
        <Banknote className="h-14 w-14 text-[#C5A059]" />
        <p className="mt-6 text-lg font-medium text-[#003366]">
          {label("Coming soon", "قريباً")}
        </p>
        <Link href="/dashboard" className="mt-4 text-sm text-teal-700 hover:underline">
          {label("Back to overview", "العودة للنظرة العامة")}
        </Link>
      </div>
    </div>
  );
}
