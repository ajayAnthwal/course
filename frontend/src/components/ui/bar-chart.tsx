"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
}

export function BarChart({ data, color = "#6366f1", height = 250 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          dx={-4}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
