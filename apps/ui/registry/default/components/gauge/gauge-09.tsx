import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={24}
        size={80} 
        tickMarks={true}
        transition={{
          length: 2000,
          delay: 0,
        }}
      />
    </main>
  )
}
