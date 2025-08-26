import { DalimYellowIcon } from "@dalim/core/components/logo"

import { Book } from "@/registry/default/ui/mockups/book"

export default function Component() {
  return (
    <div className="flex h-full items-center justify-center">
      <Book author="Ali" textColor="white">
        <div className="space-y-2 pl-3 text-white">
          <DalimYellowIcon />
          <h1 className="pt-2 text-3xl leading-7 font-semibold">
            Learn <br /> Designs
          </h1>
          <p className="text-xs leading-3 opacity-70">
            A Practical Handbook for Visual Consistency & Creativity
          </p>
        </div>
      </Book>
    </div>
  )
}
