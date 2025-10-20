"use client"

import Component2 from "./book-a-demo-6"
import Component1 from "./book-a-demo-7"
import Component3 from "./compare"
import Component4 from "./download"
import Component from "./comp"

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="h-full w-full">
        <Component /> 
        <Component1 />
        <Component2 />
        <Component3/>
        <Component4/>
      </div>
    </main>
  )
}
