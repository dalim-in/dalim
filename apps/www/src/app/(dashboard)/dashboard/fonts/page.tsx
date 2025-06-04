import { FontsDashboard } from "@/src/components/dashboard/fonts/font-dashboard"
import { auth } from "@dalim/auth"
import { redirect } from "next/navigation" 

export default async function FontDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
 
  return (
    <div className="mt-3"> 
      <FontsDashboard  />
    </div>
  );
}
