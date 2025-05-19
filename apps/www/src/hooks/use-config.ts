import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
 

type Config = {
  style: ["name"]
  theme: ["name"]
  radius: number
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
}

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "stone",
  radius: 1,
  packageManager: "pnpm",
  installationType: "cli",
})

export function useConfig() {
  return useAtom(configAtom)
}