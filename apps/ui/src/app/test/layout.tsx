import { Suspense } from "react"
 import { HeaderUI } from "@dalim/core/components/layout/header"
import { Loader } from "lucide-react"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
          <HeaderUI />
          <Suspense
            fallback={
              <div className="mt-[400px] flex h-screen justify-center">
                <Loader strokeWidth={0.5} className="h-10 w-10 animate-spin" />
              </div>
            }
          >
            <main>{children}</main>
          </Suspense>
          
        </div>
  )
}
