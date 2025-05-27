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
      <HeaderUI />
      <Suspense
        fallback={
          <div className="mt-[400px] flex h-screen justify-center">
            <Loader strokeWidth={0.5} className="h-10 w-10 animate-spin" />
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
        <main className="grow mx-auto max-w-6xl border-x px-6">{children}</main>
      </Suspense>
      <FooterUI />
    </div>
  )
}
