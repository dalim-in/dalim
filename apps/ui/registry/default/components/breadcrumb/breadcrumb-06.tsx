import { Dalim } from "dalim-icons"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

export default function Component() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Designs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Select defaultValue="1">
            <SelectTrigger
              id="select-dalim"
              className="relative gap-2 ps-9"
              aria-label="Select dalim"
            >
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[select[disabled]]:opacity-50">
                <Dalim size={16} aria-hidden="true" />
              </div>
              <SelectValue placeholder="Select dalim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Fonts</SelectItem>
              <SelectItem value="2">Graphic</SelectItem>
              <SelectItem value="3">Components</SelectItem>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
