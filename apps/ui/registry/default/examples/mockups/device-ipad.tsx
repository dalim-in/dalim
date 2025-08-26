import { Device } from "@/registry/default/ui/mockups/device"

export default function Component() {
  return (
    <div className="relative">
      <Device variant="ipad" width={400} src="/images/1.jpeg" />
    </div>
  )
}
