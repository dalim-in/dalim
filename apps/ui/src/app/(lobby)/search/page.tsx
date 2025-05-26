import { Suspense } from "react"
import type { Metadata } from "next" 

import ComponentsContainer from "./components-container"

export const metadata: Metadata = {
  title: "Search - UI",
  description: "Search for components in the Dalim UI library.",
}

export default function Page() {
  return (
    <> 
      <Suspense>
        <ComponentsContainer />
      </Suspense>
    </>
  )
}
