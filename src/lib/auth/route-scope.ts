import type { LoginScope, RoleId } from "@/lib/config/roles";

export function isPlatformPath(pathname: string): boolean {
  return pathname === "/platform" || pathname.startsWith("/platform/");
}

function isInvitePath(pathname: string): boolean {
  return pathname.startsWith("/invite/");
}

/** First screen after sign-in when no ?next= (role-aware for company). */
export function defaultPostLoginPath(scope: LoginScope, roleId: RoleId): string {
  if (scope === "platform") return "/platform/companies";
  switch (roleId) {
    case "company_super_admin":
    case "hr_admin":
      return "/dashboard";
    case "hiring_manager":
      return "/recruitment";
    case "employee":
    default:
      return "/hrms/home";
  }
}

/**
 * Sanitize ?next= for scope. Company users never land on platform routes.
 * Platform operators do not accept invite links as their entry path.
 */
export function safePostLoginPath(
  nextParam: string | null,
  scope: LoginScope
): string {
  const platformDef = "/platform/companies";
  const companyDef = "/hrms/home";
  const def = scope === "platform" ? platformDef : companyDef;

  if (!nextParam?.startsWith("/")) return def;

  const raw = nextParam;

  if (scope === "company" && isPlatformPath(raw)) return companyDef;

  if (scope === "platform" && isInvitePath(raw)) return platformDef;

  if (
    scope === "platform" &&
    (raw === "/login" ||
      raw.startsWith("/login?") ||
      raw === "/forgot-password" ||
      raw.startsWith("/forgot-password?"))
  ) {
    return platformDef;
  }

  return raw;
}

export function resolvePostLoginDestination(
  nextParam: string | null,
  scope: LoginScope,
  roleId: RoleId
): string {
  if (nextParam?.startsWith("/")) {
    return safePostLoginPath(nextParam, scope);
  }
  return defaultPostLoginPath(scope, roleId);
}
