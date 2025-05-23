import { GridPattern } from '@dalim/core/components/backgrunds/grid'

export function Quote() {
    return (
        <div className="relative">
            <div className="relative before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div className="relative border-x p-10">
                <GridPattern
                    width={5}
                    height={5}
                    className="border opacity-50"
                />
                <p className="text-brand">I believe</p>
                <div className="text-[clamp(2rem,7vw,6rem)] leading-none tracking-tighter">
                    <div className="flex">
                        <h1 className="font-semibold leading-none">
                            <span className="pointer-events-none z-10 whitespace-pre-wrap leading-none tracking-tighter">"Design should be easy</span>
                        </h1> 
                    </div>
                    <div className="flex">
                        <p className="font-thin leading-none"> to understand because simple</p>
                    </div>
                    <div className="flex">
                        <h1 className="font-semibold leading-none">
                            <span className="pointer-events-none z-10 whitespace-pre-wrap leading-none tracking-tighter">ideas are quicker to</span>
                        </h1>
                    </div>
                    <h1 className="font-semibold leading-none">
                        <span className="pointer-events-none z-10 whitespace-pre-wrap leading-none tracking-tighter">grasp..."</span>
                    </h1>
                </div>
            </div>
            <div className="relative pt-10 before:absolute before:-inset-x-6 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
        </div>
    )
}
