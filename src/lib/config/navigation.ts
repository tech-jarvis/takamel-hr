import type { RoleId } from "./roles";

/** Investor-demo IA: four clear modules + roadmap. */
export type NavSection =
  | "home"
  | "recruitment"
  | "hr_operations"
  | "admin_security"
  | "roadmap";

/** Sidebar + module rail order */
export const SECTION_ORDER: NavSection[] = [
  "home",
  "recruitment",
  "hr_operations",
  "admin_security",
  "roadmap",
];

export interface NavItem {
  id: string;
  href: string;
  labelEn: string;
  labelAr: string;
  section: NavSection;
  /** Empty = all roles that can see the app (within scope). */
  roles?: RoleId[];
  badge?: "soon";
}

export const NAV_ITEMS: NavItem[] = [
  /* ——— Home ——— */
  {
    id: "home",
    href: "/dashboard",
    labelEn: "Home",
    labelAr: "الرئيسية",
    section: "home",
    roles: ["company_super_admin", "hr_admin", "hiring_manager", "employee"],
  },
  {
    id: "platform_home",
    href: "/platform",
    labelEn: "Platform overview",
    labelAr: "نظرة المنصة",
    section: "home",
    roles: ["platform_manager"],
  },

  /* ——— Recruitment ——— */
  {
    id: "recruitment_hub",
    href: "/recruitment",
    labelEn: "Overview",
    labelAr: "نظرة عامة",
    section: "recruitment",
    roles: ["company_super_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "recruitment_jobs",
    href: "/recruitment/jobs",
    labelEn: "Jobs",
    labelAr: "الوظائف",
    section: "recruitment",
    roles: ["company_super_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "recruitment_candidates",
    href: "/recruitment/resumes",
    labelEn: "Candidates",
    labelAr: "المرشحون",
    section: "recruitment",
    roles: ["company_super_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "recruitment_pipeline",
    href: "/recruitment/pipeline",
    labelEn: "Pipeline",
    labelAr: "المسار",
    section: "recruitment",
    roles: ["company_super_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "recruitment_hr_sync",
    href: "/recruitment/hr-handoff",
    labelEn: "Handoff to HR",
    labelAr: "تسليم للموارد",
    section: "recruitment",
    roles: ["company_super_admin", "hr_admin", "hiring_manager"],
  },

  /* ——— HR Operations ——— */
  {
    id: "hrms_home",
    href: "/hrms/home",
    labelEn: "Employee home",
    labelAr: "رئيسية الموظف",
    section: "hr_operations",
  },
  {
    id: "hr_people",
    href: "/hrms/people",
    labelEn: "People",
    labelAr: "الأشخاص",
    section: "hr_operations",
    roles: [
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
      "employee",
    ],
  },
  {
    id: "hr_onboarding",
    href: "/hr/onboarding",
    labelEn: "Onboarding",
    labelAr: "الانضمام",
    section: "hr_operations",
    roles: [
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "hr_tasks",
    href: "/hr/tasks",
    labelEn: "Tasks",
    labelAr: "المهام",
    section: "hr_operations",
  },
  {
    id: "hr_reports",
    href: "/hr/reports",
    labelEn: "Reports",
    labelAr: "التقارير",
    section: "hr_operations",
    roles: [
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },

  /* ——— Admin & Security ——— */
  {
    id: "admin_organization",
    href: "/admin/organization",
    labelEn: "Organization",
    labelAr: "المؤسسة",
    section: "admin_security",
    roles: ["company_super_admin", "hr_admin"],
  },
  {
    id: "admin_roles",
    href: "/hr/roles",
    labelEn: "Roles & permissions",
    labelAr: "الأدوار والصلاحيات",
    section: "admin_security",
    roles: ["company_super_admin", "hr_admin"],
  },
  {
    id: "admin_security",
    href: "/security",
    labelEn: "Security",
    labelAr: "الأمان",
    section: "admin_security",
    roles: ["company_super_admin", "hr_admin"],
  },
  {
    id: "platform_companies",
    href: "/platform/companies",
    labelEn: "Companies",
    labelAr: "الشركات",
    section: "admin_security",
    roles: ["platform_manager"],
  },
  {
    id: "roadmap",
    href: "/roadmap",
    labelEn: "Roadmap",
    labelAr: "خارطة الطريق",
    section: "roadmap",
  },
];

export const SECTION_LABELS: Record<
  NavSection,
  { labelEn: string; labelAr: string; subtitleEn?: string; subtitleAr?: string }
> = {
  home: {
    labelEn: "Home",
    labelAr: "الرئيسية",
    subtitleEn: "Demo KPIs",
    subtitleAr: "مؤشرات العرض",
  },
  recruitment: {
    labelEn: "Recruitment",
    labelAr: "التوظيف",
    subtitleEn: "Hiring journey",
    subtitleAr: "رحلة التوظيف",
  },
  hr_operations: {
    labelEn: "HR Operations",
    labelAr: "عمليات الموارد",
    subtitleEn: "People and execution",
    subtitleAr: "الأشخاص والتنفيذ",
  },
  admin_security: {
    labelEn: "Admin & Security",
    labelAr: "الإدارة والأمان",
    subtitleEn: "Control and governance",
    subtitleAr: "التحكم والحوكمة",
  },
  roadmap: {
    labelEn: "Roadmap",
    labelAr: "خارطة الطريق",
    subtitleEn: "Coming modules",
    subtitleAr: "الوحدات القادمة",
  },
};

/** Visual accent per section (sidebar strip / header hints). */
export const SECTION_ACCENTS: Record<
  NavSection,
  { bar: string; softBg: string }
> = {
  home: { bar: "bg-[#003366]", softBg: "bg-[#003366]/8" },
  recruitment: { bar: "bg-[#C5A059]", softBg: "bg-amber-500/10" },
  hr_operations: { bar: "bg-[#00A3A3]", softBg: "bg-teal-500/10" },
  admin_security: { bar: "bg-violet-600", softBg: "bg-violet-500/10" },
  roadmap: { bar: "bg-slate-400", softBg: "bg-slate-400/10" },
};

/** Primary landing route per major module (module switcher / quick nav). */
export const SECTION_HUB_HREF: Record<NavSection, string> = {
  home: "/dashboard",
  recruitment: "/recruitment",
  hr_operations: "/hrms/home",
  admin_security: "/security",
  roadmap: "/roadmap",
};

/** Which top-level module the current path belongs to (for highlighting the rail). */
export function moduleSectionFromPathname(pathname: string): NavSection | null {
  if (pathname.startsWith("/platform")) return "admin_security";
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
    return "home";
  if (pathname === "/ai" || pathname.startsWith("/ai/")) return "home";
  if (pathname.startsWith("/recruitment")) return "recruitment";
  if (
    pathname === "/security" ||
    pathname.startsWith("/security/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/hr/roles")
  )
    return "admin_security";
  if (
    pathname.startsWith("/hrms") ||
    pathname.startsWith("/hr/")
  )
    return "hr_operations";
  if (pathname === "/roadmap" || pathname.startsWith("/roadmap/")) return "roadmap";
  if (pathname.startsWith("/future")) return "roadmap";
  return null;
}
