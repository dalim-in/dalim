import { Suspense } from "react"
import { auth } from "@dalim/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Bell } from "lucide-react" 
import { NotificationsList } from "@/src/components/dashboard/notification/notifications-list"

export default async function NotificationsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <p className="text-muted-foreground mt-2">Stay updated with your latest notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="p-8 text-center">Loading notifications...</div>}>
            <NotificationsList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
