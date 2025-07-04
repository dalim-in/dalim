import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={81}
        size={200}
        gradient={true} 
        primary="success"
        tickMarks={true}
        label="Progress"
        transition={{ length: 1200, delay: 200 }}
      />
    </main>
  )
}
