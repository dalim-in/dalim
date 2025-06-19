import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar className="rounded-lg">
          <AvatarImage src="https://dalim.in/ali.jpg" alt="@ali" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://dalim.in/ali.jpg" alt="@ali" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage
            src="https://dalim.in/ali.jpg"
            alt="@ali"
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
           
          <AvatarFallback>+3</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
