export type RoleId = "platform_admin" | "hr_admin" | "hiring_manager" | "employee";

export interface Role {
  id: RoleId;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export const ROLES: Role[] = [
  {
    id: "platform_admin",
    labelEn: "Platform admin",
    labelAr: "مسؤول المنصة",
    descriptionEn: "Full configuration across tenants (prototype view).",
    descriptionAr: "إعدادات كاملة عبر المستأجرين (عرض تجريبي).",
  },
  {
    id: "hr_admin",
    labelEn: "HR admin",
    labelAr: "مسؤول الموارد البشرية",
    descriptionEn: "HRMS, compliance, org structure, and bulk operations.",
    descriptionAr: "نظام الموارد البشرية والامتثال والهيكل والعمليات الجماعية.",
  },
  {
    id: "hiring_manager",
    labelEn: "Hiring manager",
    labelAr: "مدير التوظيف",
    descriptionEn: "Recruiting pipeline, interviews, and offers.",
    descriptionAr: "مسار التوظيف والمقابلات والعروض.",
  },
  {
    id: "employee",
    labelEn: "Employee",
    labelAr: "موظف",
    descriptionEn: "Self-service profile, tasks assigned to me.",
    descriptionAr: "الملف الشخصي والمهام الموكلة إليّ.",
  },
];

export function roleById(id: RoleId): Role {
  return ROLES.find((r) => r.id === id) ?? ROLES[0];
}

/** Returns true if the role may see a nav item that lists these roles (empty = all). */
export function roleAllowed(role: RoleId, allowed?: RoleId[]): boolean {
  if (!allowed || allowed.length === 0) return true;
  if (role === "platform_admin") return true;
  return allowed.includes(role);
}
