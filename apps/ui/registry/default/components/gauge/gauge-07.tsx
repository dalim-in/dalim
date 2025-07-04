import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={9}
        size={100}
        strokeWidth={10} 
      />
    </main>
  )
}
