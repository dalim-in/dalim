"use client"
 
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  radius: number
  theme: string // This should be a string (theme name), not the baseColorsV4 type
}

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
  radius: 0.5,
  theme: "stone", // Use a valid theme name from baseColorsV4
})

export function useConfig() {
  return useAtom(configAtom)
}
