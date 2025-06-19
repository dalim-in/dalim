import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"
import { Badge } from "@/registry/default/ui/badge"

export default function AvatarDemo() {
  return (
    <div className="relative flex flex-row flex-wrap items-center gap-12">
      <Avatar className="rounded-lg w-12 h-12">
        <AvatarImage src="https://dalim.in/ali.jpg" alt="@ali" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Badge className="border-background rounded-md absolute -top-2 -right-2 min-w-5  px-1">
        6
      </Badge>
    </div>
  )
}
