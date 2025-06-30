import { Device } from "@/registry/default/ui/device"

export default function Component() {
  return (
    <div  className="relative">
      <Device
        variant="macbook"
        width={400}
        src="/images/1.jpeg"  
      />
    </div>
  )
}
