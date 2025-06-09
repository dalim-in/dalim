import { Suspense } from "react"
import { auth } from "@dalim/auth"
import { redirect } from "next/navigation" 
import { NotificationsList } from "@/src/components/dashboard/notification/notifications-list"

export default async function NotificationsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="mt-3">
      <Suspense fallback={<div className="p-8 text-center">Loading notifications...</div>}>
            <NotificationsList />
          </Suspense>
    </div>
  )
}
