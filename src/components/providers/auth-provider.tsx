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
import type { LoginScope } from "@/lib/config/roles";
import type { TenantId } from "@/lib/config/tenants";
import { TENANTS } from "@/lib/config/tenants";

const STORAGE_KEY = "takamel.session";

function readStoredTenantId(): TenantId {
  if (typeof window === "undefined") return TENANTS[0].id;
  const allowed = TENANTS.map((t) => t.id);
  const v = window.localStorage.getItem("takamel.tenantId");
  if (v && allowed.includes(v as TenantId)) return v as TenantId;
  return TENANTS[0].id;
}

export interface AuthSession {
  email: string;
  signedInAt: string;
  scope: LoginScope;
  /** Set for company scope: single org; not switchable in the UI. */
  tenantId?: TenantId;
}

interface AuthContextValue {
  ready: boolean;
  session: AuthSession | null;
  signIn: (
    email: string,
    password?: string,
    opts?: { scope?: LoginScope; tenantId?: TenantId }
  ) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession & {
      scope?: LoginScope;
      tenantId?: TenantId;
    };
    const scope = parsed.scope ?? "company";
    let tenantId = parsed.tenantId;
    if (scope === "company" && !tenantId) {
      tenantId = readStoredTenantId();
      const migrated: AuthSession = {
        email: parsed.email,
        signedInAt: parsed.signedInAt,
        scope: "company",
        tenantId,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
    return {
      email: parsed.email,
      signedInAt: parsed.signedInAt,
      scope,
      tenantId: scope === "platform" ? undefined : tenantId,
    };
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
      opts?: { scope?: LoginScope; tenantId?: TenantId }
    ) => {
      void password;
      const trimmed = email.trim();
      if (!trimmed) return;
      const scope = opts?.scope ?? "company";
      const next: AuthSession = {
        email: trimmed,
        signedInAt: new Date().toISOString(),
        scope,
        tenantId:
          scope === "platform"
            ? undefined
            : (opts?.tenantId ?? readStoredTenantId()),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSession(next);
    },
    []
  );

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ ready, session, signIn, signOut }),
    [ready, session, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
