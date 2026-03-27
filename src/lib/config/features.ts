import type { TenantId } from "./tenants";

/** Per-tenant feature flags — extend without code changes to routes. */
export interface TenantFeatures {
  aiScreening: boolean;
  aiCopilot: boolean;
  arabicContracts: boolean;
  multiEntity: boolean;
}

const DEFAULT_FEATURES: TenantFeatures = {
  aiScreening: true,
  aiCopilot: true,
  arabicContracts: true,
  multiEntity: false,
};

const OVERRIDES: Partial<Record<TenantId, Partial<TenantFeatures>>> = {
  oasis_retail: { multiEntity: true },
  red_sea_hospitality: { aiCopilot: false },
};

export function featuresForTenant(tenantId: TenantId): TenantFeatures {
  return { ...DEFAULT_FEATURES, ...OVERRIDES[tenantId] };
}
