import { DalimBlackIcon } from "@dalim/core/components/logo"

import Book from "@/registry/default/ui/book"

export default function Component() {
  return (
    <main className="flex flex-col items-center gap-6">
      <Book
        author="Ali"
        variant="notebook"
        color="white"
        depth={8}
        pages={200}
        height={204}
        width={300}
        orientation="landscape"
        textColor="black"
      >
        <div className="space-y-2 -mt-4 text-center text-black">
          <div className="flex justify-center">
            <DalimBlackIcon />
          </div>
          <h1 className="pt-2 text-3xl leading-8 tracking-tighter font-bold">
            Designs <br /> That Gives
          </h1>
          <p className="mt-2 text-xs leading-3 px-10 opacity-70">
            A Practical Handbook for Visual Consistency & Creativity
          </p>
        </div>
      </Book>
    </main>
  )
}
