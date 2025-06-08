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
    <div className="mt-3">
      <ProfileSettingsForm user={user} />
    </div>
  )
}
