import { CategoryUI } from "../../../components/home/category"
import { Hero } from "../../../components/home/hero"

export default function UIPage() {
  return (
    <div data-home>
      <div className="flex flex-col items-center text-center">
        <Hero />
      </div>
      <div className="before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))] relative before:absolute before:-inset-x-6 before:top-0 before:h-px"></div>
      <CategoryUI />
    </div>
  )
}
