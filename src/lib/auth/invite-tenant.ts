import type { TenantId } from "@/lib/config/tenants";
import { TENANTS } from "@/lib/config/tenants";

/** Demo: derive tenant from invite token until API resolves token → org. */
export function tenantIdFromInviteToken(token: string): TenantId {
  const lower = token.toLowerCase();
  if (lower.includes("oasis")) return "oasis_retail";
  if (lower.includes("red") || lower.includes("sea") || lower.includes("hospitality"))
    return "red_sea_hospitality";

  let h = 0;
  for (let i = 0; i < token.length; i++) {
    h = (h * 31 + token.charCodeAt(i)) | 0;
  }
  const ids = TENANTS.map((t) => t.id);
  return ids[Math.abs(h) % ids.length];
}
