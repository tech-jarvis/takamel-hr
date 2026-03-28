import { Suspense } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import type { ReactNode } from "react";

function ShellFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] text-slate-500">
      <p className="text-sm">Loading…</p>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<ShellFallback />}>
      <AuthGuard>
        <AppShell>{children}</AppShell>
      </AuthGuard>
    </Suspense>
  );
}
