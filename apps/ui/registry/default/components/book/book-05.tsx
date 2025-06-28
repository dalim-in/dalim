import { DalimYellowIcon } from "@dalim/core/components/logo"

import Book from "@/registry/default/ui/book"

export default function Component() {
  return (
    <main className="flex flex-col items-center gap-6">
      <Book
        author="Ali"
        variant="notebook"
        color="black"
        depth={8}
        pages={200}
        height={204}
        width={300}
        orientation="landscape"
        textColor="white"
      >
        <div className="space-y-2 px-3 text-white">
          <div className="absolute top-6 right-6">
            <DalimYellowIcon />
          </div>
          <h1 className="pt-3 text-3xl leading-8 font-bold tracking-tighter">
            Designs That Gives
          </h1>
          <p className="mt-2 pr-4 text-xs leading-3 opacity-70">
            A Practical Handbook for Visual Consistency & Creativity
          </p>
        </div>
      </Book>
    </main>
  )
}
