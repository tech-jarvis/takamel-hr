"use client";

import { useAppSettings } from "@/components/providers/app-settings-provider";

export function PageHeader({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
}: {
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
}) {
  const { label } = useAppSettings();
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#003366] md:text-3xl">
        {label(titleEn, titleAr)}
      </h1>
      {descriptionEn && descriptionAr ? (
        <p className="mt-2 max-w-3xl text-slate-600">
          {label(descriptionEn, descriptionAr)}
        </p>
      ) : null}
    </div>
  );
}
