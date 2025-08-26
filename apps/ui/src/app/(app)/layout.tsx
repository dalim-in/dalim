import { Suspense } from "react"
import { FooterUI } from "@dalim/core/components/layout/footer"
import { HeaderUI } from "@dalim/core/components/layout/header"
import { Loader } from "lucide-react"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background relative z-10 flex min-h-svh flex-col">
      <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
        <div className="before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mx-auto w-full max-w-7xl before:absolute before:inset-y-0 before:-left-6 before:w-px after:absolute after:inset-y-0 after:-right-6 after:w-px">
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
          <FooterUI />
        </div>
      </div>
    </div>
  )
}
