import { Gauge } from "@/registry/default/ui/common/gauge"

export function Stats() {
  return (
    <div className="">
      <div className="flex flex-wrap justify-center gap-6 space-y-4 text-center">
        <div className="space-y-3 px-6">
          <Gauge value={23} showPercentage />
          <p>Mobile</p>
        </div>
        <div className="space-y-3 md:border-x md:px-12">
          <Gauge value={65} showPercentage />
          <p>Tablet</p>
        </div>
        <div className="space-y-3 px-6">
          <Gauge value={91} showPercentage />
          <p>Desktop</p>
        </div>
      </div>
    </div>
  )
}
