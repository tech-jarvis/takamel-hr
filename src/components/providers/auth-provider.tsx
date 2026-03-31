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
import type { LoginScope, RoleId } from "@/lib/config/roles";
import { ROLES } from "@/lib/config/roles";
import type { TenantId } from "@/lib/config/tenants";
import { TENANTS } from "@/lib/config/tenants";

const STORAGE_KEY = "takamel.session";
const ROLE_STORAGE = "takamel.roleId";

function readStoredTenantId(): TenantId {
  if (typeof window === "undefined") return TENANTS[0].id;
  const allowed = TENANTS.map((t) => t.id);
  const v = window.localStorage.getItem("takamel.tenantId");
  if (v && allowed.includes(v as TenantId)) return v as TenantId;
  return TENANTS[0].id;
}

function readStoredRoleId(): RoleId {
  if (typeof window === "undefined") return "company_super_admin";
  const allowed = ROLES.map((r) => r.id);
  const v = window.localStorage.getItem(ROLE_STORAGE);
  if (v && allowed.includes(v as RoleId)) return v as RoleId;
  return "company_super_admin";
}

export interface AuthSession {
  email: string;
  signedInAt: string;
  scope: LoginScope;
  /** Permissions for this session (prototype; production = IdP claims). */
  roleId: RoleId;
  /** Set for company scope: single org; not switchable in the UI. */
  tenantId?: TenantId;
}

interface AuthContextValue {
  ready: boolean;
  session: AuthSession | null;
  signIn: (
    email: string,
    password?: string,
    opts?: { scope?: LoginScope; tenantId?: TenantId; roleId?: RoleId }
  ) => void;
  updateRole: (roleId: RoleId) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeSessionRole(scope: LoginScope, roleId: RoleId): RoleId {
  if (scope === "platform") return "platform_manager";
  if (roleId === "platform_manager") return "company_super_admin";
  return roleId;
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession & {
      scope?: LoginScope;
      tenantId?: TenantId;
      roleId?: RoleId;
    };
    const scope = parsed.scope ?? "company";
    let tenantId = parsed.tenantId;
    if (scope === "company" && !tenantId) {
      tenantId = readStoredTenantId();
    }

    let roleId = parsed.roleId;
    if (!roleId) {
      roleId =
        scope === "platform" ? "platform_manager" : readStoredRoleId();
    }
    roleId = normalizeSessionRole(scope, roleId);

    const next: AuthSession = {
      email: parsed.email,
      signedInAt: parsed.signedInAt,
      scope,
      roleId,
      tenantId: scope === "platform" ? undefined : tenantId,
    };
    const prevJson = raw;
    const nextJson = JSON.stringify(next);
    if (prevJson !== nextJson) {
      window.localStorage.setItem(STORAGE_KEY, nextJson);
    }

    return next;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const signIn = useCallback(
    (
      email: string,
      password?: string,
      opts?: { scope?: LoginScope; tenantId?: TenantId; roleId?: RoleId }
    ) => {
      void password;
      const trimmed = email.trim();
      if (!trimmed) return;
      const scope = opts?.scope ?? "company";
      const rawRole =
        opts?.roleId ??
        (scope === "platform" ? "platform_manager" : readStoredRoleId());
      const roleId = normalizeSessionRole(scope, rawRole);
      const next: AuthSession = {
        email: trimmed,
        signedInAt: new Date().toISOString(),
        scope,
        roleId,
        tenantId:
          scope === "platform"
            ? undefined
            : (opts?.tenantId ?? readStoredTenantId()),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.localStorage.setItem(ROLE_STORAGE, roleId);
      setSession(next);
    },
    []
  );

  const updateRole = useCallback((roleId: RoleId) => {
    setSession((prev) => {
      if (!prev) return prev;
      const fixed = normalizeSessionRole(prev.scope, roleId);
      const next = { ...prev, roleId: fixed };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.localStorage.setItem(ROLE_STORAGE, fixed);
      return next;
    });
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ ready, session, signIn, updateRole, signOut }),
    [ready, session, signIn, updateRole, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
