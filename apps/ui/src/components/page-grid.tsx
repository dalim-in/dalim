"use client"
 

export function PageGrid({ children }: { children: React.ReactNode }) {
   
  return (
    <div className="-mx-6 overflow-hidden">
      <div className="-m-px grid grid-cols-12 *:px-6 *:py-12 *:not-first:-ms-px *:not-first:-mt-px sm:*:px-8 xl:*:px-12">
        {children}
      </div>
      
    </div>
  )
}
