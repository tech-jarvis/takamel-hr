"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TenantId } from "@/lib/config/tenants";
import { TENANTS } from "@/lib/config/tenants";
import type { RoleId } from "@/lib/config/roles";
import { ROLES } from "@/lib/config/roles";

export type Locale = "en" | "ar";

const STORAGE = {
  tenant: "takamel.tenantId",
  role: "takamel.roleId",
  locale: "takamel.locale",
} as const;

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): T {
  if (typeof window === "undefined") return fallback;
  const v = window.localStorage.getItem(key) as T | null;
  if (v && allowed.includes(v)) return v;
  return fallback;
}

interface AppSettingsValue {
  tenantId: TenantId;
  setTenantId: (id: TenantId) => void;
  roleId: RoleId;
  setRoleId: (id: RoleId) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  label: (en: string, ar: string) => string;
}

const AppSettingsContext = createContext<AppSettingsValue | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantState] = useState<TenantId>("alrajhi_tech");
  const [roleId, setRoleState] = useState<RoleId>("company_super_admin");
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const tIds = TENANTS.map((t) => t.id);
    setTenantState(readStored(STORAGE.tenant, tIds, "alrajhi_tech"));
    setRoleState(
      readStored(
        STORAGE.role,
        ROLES.map((r) => r.id),
        "company_super_admin"
      )
    );
    setLocaleState(readStored(STORAGE.locale, ["en", "ar"] as const, "en"));
    setHydrated(true);
  }, []);

  const setTenantId = useCallback((id: TenantId) => {
    setTenantState(id);
    window.localStorage.setItem(STORAGE.tenant, id);
  }, []);

  const setRoleId = useCallback((id: RoleId) => {
    setRoleState(id);
    window.localStorage.setItem(STORAGE.role, id);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE.locale, l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [hydrated, locale]);

  const label = useCallback(
    (en: string, ar: string) => (locale === "ar" ? ar : en),
    [locale]
  );

  const value = useMemo(
    () => ({
      tenantId,
      setTenantId,
      roleId,
      setRoleId,
      locale,
      setLocale,
      label,
    }),
    [tenantId, setTenantId, roleId, setRoleId, locale, setLocale, label]
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }
  return ctx;
}
