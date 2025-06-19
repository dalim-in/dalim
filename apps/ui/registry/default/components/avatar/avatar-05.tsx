import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row relative flex-wrap items-center gap-12">
      <Avatar className="rounded-lg">
        <AvatarImage src="https://dalim.in/ali.jpg" alt="@ali" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar> 
      <span className="border-background absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  )
}
