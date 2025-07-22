import { Heart, MessageCircle, Share2 } from "lucide-react"

import { Card, CardContent } from "@/registry/default/ui/card"
import { Marquee } from "@/registry/default/ui/marquee"

const socialPosts = [
  {
    user: "@johndoe",
    content:
      "Just shipped a new feature using this amazing component library! 🚀",
    likes: 42,
    comments: 8,
    shares: 12,
  },
  {
    user: "@designergirl",
    content:
      "The attention to detail in these components is incredible. Props to the team! 👏",
    likes: 89,
    comments: 15,
    shares: 23,
  },
  {
    user: "@devmaster",
    content:
      "Finally, a component library that doesn't get in my way. Clean and efficient! ⚡",
    likes: 156,
    comments: 32,
    shares: 45,
  },
]

export default function Component() {
  return (
    <main>
      <Marquee
        vertical
        className="h-96 w-80 border rounded-3xl"
        pauseOnHover
      >
        {socialPosts.map((post, index) => (
          <Card key={index} className="w-full rounded-md">
            <CardContent className="p-4 py-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
                    {post.user[1].toUpperCase()}
                  </div>
                  <span className="font-medium">{post.user}</span>
                </div>
                <p className="text-sm ">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-primary/60">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </main>
  )
}
