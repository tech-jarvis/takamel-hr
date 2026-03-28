"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export default function InviteAcceptPage() {
  const params = useParams();
  const router = useRouter();
  const token = String(params.token ?? "");
  const { signIn, session, ready } = useAuth();
  const [pendingContinue, setPendingContinue] = useState(false);

  useEffect(() => {
    if (!ready || !session || !pendingContinue) return;
    router.replace("/hrms/onboarding");
  }, [ready, session, pendingContinue, router]);

  function accept() {
    signIn(`invited+${token}@takamel.sa`, undefined, {
      scope: "company",
      tenantId: "alrajhi_tech",
    });
    setPendingContinue(true);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003366]">You&apos;re invited</h1>
      <p className="mt-2 text-sm text-slate-600">
        Token: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{token}</code> — demo
        acceptance sets a local session and opens your onboarding checklist.
      </p>
      <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-700">
        <p>
          <strong>Al Rajhi Digital</strong> (example) invited you to Takamel HR to complete pre-boarding
          tasks before day one.
        </p>
      </div>
      <Button type="button" onClick={accept} className="mt-8 w-full rounded-xl py-3">
        Accept & continue
      </Button>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-teal-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
