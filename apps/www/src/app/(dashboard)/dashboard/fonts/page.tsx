import { FontsDashboard } from "@/src/components/dashboard/fonts/font-dashboard"
import { auth } from "@dalim/auth"
import { redirect } from "next/navigation" 

export default async function FontDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
 
  return (
    <div className="">
      <h1 className="text-3xl font-semibold">Font Dashboard</h1>
      <FontsDashboard  />
    </div>
  );
}
