import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={25}
        size={200}
        gaugeType="quarter"
        primary="info"
        strokeWidth={8}
        label="CPU"
        tickMarks={true}
        transition={{ length: 1000, delay: 400 }}
      />
    </main>
  )
}
