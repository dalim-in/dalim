import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={75}
        size={200}
        primary={{
          0: "#ef4444",
          25: "#f97316",
          50: "#eab308",
          75: "#fff200",
          90: "#3b82f6",
        }}
        strokeWidth={12}
        label="Health Score"
        glowEffect={true}
        transition={{ length: 2000, delay: 150 }}
      />
    </main>
  )
}
