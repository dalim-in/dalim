import { Gauge } from "@/registry/default/ui/gauge"

export default function Component() {
  return (
    <main>
      <Gauge
        value={8}
        size={200}
        multiRing={{
          enabled: true,
          rings: [
            { value: 90 * 0.6, color: "#fff200" },
            { value: 63 * 0.6, color: "#10b981" },
          ],
        }} 
        transition={{ length: 1000, delay: 300 }}
      />
    </main>
  )
}
