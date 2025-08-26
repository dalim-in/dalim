import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-md space-y-1 rounded-xl border"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0">
            Dalim UI
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-balance">
            <div className="overflow-hidden px-4">
              <div className="pt-1 font-mono text-sm">
                <p>
                  This example demonstrates how you can use{" "}
                  <strong className="font-bold">Dalim Icons</strong>.
                </p>
                <pre className="bg-accent/60 mt-2 rounded-md border p-4 text-xs">
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
