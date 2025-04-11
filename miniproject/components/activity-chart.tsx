"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", carbon: 15 },
  { month: "Feb", carbon: 22 },
  { month: "Mar", carbon: 30 },
  { month: "Apr", carbon: 27 },
  { month: "May", carbon: 35 },
  { month: "Jun", carbon: 42 },
  { month: "Jul", carbon: 44 },
  { month: "Aug", carbon: 50 },
  { month: "Sep", carbon: 65 },
  { month: "Oct", carbon: 72 },
  { month: "Nov", carbon: 78 },
  { month: "Dec", carbon: 85 },
]

export function ActivityChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis dataKey="month" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}kg`} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            formatter={(value) => [`${value} kg CO₂`, "Carbon Saved"]}
          />
          <Bar dataKey="carbon" fill="#556B2F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
