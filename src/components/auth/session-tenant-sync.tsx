"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useAppSettings } from "@/components/providers/app-settings-provider";

/** Aligns tenant + demo role picker with the signed-in session. */
export function SessionTenantSync() {
  const { session, ready } = useAuth();
  const { setTenantId, setRoleId } = useAppSettings();

  useEffect(() => {
    if (!ready || !session) return;
    if (session.scope === "company" && session.tenantId) {
      setTenantId(session.tenantId);
    }
    if (session.roleId) {
      setRoleId(session.roleId);
    }
  }, [ready, session, setTenantId, setRoleId]);

  return null;
}
