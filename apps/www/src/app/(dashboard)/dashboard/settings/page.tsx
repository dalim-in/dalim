import { auth } from "@dalim/auth"
import { redirect } from "next/navigation" 
import { prisma } from "@dalim/db"
import { ProfileSettingsForm } from "@/src/components/dashboard/settings/profile-settings-form"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      bio: true,
      summary: true,
      image: true,
      coverImage: true,
      website: true,
      twitter: true,
      instagram: true,
      linkedin: true,
      isTwoFactorAuthEnabled: true,
      emailVerified: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <ProfileSettingsForm user={user} />
      </div>
    </div>
  )
}
