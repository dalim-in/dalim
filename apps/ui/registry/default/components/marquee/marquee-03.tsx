/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react"

import { Card, CardContent } from "@/registry/default/ui/card"
import { Marquee } from "@/registry/default/ui/marquee"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content:
      "This component library has transformed our development workflow. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Frontend Developer",
    content:
      "Clean, modern, and incredibly easy to use. Perfect for our React projects.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "UI Designer",
    content:
      "The design system is consistent and beautiful. Love the attention to detail.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    content:
      "Excellent documentation and great community support. A must-have toolkit.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
]

export default function Component() {
  return (
    <main>
      <Marquee pauseOnHover>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="mx-1 rounded-3xl w-80">
            <CardContent className="p-6 py-0">
              <div className="mb-4 flex items-center space-x-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="mb-3">{testimonial.content}</p>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#fff200] text-[#fff200]"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </main>
  )
}
