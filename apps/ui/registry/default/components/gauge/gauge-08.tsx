import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={47}
        size={180}
        gradient={true}
        primary="info"
        transition={{
          length: 2000,
          delay: 0,
        }}
      />
    </main>
  )
}
