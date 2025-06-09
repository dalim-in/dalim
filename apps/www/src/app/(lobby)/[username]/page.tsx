import { UserProfile } from "@/src/components/profiles/user-profile"
import { prisma } from "@dalim/db"
import { notFound } from "next/navigation"
import type { Metadata } from "next/types"
import { Suspense } from "react"
import { FontsList } from "@/src/components/creators/fonts/font-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs"
import { GraphicsGrid } from "@/src/components/creators/graphic/graphics-grid"
import { getUserGraphics } from "../../../../../graphic/src/actions/graphic"

interface ProfilePageProps {
  params: {
    username: string
  }
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      summary: true,
      image: true,
      coverImage: true,
      website: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      createdAt: true,
      emailVerified: true,
      fonts: {
        select: {
          id: true,
          viewCount: true,
          downloadCount: true,
          userId: true,
        },
      },
      graphics: {
        select: {
          id: true,
          viewCount: true,
          downloadCount: true,
          userId: true,
        },
      },
    },
  })

  return user
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    select: {
      name: true,
      username: true,
      bio: true,
      image: true,
    },
  })


  if (!user) {
    return {
      title: "User Not Found",
    }
  }

  return {
    title: `${user.name || user.username} (${user.username})`,
    description: user.bio || `Check out ${user.name || user.username}'s profile`,
    openGraph: {
      title: `${user.name || user.username} (${user.username})`,
      description: user.bio || `Check out ${user.name || user.username}'s profile`,
      images: user.image ? [{ url: user.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name || user.username} (${user.username})`,
      description: user.bio || `Check out ${user.name || user.username}'s profile`,
      images: user.image ? [user.image] : [],
    },
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUser(params.username)

  if (!user) {
    notFound()
  }

  // Get user's graphics with proper data structure
  const { graphics } = await getUserGraphics(user.id, { limit: 50 })

  // Transform graphics data to include user info for each graphic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphicsWithUser = graphics.map((graphic: any) => ({
    ...graphic,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
    },
  }))

  return (
    <div className="-mt-14">
      <UserProfile user={user} />
      <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

      <div className="mx-auto max-w-6xl border-x px-6 py-6">
        <div className="w-full">
          <Tabs defaultValue="fonts" className="flex flex-col items-center">
            <TabsList className="flex">
              <TabsTrigger value="fonts" className="w-auto">
                Fonts
              </TabsTrigger>
              <TabsTrigger value="graphics" className="w-auto">
                Graphics
              </TabsTrigger>
              <TabsTrigger value="about" className="w-auto">
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fonts" className="w-full">
              <Suspense fallback={"Loading..."}>
                <FontsList userId={user.id} />
              </Suspense>
            </TabsContent>
            <TabsContent value="graphics" className="w-full">
              <Suspense fallback={"Loading graphics..."}>
                <GraphicsGrid graphics={graphicsWithUser} />
              </Suspense>
            </TabsContent>
            <TabsContent value="about" className="w-full">
              <div className="space-y-6 py-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">About {user.name || user.username}</h3>
                  {user.bio ? (
                    <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No bio available</p>
                  )}
                </div>

                {user.summary && (
                  <div>
                    <h4 className="mb-2 font-medium">Summary</h4>
                    <p className="text-muted-foreground leading-relaxed">{user.summary}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium">Member Since</h4>
                    <p className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {user.website && (
                    <div>
                      <h4 className="mb-2 font-medium">Website</h4>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                </div>

                {(user.twitter || user.instagram || user.linkedin) && (
                  <div>
                    <h4 className="mb-3 font-medium">Social Links</h4>
                    <div className="flex gap-4">
                      {user.twitter && (
                        <a
                          href={`https://twitter.com/${user.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Twitter
                        </a>
                      )}
                      {user.instagram && (
                        <a
                          href={`https://instagram.com/${user.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instagram
                        </a>
                      )}
                      {user.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${user.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
