import { DalimBlackIcon } from "@dalim/core/components/logo"

import Book from "@/registry/default/ui/book"

export default function Component() {
  return (
    <main className="flex flex-col items-center gap-6">
      <Book depth={8} color="#fff200" variant="notebook" textColor="black">
        <div className="space-y-2 mt-8 text-center text-black">
          <div className="flex justify-center">
            <DalimBlackIcon />
          </div>
          <h1 className="pt-2 text-2xl leading-6 font-bold tracking-tighter">
            Designs <br /> That Gives
          </h1>
          <p className="mt-2 text-xs leading-3 opacity-70">
            A Practical Handbook for Visual Consistency & Creativity
          </p>
        </div>
      </Book>
    </main>
  )
}
