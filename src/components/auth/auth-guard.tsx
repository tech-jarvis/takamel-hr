"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { isPlatformPath } from "@/lib/auth/route-scope";

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/forgot-password",
]);

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/invite/")) return true;
  return false;
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, session } = useAuth();

  const companyBlockedPlatform =
    Boolean(session?.scope === "company" && isPlatformPath(pathname));

  useEffect(() => {
    if (!ready) return;
    if (isPublicPath(pathname)) return;
    if (!session) {
      const next = encodeURIComponent(
        pathname + (searchParams?.toString() ? `?${searchParams}` : "")
      );
      router.replace(`/login?next=${next}`);
      return;
    }
    if (session.scope === "company" && isPlatformPath(pathname)) {
      router.replace("/hrms/home");
    }
  }, [ready, session, pathname, router, searchParams]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] text-slate-600">
        <p className="text-sm">Loading…</p>
      </div>
    );
  }

  if (!isPublicPath(pathname) && !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] text-slate-600">
        <p className="text-sm">Redirecting to sign in…</p>
      </div>
    );
  }

  if (companyBlockedPlatform) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] text-slate-600">
        <p className="text-sm">Redirecting…</p>
      </div>
    );
  }

  return <>{children}</>;
}
