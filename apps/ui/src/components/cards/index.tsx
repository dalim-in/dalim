import Link from "next/link"
import { DalimYellowIcon } from "@dalim/core/components/logo"

import { ParticleCircle } from "@/registry/default/ui/backgrounds/particle-circle"
import { PixelAnimation } from "@/registry/default/ui/backgrounds/pixel-animation"
import { Rain } from "@/registry/default/ui/backgrounds/rain"
import { ShaderLines } from "@/registry/default/ui/backgrounds/shader-lines"
import { ShaderRGB } from "@/registry/default/ui/backgrounds/shader-rgb"
import { ShaderRipple } from "@/registry/default/ui/backgrounds/shader-ripple"
import { SnowFlakes } from "@/registry/default/ui/backgrounds/snow-flakes"
import { LiquidButton } from "@/registry/default/ui/button"
import { Awards } from "@/registry/default/ui/common/award"
import { Gauge } from "@/registry/default/ui/common/gauge"
import { Book } from "@/registry/default/ui/mockups/book"
import { Device } from "@/registry/default/ui/mockups/device"
import { FontWeight } from "@/registry/default/ui/texts/font-weight"
import { RainbowEffect } from "@/registry/default/ui/texts/rainbow-effect"

export function CardsDemo() {
  return (
    <div className="grid h-full w-full gap-4 **:data-[slot=card]:shadow-none md:grid-cols-12">
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <ShaderRipple />
      </div> 
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border md:h-full sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <Awards
          variant="award"
          title="WINNER"
          subtitle="A Design Award & Competetion"
          recipient="Ali Imam"
          date="June 2025"
          level="gold"
        />
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
        <Book author="Ali" textColor="white">
          <div className="space-y-2 pl-3 text-white">
            <DalimYellowIcon />
            <h1 className="pt-2 text-3xl leading-7 font-semibold">
              Learn <br /> Designs
            </h1>
            <p className="text-xs leading-3 opacity-70">
              A Practical Handbook for Visual Consistency & Creativity
            </p>
          </div>
        </Book>
      </div>
      <div className="relative flex h-100 md:h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <div className="-mt-16 -ml-8 md:-space-y-3 xl:-space-y-8">
          <RainbowEffect
            className="font-bold tracking-tighter"
            fontSize={6}
            text="Cool"
          />
          <RainbowEffect
            className="-pl-6 font-bold tracking-tighter"
            fontSize={7}
            text="Designs"
          />
        </div>
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border md:h-full sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
        <Gauge
          value={81}
          size={200}
          gradient={true}
          primary="success"
          tickMarks={true}
          label="Progress"
          transition={{ length: 1200, delay: 200 }}
        />
      </div>
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <ParticleCircle
          colors={["#9c88ff", "#7c3aed", "#a855f7", "#c084fc"]}
          particleSize={[1, 5]}
          particleCount={1500}
          size={400}
        />
      </div>
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <ShaderLines />
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
        <PixelAnimation pixelGap={10} />
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <Device src="/dalim.png" className="h-80" variant="imac" />
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
        <LiquidButton className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          Liquid Glass
        </LiquidButton>
      </div>
      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-12">
        <div className="absolute mx-auto w-full max-w-3xl">
          <h1 className="mb-3 text-center text-7xl font-extrabold tracking-tighter text-white md:text-[clamp(2rem,8vw,7rem)]">
            Design is Everything
          </h1>
          <div className="my-8 flex items-center justify-center gap-1">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-500">Available for New Projects</p>
          </div>
        </div>
        <ShaderRGB />
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <SnowFlakes speed={0.2} color="#a855f7" />
      </div>
      <div className="relative flex h-100 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
        <Link href={"/components"}>
          <FontWeight
            text="Let's Go" 
            fontSize={60}
            className="dark:text-[#fff200]"
          />
        </Link>
      </div>
      <div className="relative flex h-100 w-full flex-col items-center justify-center overflow-hidden rounded-xl border sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3">
        <Rain
          intensity={500}
          speed={0.5}
          angle={10}
          color={"rgba(174, 194, 224, 0.6)"}
          dropSize={{ min: 1, max: 2 }}
          lightningEnabled={true}
          lightningFrequency={8}
          thunderEnabled={true}
          thunderVolume={1}
          thunderDelay={2}
          className="relative h-full w-full overflow-hidden"
        ></Rain>
      </div>
    </div>
  )
}
