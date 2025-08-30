"use client"

import { ClientLogos } from "@/registry/default/blocks/client-logos/logos-03/components/logos"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      <h1 className="mb-10 px-6 text-center text-lg font-medium">
        We collaborate with the design industry’s leading innovators.
      </h1>
      <ClientLogos />
    </div>
  )
}
