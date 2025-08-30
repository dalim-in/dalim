import { CounterNumber } from "@/registry/default/ui/texts/counter-number"

export function Stats() {
  return (
    <div className="">
      <div className="grid flex-wrap justify-center gap-6 space-y-4 text-center md:flex">
        <div className="space-y-3 px-6">
          <CounterNumber prefix="+" value={1200} size="xl" />
          <p>Projects Deliver</p>
        </div>
        <div className="space-y-3 md:border-x md:px-12">
          <CounterNumber value={22} suffix="Million" size="xl" />
          <p>Active Requests</p>
        </div>
        <div className="space-y-3 px-6">
          <CounterNumber prefix="+" value={5000} size="xl" />
          <p>App Downloads</p>
        </div>
      </div>
    </div>
  )
}
