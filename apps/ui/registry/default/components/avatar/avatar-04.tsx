import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12 rounded-lg border p-1">
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar className="rounded-lg">
          <AvatarImage src="https://dalim.in/ali.jpg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://dalim.in/ali.jpg" alt="@leerob" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar className="rounded-lg">
          <AvatarImage src="https://dalim.in/ali.jpg" alt="@evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <Avatar className="w-auto items-center bg-background rounded-lg border">
          <p className="text-muted-foreground px-2 text-xs">
            Trusted by{" "}
            <strong className="text-foreground font-medium">90K+</strong>{" "}
            designers.
          </p>
        </Avatar>
      </div>
    </div>
  )
}
