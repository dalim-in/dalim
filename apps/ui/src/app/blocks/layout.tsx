import { Suspense } from "react"
import CategoryNavbar from "@/src/components/blocks/navbar"
import { PageHeader } from "@dalim/core/components/common/page-header"
import { FooterUI } from "@dalim/core/components/layout/footer"
import { HeaderUI } from "@dalim/core/components/layout/header"
import { Loader } from "lucide-react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
        <div className="before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mx-auto w-full max-w-7xl before:absolute before:inset-y-0 before:-left-6 before:w-px after:absolute after:inset-y-0 after:-right-6 after:w-px">
          <div className="relative flex min-h-screen flex-col">
            <HeaderUI />
            <Suspense
              fallback={
                <div className="mt-[400px] flex h-screen justify-center">
                  <Loader
                    strokeWidth={0.5}
                    className="h-10 w-10 animate-spin"
                  />
                </div>
              }
            >
              <PageHeader
                badge="Category"
                title={`Blocks`}
                className="-mx-6 -mt-14"
                subheading="Explore categorized UI blocks for faster development."
              />
              <CategoryNavbar />
              <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
              <main className="mx-auto max-w-6xl w-full border-x px-6">
                {children}
              </main>
            </Suspense>
            <FooterUI />
          </div>
        </div>
      </div>
    </div>
  )
}
