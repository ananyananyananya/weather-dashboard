import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function SensorChart({ title, dataKey, color, history }) {
  return (
    <div className="chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={history}>
          <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
            backgroundColor: "#111318",
            border: "1px solid #2a2f3a",
            borderRadius: "8px",
            color: "#e5e7eb"
            }}
            labelStyle={{
            color: "#9ca3af", 
            fontSize: "0.85rem"
            }}
            itemStyle={{
            color: "#ffffff",
            textTransform: "capitalize"
            }}
            />
          <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}