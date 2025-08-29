import { Device } from "@/registry/default/ui/mockups/device"

export default function Component() {
  return (
    <div className="relative">
      <Device variant="imac" width={400} src="/images/device/display.jpg" />
    </div>
  )
}
