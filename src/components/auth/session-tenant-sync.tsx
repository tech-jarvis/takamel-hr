"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useAppSettings } from "@/components/providers/app-settings-provider";

/** Keeps UI tenant aligned with the organization bound at company sign-in. */
export function SessionTenantSync() {
  const { session, ready } = useAuth();
  const { setTenantId } = useAppSettings();

  useEffect(() => {
    if (!ready) return;
    if (session?.scope === "company" && session.tenantId) {
      setTenantId(session.tenantId);
    }
  }, [ready, session?.scope, session?.tenantId, setTenantId]);

  return null;
}
