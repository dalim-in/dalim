import { DalimYellowIcon } from "@dalim/core/components/logo"

import Book from "@/registry/default/ui/book"

export default function Component() {
  return (
    <main className="flex flex-col items-center gap-6">
      <Book author="Ali" bookmark textColor="white" >
        <div className="pl-3 text-white space-y-2">
           <DalimYellowIcon />
        <h1 className="font-semibold text-3xl pt-2 leading-7">
            Learn <br/> Designs
          </h1>
        <p className="leading-3 text-xs opacity-70">
          A Practical Handbook for Visual Consistency & Creativity
        </p>
        </div> 
      </Book>
    </main>
  )
}
