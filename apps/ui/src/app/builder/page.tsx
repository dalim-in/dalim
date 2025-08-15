import type { Metadata } from "next"

import { CosmicSpectrum } from "./test"

export const metadata: Metadata = {
  title: "Easings - Dalim UI",
  description:
    "A collection of easing utility classes to enhance your Tailwind CSS animations and transitions.",
}
 

export default function Page() {
  return (
    <div className="">  
      <CosmicSpectrum color="original" blur />
    </div>
  )
}
