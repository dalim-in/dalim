import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar className="rounded-lg">
        <AvatarImage src="https://dalim.in/ali.jpg" alt="@ali" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar> 
    </div>
  )
}
