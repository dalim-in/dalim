import { FontsAdmin } from "@/src/components/admin/fonts/font-admin"
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
      <FontsAdmin  />
    </div>
  );
}
