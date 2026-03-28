"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HEADCOUNT_TREND } from "@/lib/data/dummy";

export function HeadcountChart({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#003366]">{title}</h3>
      {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HEADCOUNT_TREND} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="hcFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A3A3" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#00A3A3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" width={36} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="headcount"
              name="Headcount"
              stroke="#003366"
              strokeWidth={2}
              fill="url(#hcFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
