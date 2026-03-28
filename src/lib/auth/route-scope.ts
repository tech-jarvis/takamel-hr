import type { LoginScope } from "@/lib/config/roles";

export function isPlatformPath(pathname: string): boolean {
  return pathname === "/platform" || pathname.startsWith("/platform/");
}

/** After sign-in, never send company sessions to operator routes from ?next=. */
export function safePostLoginPath(
  nextParam: string | null,
  scope: LoginScope
): string {
  const def = scope === "platform" ? "/platform/companies" : "/hrms/home";
  const raw = nextParam?.startsWith("/") ? nextParam : def;
  if (scope === "company" && isPlatformPath(raw)) return def;
  return raw;
}
