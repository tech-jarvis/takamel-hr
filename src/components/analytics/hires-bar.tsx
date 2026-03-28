"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HEADCOUNT_TREND } from "@/lib/data/dummy";

export function HiresExitsBar({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#003366]">{title}</h3>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={HEADCOUNT_TREND} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
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
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="hires" name="Hires" fill="#2ECC71" radius={[4, 4, 0, 0]} />
            <Bar dataKey="exits" name="Exits" fill="#C5A059" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
