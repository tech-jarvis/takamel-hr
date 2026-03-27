export type TenantId = "alrajhi_tech" | "oasis_retail" | "red_sea_hospitality";

export interface Tenant {
  id: TenantId;
  nameEn: string;
  nameAr: string;
  slug: string;
  /** Overrides for white-label prototype */
  accentTeal?: string;
  logoUrl?: string;
  industry: string;
  country: string;
}

export const TENANTS: Tenant[] = [
  {
    id: "alrajhi_tech",
    nameEn: "Al Rajhi Digital",
    nameAr: "الراجحي الرقمية",
    slug: "alrajhi-digital",
    industry: "Technology",
    country: "SA",
  },
  {
    id: "oasis_retail",
    nameEn: "Oasis Retail Group",
    nameAr: "مجموعة واحة التجزئة",
    slug: "oasis-retail",
    accentTeal: "#009999",
    industry: "Retail",
    country: "SA",
  },
  {
    id: "red_sea_hospitality",
    nameEn: "Red Sea Hospitality",
    nameAr: "ضيافة البحر الأحمر",
    slug: "red-sea",
    industry: "Hospitality",
    country: "SA",
  },
];

export function tenantById(id: TenantId): Tenant {
  return TENANTS.find((t) => t.id === id) ?? TENANTS[0];
}
