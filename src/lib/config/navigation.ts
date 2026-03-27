import type { RoleId } from "./roles";

export type NavSection = "intelligence" | "talent" | "hr" | "future";

export interface NavItem {
  id: string;
  href: string;
  labelEn: string;
  labelAr: string;
  section: NavSection;
  /** If set, only these roles see the item (platform_admin always sees). */
  roles?: RoleId[];
  badge?: "soon";
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    href: "/dashboard",
    labelEn: "Overview",
    labelAr: "نظرة عامة",
    section: "intelligence",
  },
  {
    id: "ai",
    href: "/ai",
    labelEn: "AI layer",
    labelAr: "طبقة الذكاء الاصطناعي",
    section: "intelligence",
    roles: ["platform_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "recruitment",
    href: "/recruitment",
    labelEn: "Recruitment",
    labelAr: "التوظيف",
    section: "talent",
    roles: ["platform_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "onboarding",
    href: "/hr/onboarding",
    labelEn: "Onboarding",
    labelAr: "الانضمام",
    section: "hr",
    roles: ["platform_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "offboarding",
    href: "/hr/offboarding",
    labelEn: "Offboarding",
    labelAr: "إنهاء الخدمة",
    section: "hr",
    roles: ["platform_admin", "hr_admin"],
  },
  {
    id: "employees",
    href: "/hr/employees",
    labelEn: "People & profiles",
    labelAr: "الموظفون والملفات",
    section: "hr",
    roles: ["platform_admin", "hr_admin", "hiring_manager", "employee"],
  },
  {
    id: "org",
    href: "/hr/org-chart",
    labelEn: "Org chart",
    labelAr: "الهيكل التنظيمي",
    section: "hr",
    roles: ["platform_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "tasks",
    href: "/hr/tasks",
    labelEn: "Tasks",
    labelAr: "المهام",
    section: "hr",
  },
  {
    id: "reports",
    href: "/hr/reports",
    labelEn: "Reports",
    labelAr: "التقارير",
    section: "hr",
    roles: ["platform_admin", "hr_admin", "hiring_manager"],
  },
  {
    id: "roles",
    href: "/hr/roles",
    labelEn: "Roles & access",
    labelAr: "الأدوار والصلاحيات",
    section: "hr",
    roles: ["platform_admin", "hr_admin"],
  },
  {
    id: "learning",
    href: "/future/learning",
    labelEn: "Learning",
    labelAr: "التعلم",
    section: "future",
    badge: "soon",
  },
  {
    id: "performance",
    href: "/future/performance",
    labelEn: "Performance",
    labelAr: "الأداء",
    section: "future",
    badge: "soon",
  },
  {
    id: "reviews",
    href: "/future/reviews",
    labelEn: "Reviews",
    labelAr: "التقييمات",
    section: "future",
    badge: "soon",
  },
];

export const SECTION_LABELS: Record<
  NavSection,
  { labelEn: string; labelAr: string }
> = {
  intelligence: { labelEn: "Intelligence", labelAr: "ذكاء" },
  talent: { labelEn: "Talent acquisition", labelAr: "استقطاب المواهب" },
  hr: { labelEn: "HR operations", labelAr: "عمليات الموارد البشرية" },
  future: { labelEn: "Coming next", labelAr: "قريباً" },
};
