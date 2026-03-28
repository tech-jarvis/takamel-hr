export type RoleId =
  | "platform_manager"
  | "company_super_admin"
  | "hr_admin"
  | "hiring_manager"
  | "employee";

export type LoginScope = "platform" | "company";

export interface Role {
  id: RoleId;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  scope: LoginScope;
}

export const ROLES: Role[] = [
  {
    id: "platform_manager",
    labelEn: "Platform manager",
    labelAr: "مدير المنصة",
    descriptionEn: "Create companies, configure tenants, full cross-tenant access (prototype).",
    descriptionAr: "إنشاء الشركات وإعداد المستأجرين ووصول كامل عبر المنصة (نموذج).",
    scope: "platform",
  },
  {
    id: "company_super_admin",
    labelEn: "Company super admin",
    labelAr: "مسؤول أعلى للشركة",
    descriptionEn: "Full access inside one company: HR suite, recruitment, roles, and reports.",
    descriptionAr: "صلاحيات كاملة داخل الشركة: الموارد البشرية والتوظيف والأدوار والتقارير.",
    scope: "company",
  },
  {
    id: "hr_admin",
    labelEn: "HR admin",
    labelAr: "مسؤول الموارد البشرية",
    descriptionEn: "HR operations, compliance, org, onboarding/offboarding, limited recruiting.",
    descriptionAr: "عمليات الموارد البشرية والامتثال والهيكل والانضمام/الإنهاء.",
    scope: "company",
  },
  {
    id: "hiring_manager",
    labelEn: "Hiring manager",
    labelAr: "مدير التوظيف",
    descriptionEn: "Recruiting pipeline, candidates, interviews, and offers.",
    descriptionAr: "مسار التوظيف والمرشحين والمقابلات والعروض.",
    scope: "company",
  },
  {
    id: "employee",
    labelEn: "Employee",
    labelAr: "موظف",
    descriptionEn: "Self-service HRMS: profile, team, PTO, tasks, directory.",
    descriptionAr: "الخدمة الذاتية: الملف والفريق والإجازات والمهام.",
    scope: "company",
  },
];

export const COMPANY_ROLES = ROLES.filter((r) => r.scope === "company");

export function roleById(id: RoleId): Role {
  return ROLES.find((r) => r.id === id) ?? ROLES[0];
}

export type RoleAllowedContext = {
  /** Auth scope: platform-mode PM gets full nav; company roles use strict RBAC only. */
  loginScope: LoginScope;
};

/**
 * Navigation / feature checks. Platform manager only bypasses menu restrictions when
 * `loginScope === "platform"` (operator console). Company sessions never get that bypass.
 */
export function roleAllowed(
  role: RoleId,
  allowed?: RoleId[],
  ctx?: RoleAllowedContext
): boolean {
  if (!allowed || allowed.length === 0) return true;
  if (
    ctx?.loginScope === "platform" &&
    role === "platform_manager"
  ) {
    return true;
  }
  return allowed.includes(role);
}
