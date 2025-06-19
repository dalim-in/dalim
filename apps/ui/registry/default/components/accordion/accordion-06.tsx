import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"
 

export default function Component() {
  return (
    <div className="space-y-4"> 
      <Accordion
      type="single"
      collapsible
      className="w-[350px] border rounded-xl md:w-md space-y-1"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0">Dalim UI</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 text-balance">
         <div className="overflow-hidden px-4">
          <div className="pt-1 font-mono text-sm">
            <p>
              This example demonstrates how you can use{" "}
              <strong className="font-bold">Dalim Icons</strong>.
            </p>
            <pre className="mt-2 rounded-md bg-zinc-100 p-2 text-xs dark:bg-zinc-950">
              {`import { AArrowUp } from 'dalim-icons';
    
const App = () => {
  return (
    <AArrowUp />
  );
}

export default App;`}
            </pre>
          </div>
        </div>
        </AccordionContent>
      </AccordionItem> 
    </Accordion>
    </div>
  )
}
