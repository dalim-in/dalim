import Link from "next/link"

import { BlockDisplay } from "@/src/components/blocks/block-display"
import { Button } from "@/registry/default/ui/button"
 
export const revalidate = false

const FEATURED_BLOCKS = [
  "hero-01", 
  "hero-04", 
  "logos-03", 
  "pricing-01", 
  "call-to-action-02", 
]

export default async function BlocksPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {FEATURED_BLOCKS.map((name) => (
        <BlockDisplay name={name} key={name} />
      ))}
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button asChild variant="outline">
            <Link href="/blocks/sidebar">Browse more blocks</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
