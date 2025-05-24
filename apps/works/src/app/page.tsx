import { Hero } from '../components/home/hero'
import { Works } from '../components/home/works'

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="relative before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div className="mx-auto py-6 max-w-6xl border-x">
                <Works />
            </div>
        </div>
    )
}
