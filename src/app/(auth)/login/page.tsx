"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, Suspense } from "react";
import { Building2, Landmark } from "lucide-react";
import { useAppSettings } from "@/components/providers/app-settings-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { COMPANY_ROLES, type LoginScope, type RoleId } from "@/lib/config/roles";
import { resolvePostLoginDestination } from "@/lib/auth/route-scope";
import type { TenantId } from "@/lib/config/tenants";
import { TENANTS } from "@/lib/config/tenants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { label } = useAppSettings();
  const { session, signIn, ready } = useAuth();
  const [email, setEmail] = useState("admin@company.sa");
  const [password, setPassword] = useState("demo1234");
  const [scope, setScope] = useState<LoginScope>("company");
  const [companyRoleId, setCompanyRoleId] = useState<RoleId>("company_super_admin");
  const [companyTenantId, setCompanyTenantId] = useState<TenantId>(
    TENANTS[0].id
  );
  const nextParam = searchParams.get("next");
  const scopeQuery = searchParams.get("scope");

  useEffect(() => {
    if (scopeQuery === "platform" || scopeQuery === "company") {
      setScope(scopeQuery);
    }
  }, [scopeQuery]);

  useEffect(() => {
    const allowed = TENANTS.map((t) => t.id);
    const v = window.localStorage.getItem("takamel.tenantId");
    if (v && allowed.includes(v as TenantId)) {
      setCompanyTenantId(v as TenantId);
    }
  }, []);

  useEffect(() => {
    if (!ready || !session) return;
    const path = resolvePostLoginDestination(
      nextParam,
      session.scope,
      session.roleId
    );
    router.replace(path);
  }, [ready, session, router, nextParam]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) return;
    signIn(email, password, {
      scope,
      tenantId: scope === "company" ? companyTenantId : undefined,
      roleId: scope === "company" ? companyRoleId : "platform_manager",
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003366]">
        {scope === "platform" ? "Platform sign in" : "Company sign in"}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {scope === "platform"
          ? "For Takamel operators who create and manage customer companies."
          : "For company super admins, HR, hiring managers, and employees."}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setScope("company")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center text-sm font-medium transition",
            scope === "company"
              ? "border-teal-500 bg-teal-50/80 text-[#003366]"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          )}
        >
          <Building2 className="h-6 w-6" />
          {scope === "company" ? "Company" : "شركة"}
          <span className="text-[10px] font-normal text-slate-500">
            Super admin · HR · Staff
          </span>
        </button>
        <button
          type="button"
          onClick={() => setScope("platform")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center text-sm font-medium transition",
            scope === "platform"
              ? "border-violet-500 bg-violet-50/90 text-violet-900"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          )}
        >
          <Landmark className="h-6 w-6" />
          Platform
          <span className="text-[10px] font-normal text-slate-500">
            Create companies
          </span>
        </button>
      </div>

      {scope === "company" ? (
        <div className="mt-6 space-y-4">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="org"
          >
            {label("Organization", "المؤسسة")}
          </label>
          <select
            id="org"
            value={companyTenantId}
            onChange={(e) => setCompanyTenantId(e.target.value as TenantId)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-teal-500/30 focus:ring-2"
          >
            {TENANTS.map((t) => (
              <option key={t.id} value={t.id}>
                {label(t.nameEn, t.nameAr)} — {t.industry}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-slate-500">
            {label(
              "You will only see this company after sign-in. Switching org requires signing out.",
              "سترى هذه الشركة فقط بعد تسجيل الدخول. تغيير المؤسسة يتطلب تسجيل الخروج."
            )}
          </p>
          <div>
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="role"
            >
              {label("Sign in as", "الدخول كـ")}
            </label>
            <select
              id="role"
              value={companyRoleId}
              onChange={(e) => setCompanyRoleId(e.target.value as RoleId)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-teal-500/30 focus:ring-2"
            >
              {COMPANY_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {label(r.labelEn, r.labelAr)}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-teal-500/30 focus:ring-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-teal-500/30 focus:ring-2"
            required
            minLength={6}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-teal-700 hover:underline"
          >
            {label("Forgot password?", "نسيت كلمة المرور؟")}
          </Link>
        </div>
        <Button type="submit" className="w-full rounded-xl py-3">
          Continue
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New hire?{" "}
        <Link href="/invite/demo-token" className="font-medium text-teal-700 hover:underline">
          Sample invite
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-700">
          ← Product home
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
      <LoginForm />
    </Suspense>
  );
}
