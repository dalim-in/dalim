import { BackgroundGradientAnimation } from '@/components/background'

export default function Home() {
    return (
        <div>
            <main className="relative min-h-svh w-screen overflow-hidden">
                <h1 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-extrabold tracking-tighter text-white md:text-7xl dark:text-white">Designs That Give</h1>
                <p className='absolute mt-20 left-1/2 bottom-10 -translate-x-1/2 -translate-y-1/2 z-10 text-black'>Coming Soon</p>
                <BackgroundGradientAnimation />
            </main>
        </div>
    )
}
