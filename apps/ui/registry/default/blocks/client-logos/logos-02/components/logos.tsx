import {
  Apple,
  Dalim,
  Gemini,
  Github,
  Google,
  Grok,
  Nike,
  OpenAI,
  V0,
  Vercel,
} from "dalim-icons"

import { Marquee } from "@/registry/default/ui/common/marquee"

export function ClientLogos() {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-size:100%_100%] [mask-repeat:no-repeat] px-6">
      <main className="">
        <Marquee className="py-6 [--gap:40px]">
          <OpenAI size={40} />
          <V0 size={40} />
          <Gemini size={40} />
          <Grok size={40} />
          <Vercel size={40} />
          <Apple size={40} />
          <Nike size={40} />
          <Dalim size={40} />
          <Github size={40} />
          <Google size={40} />
        </Marquee>
      </main>
    </div>
  )
}
