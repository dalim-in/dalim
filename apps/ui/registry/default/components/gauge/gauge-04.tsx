import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={46}
        size={200}
        gaugeType="half"
        primary={{
          0: "danger",
          30: "warning",
          70: "success",
        }}
        thresholds={[
          { value: 30, color: "#f59e0b" },
          { value: 70, color: "#22c55e" },
        ]}
        label="Speed"
        unit=" mph"
        max={120}
        transition={{ length: 1800, delay: 0 }}
      />
    </main>
  )
}
