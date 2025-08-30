/* eslint-disable @next/next/no-img-element */
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

export function ClientLogos() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-24 sm:gap-y-10">
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
      </div>
    </div>
  )
}
