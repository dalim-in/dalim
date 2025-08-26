import { Metadata } from "next" 
import { CardsDemo } from "@/src/components/cards"  
import { ThemeSelector } from "@/src/components/ui/theme-selector" 
import { Hero } from "@/src/components/home/hero" 

const title = "Designs That Give"
const description =
  "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."
 
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
       <div className="flex border-b -mx-6 flex-col items-center text-center">
        <Hero /> 
      </div>
      <ThemeSelector className="hidden py-3 md:flex" />
      <div className="flex-1 pb-6">
        <div className="overflow-hidden"> 
          <section className="theme-container">
            <CardsDemo />
          </section>
        </div>
      </div>
    </div>
  )
}
