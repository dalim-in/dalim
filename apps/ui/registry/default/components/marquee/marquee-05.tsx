 
import { Marquee } from "@/registry/default/ui/marquee"

const technologies = [
  { name: "React", color: "bg-blue-500" },
  { name: "Next.js", color: "bg-black" },
  { name: "TypeScript", color: "bg-blue-600" },
  { name: "Tailwind CSS", color: "bg-cyan-500" },
  { name: "Framer Motion", color: "bg-pink-500" },
  { name: "Radix UI", color: "bg-green-500" },
  { name: "Lucide Icons", color: "bg-orange-500" },
  { name: "shadcn/ui", color: "bg-purple-500" },
]

export default function Component() {
  return (
    <main>
       <Marquee
            className="bg-gradient-to-r py-3 from-purple-500 to-blue-500 rounded-xl shadow-lg [--gap:1rem]"
            pauseOnHover
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-md font-medium border border-white/30"
              >
                {tech.name}
              </div>
            ))}
          </Marquee>
    </main>
  )
}
