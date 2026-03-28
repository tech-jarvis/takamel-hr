"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#003366]">Reset password</h1>
      <p className="mt-2 text-sm text-slate-600">
        Prototype only — no email is sent. In production this would trigger a secure reset link.
      </p>
      {sent ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-sm text-emerald-900">
          If an account exists for <strong>{email || "that address"}</strong>, we would email the next
          steps. (Demo: nothing was sent.)
          <Link href="/login" className="mt-4 block font-medium text-teal-800 hover:underline">
            Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="fp-email">
              Work email
            </label>
            <input
              id="fp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-teal-500/30 focus:ring-2"
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-xl py-3">
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-teal-700 hover:underline">
          ← Sign in
        </Link>
      </p>
    </div>
  );
}
