import type { RoleId } from "./roles";

/** Platform = SaaS operator. Recruitment vs HR suite are intentionally separate. */
export type NavSection =
  | "platform"
  | "intelligence"
  | "recruitment"
  | "hr_suite"
  | "future";

/** Sidebar + module rail order */
export const SECTION_ORDER: NavSection[] = [
  "platform",
  "intelligence",
  "recruitment",
  "hr_suite",
  "future",
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
  /* ——— Platform (SaaS) ——— */
  {
    id: "platform_home",
    href: "/platform",
    labelEn: "Platform overview",
    labelAr: "نظرة المنصة",
    section: "platform",
    roles: ["platform_manager"],
  },
  {
    id: "platform_companies",
    href: "/platform/companies",
    labelEn: "Companies",
    labelAr: "الشركات",
    section: "platform",
    roles: ["platform_manager"],
  },
  /* ——— Intelligence ——— */
  {
    id: "dashboard",
    href: "/dashboard",
    labelEn: "Executive overview",
    labelAr: "نظرة تنفيذية",
    section: "intelligence",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "ai",
    href: "/ai",
    labelEn: "AI layer",
    labelAr: "طبقة الذكاء الاصطناعي",
    section: "intelligence",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  /* ——— Recruitment (Workable-class — separate from HR ops) ——— */
  {
    id: "recruitment_hub",
    href: "/recruitment",
    labelEn: "Recruitment hub",
    labelAr: "مركز التوظيف",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_jobs",
    href: "/recruitment/jobs",
    labelEn: "Jobs & postings",
    labelAr: "الوظائف والإعلانات",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_sourcing",
    href: "/recruitment/sourcing",
    labelEn: "Sourcing & job boards",
    labelAr: "المصادر ومواقع الوظائف",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_resumes",
    href: "/recruitment/resumes",
    labelEn: "Resumes & AI screening",
    labelAr: "السير الذاتية والفرز بالذكاء",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_pipeline",
    href: "/recruitment/pipeline",
    labelEn: "Interview stages",
    labelAr: "مراحل المقابلة",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_comms",
    href: "/recruitment/comms",
    labelEn: "Candidate email",
    labelAr: "بريد المرشحين",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "recruitment_hr_sync",
    href: "/recruitment/hr-handoff",
    labelEn: "Handoff to HR",
    labelAr: "التسليم للموارد البشرية",
    section: "recruitment",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  /* ——— HR suite (HRMS + HR operations — same product area) ——— */
  {
    id: "hrms_home",
    href: "/hrms/home",
    labelEn: "Home",
    labelAr: "الرئيسية",
    section: "hr_suite",
  },
  {
    id: "hrms_profile",
    href: "/hrms/profile",
    labelEn: "My profile",
    labelAr: "ملفي الشخصي",
    section: "hr_suite",
  },
  {
    id: "security_session",
    href: "/security",
    labelEn: "Security & session",
    labelAr: "الأمان والجلسة",
    section: "hr_suite",
  },
  {
    id: "hrms_team",
    href: "/hrms/team",
    labelEn: "Team",
    labelAr: "الفريق",
    section: "hr_suite",
  },
  {
    id: "hrms_calendar",
    href: "/hrms/calendar",
    labelEn: "Calendar",
    labelAr: "التقويم",
    section: "hr_suite",
  },
  {
    id: "hrms_people",
    href: "/hrms/people",
    labelEn: "People",
    labelAr: "الأشخاص",
    section: "hr_suite",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
      "employee",
    ],
  },
  {
    id: "hrms_org",
    href: "/hrms/org-chart",
    labelEn: "Org chart",
    labelAr: "الهيكل التنظيمي",
    section: "hr_suite",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
      "employee",
    ],
  },
  {
    id: "hrms_email",
    href: "/hrms/email",
    labelEn: "Email",
    labelAr: "البريد",
    section: "hr_suite",
  },
  {
    id: "hrms_pto",
    href: "/hrms/pto",
    labelEn: "Time off (PTO)",
    labelAr: "الإجازات",
    section: "hr_suite",
  },
  {
    id: "hrms_onboarding",
    href: "/hrms/onboarding",
    labelEn: "My onboarding",
    labelAr: "انضمامي",
    section: "hr_suite",
  },
  {
    id: "hrms_invites",
    href: "/hrms/invites",
    labelEn: "Invites",
    labelAr: "الدعوات",
    section: "hr_suite",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "onboarding_admin",
    href: "/hr/onboarding",
    labelEn: "Onboarding (admin)",
    labelAr: "الانضمام (إداري)",
    section: "hr_suite",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "offboarding",
    href: "/hr/offboarding",
    labelEn: "Offboarding",
    labelAr: "إنهاء الخدمة",
    section: "hr_suite",
    roles: ["platform_manager", "company_super_admin", "hr_admin"],
  },
  {
    id: "tasks",
    href: "/hr/tasks",
    labelEn: "Tasks & workflows",
    labelAr: "المهام وسير العمل",
    section: "hr_suite",
  },
  {
    id: "reports",
    href: "/hr/reports",
    labelEn: "Reports & analytics",
    labelAr: "التقارير والتحليلات",
    section: "hr_suite",
    roles: [
      "platform_manager",
      "company_super_admin",
      "hr_admin",
      "hiring_manager",
    ],
  },
  {
    id: "roles",
    href: "/hr/roles",
    labelEn: "Roles & assignments",
    labelAr: "الأدوار والتعيين",
    section: "hr_suite",
    roles: ["platform_manager", "company_super_admin", "hr_admin"],
  },
  /* ——— Coming modules ——— */
  {
    id: "learning",
    href: "/future/learning",
    labelEn: "Learning (LMS)",
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
  {
    id: "payroll",
    href: "/future/payroll",
    labelEn: "Payroll",
    labelAr: "الرواتب",
    section: "future",
    badge: "soon",
  },
];

export const SECTION_LABELS: Record<
  NavSection,
  { labelEn: string; labelAr: string; subtitleEn?: string; subtitleAr?: string }
> = {
  platform: {
    labelEn: "Platform",
    labelAr: "المنصة",
    subtitleEn: "SaaS operator",
    subtitleAr: "تشغيل المنصة",
  },
  intelligence: {
    labelEn: "Intelligence",
    labelAr: "الذكاء",
    subtitleEn: "Signals & automation",
    subtitleAr: "الإشارات والأتمتة",
  },
  recruitment: {
    labelEn: "Recruitment",
    labelAr: "التوظيف",
    subtitleEn: "Talent acquisition — separate from HR ops",
    subtitleAr: "استقطاب المواهب — منفصل عن عمليات الموارد البشرية",
  },
  hr_suite: {
    labelEn: "HR suite",
    labelAr: "حزمة الموارد البشرية",
    subtitleEn: "HRMS + HR operations",
    subtitleAr: "النظام والعمليات",
  },
  future: {
    labelEn: "More modules",
    labelAr: "وحدات قادمة",
    subtitleEn: "On the roadmap",
    subtitleAr: "في خارطة الطريق",
  },
};

/** Visual accent per section (sidebar strip / header hints). */
export const SECTION_ACCENTS: Record<
  NavSection,
  { bar: string; softBg: string }
> = {
  platform: { bar: "bg-violet-600", softBg: "bg-violet-500/10" },
  intelligence: { bar: "bg-[#003366]", softBg: "bg-[#003366]/8" },
  recruitment: { bar: "bg-[#C5A059]", softBg: "bg-amber-500/10" },
  hr_suite: { bar: "bg-[#00A3A3]", softBg: "bg-teal-500/10" },
  future: { bar: "bg-slate-400", softBg: "bg-slate-400/10" },
};

/** Primary landing route per major module (module switcher / quick nav). */
export const SECTION_HUB_HREF: Record<NavSection, string> = {
  platform: "/platform",
  intelligence: "/dashboard",
  recruitment: "/recruitment",
  hr_suite: "/hrms/home",
  future: "/future/learning",
};

/** Which top-level module the current path belongs to (for highlighting the rail). */
export function moduleSectionFromPathname(pathname: string): NavSection | null {
  if (pathname.startsWith("/platform")) return "platform";
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
    return "intelligence";
  if (pathname === "/ai" || pathname.startsWith("/ai/")) return "intelligence";
  if (pathname.startsWith("/recruitment")) return "recruitment";
  if (
    pathname.startsWith("/hrms") ||
    pathname.startsWith("/hr/") ||
    pathname === "/security" ||
    pathname.startsWith("/security/")
  )
    return "hr_suite";
  if (pathname.startsWith("/future")) return "future";
  return null;
}
