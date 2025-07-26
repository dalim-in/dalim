import { ScrollProgress } from "@/registry/default/ui/scroll-progress"

export default function Component() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-3 p-6">
        <div className="py-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Scroll Progress Showcase</h1>
          <p className="text-muted-foreground text-lg">
            Customize the scroll progress component with different variants and
            options
          </p>
        </div>
        <ScrollProgress variant={"ice"} showPercentage />
        <ScrollProgress
          variant="rainbow"
          size="lg"
          position={"bottom"}
          showPercentage
           percentagePosition="left" 
        /> 
        <ScrollProgress
          variant="custom"
          customGradient="bg-gradient-to-r mt-18 from-rose-400 to-orange-300"
        />

        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="bg-card rounded-lg border p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Content Block {i + 1}
            </h3>
            <p className="text-muted-foreground mb-3">
              This is sample content to demonstrate the scroll progress
              functionality. As you scroll through this page, you'll see the
              progress indicator update in real-time based on your scroll
              position.
            </p>
            <p className="text-muted-foreground">
              Try changing the variant, size, position, and border radius
              options above to see how they affect the appearance of the scroll
              progress component.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
