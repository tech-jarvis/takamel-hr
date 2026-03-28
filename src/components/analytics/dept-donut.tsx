"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DEPT_DISTRIBUTION } from "@/lib/data/dummy";

const COLORS = ["#003366", "#00A3A3", "#2ECC71", "#C5A059", "#94a3b8"];

export function DeptDonutChart({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#003366]">{title}</h3>
      <div className="mt-2 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DEPT_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={2}
            >
              {DEPT_DISTRIBUTION.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
