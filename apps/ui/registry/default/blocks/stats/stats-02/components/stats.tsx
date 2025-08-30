import { CounterNumber } from "@/registry/default/ui/texts/counter-number"

export function Stats() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
      <div className="grid gap-1 *:text-center lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-muted space-y-4 rounded-(--radius) py-6 lg:py-12">
          <CounterNumber prefix="+" value={1200} size="xl" />
          <p>Projects Deliver</p>
        </div>
        <div className="bg-muted space-y-4 rounded-(--radius) px-10 py-6 lg:py-12">
          <CounterNumber value={22} suffix="Million" size="xl" />
          <p>Active Requests</p>
        </div>
        <div className="bg-muted space-y-4 rounded-(--radius) py-6 lg:py-12">
          <CounterNumber prefix="+" value={5000} size="xl" />
          <p>App Downloads</p>
        </div>
      </div>
    </div>
  )
}
