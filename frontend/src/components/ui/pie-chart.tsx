"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export function PieChart({ data, height = 250 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value: string) => (
            <span style={{ fontSize: "12px", color: "#475569" }}>{value}</span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
