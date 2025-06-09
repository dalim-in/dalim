import { Suspense } from "react"
import { auth } from "@dalim/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@dalim/core/ui/card"

import { MessageCircle, Users, Clock, CheckCircle } from "lucide-react"
import { QuickAdminContact } from "@/src/components/dashboard/chat/quick-admin-contact"
import { ContactAdminButton } from "@/src/components/dashboard/chat/contact-admin-button"

export default async function SupportPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Redirect admins to admin chat
  if (session.user.role === "ADMIN") {
    redirect("/admin/chat")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Support Center</h1>
        </div>
        <p className="text-muted-foreground mt-2">Get help from our support team</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Contact Card */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <QuickAdminContact />
          </Suspense>
        </div>

        {/* Support Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Support Team</span>
            </CardTitle>
            <CardDescription>Our team is here to help you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Response time: Usually within 2 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Available 24/7</span>
            </div>
            <ContactAdminButton className="w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Support Features */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Chat</CardTitle>
            <CardDescription>Get instant help through our chat system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect directly with our support team for real-time assistance with any questions or issues.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">File Sharing</CardTitle>
            <CardDescription>Share screenshots and files easily</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload images, documents, and other files to help our team better understand your issue.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Support</CardTitle>
            <CardDescription>Fast response for urgent issues</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our admin team prioritizes urgent issues and provides quick resolutions for critical problems.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
