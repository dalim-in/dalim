/* eslint-disable react/jsx-key */
import {
  Adobe,
  Apple,
  Dalim,
  Gemini,
  Github,
  Google,
  Grok,
  Meta,
  Nike,
  OpenAI,
  V0,
  Vercel,
} from "dalim-icons"

export function ClientLogos() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {[
          <OpenAI size={40} />,
          <V0 size={40} />,
          <Gemini size={40} />,
          <Grok size={40} />,
          <Vercel size={40} />,
          <Apple size={40} />,
          <Nike size={40} />,
          <Dalim size={40} />,
          <Github size={40} />,
          <Google size={40} />,
          <Meta size={40} />,
          <Adobe size={40} />,
        ].map((Logo, i) => (
          <div
            key={i}
            className="bg-background/90 dark:bg-background/60 flex h-20 w-30 items-center justify-center rounded-sm shadow-2xl backdrop-blur-sm md:h-24 md:w-40"
          >
            {Logo}
          </div>
        ))}
      </div>
    </div>
  )
}
