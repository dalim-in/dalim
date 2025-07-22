import { Marquee } from "@/registry/default/ui/marquee"

export default function Component() {
  const items = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
  ]
  return (
    <main>
      <Marquee reverse className="p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-md border px-4 py-2 font-medium "
          >
            {item}
          </div>
        ))}
      </Marquee>
    </main>
  )
}
