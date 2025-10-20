"use client"

import { Button } from "@/registry/default/ui/button"
import { Separator } from "@/registry/default/ui/separator"

export default function DemoBlock() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between p-6 py-20">
      <h2 className="mb-10 w-full text-center text-5xl tracking-tighter">
        Available wherever you want it
      </h2>
      <div className="bg-secondary grid h-full w-full gap-6 border p-10 md:grid-cols-3">
        <div className="">
          <div className="space-y-10">
            <img
              src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
              alt="Google"
              className="h-full w-10 items-center justify-center object-contain"
            />
            <h2 className="w-full text-5xl tracking-tighter">Mac</h2>
            <div className="space-y-2">
              <Button className="mx-auto h-12 w-full max-w-sm">
                Download for Apple Silicon
              </Button>
              <Button variant={"outline"} className="mx-auto h-12 w-full max-w-sm">
                Download for Intel
              </Button>
            </div>

            <div className="">
              <p className="text-sm">Minimum Requirements:</p>
              <p className="text-sm">
                macOS versions with Apple security update support. This is
                typically the latest release and the two previous versions.
                10.15 is not supported.
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex items-start">
          <Separator className="mr-6 hidden md:block" orientation="vertical" />
          <Separator className="mb-6 md:hidden block"/>
          <div className="space-y-10">
            <img
              src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
              alt="Google"
              className="h-full w-10 items-center justify-center object-contain"
            />
            <h2 className="w-full text-5xl tracking-tighter">Windows</h2>
            <div className="space-y-2">
              <Button className="mx-auto h-12 w-full max-w-sm">
                Download for x64
              </Button>
              <Button variant={"outline"} className="mx-auto h-12 w-full max-w-sm">
                Download for arm64
              </Button>
            </div>

            <div className="">
              <p className="text-sm">Minimum Requirements:</p>
              <p className="text-sm">Windows 10 (64-bit)</p>
            </div>
          </div>
        </div>
       <div className="md:flex items-start">
          <Separator className="mr-6 hidden md:block" orientation="vertical" />
          <Separator className="mb-6 md:hidden block"/>
          <div className="space-y-10">
            <img
              src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
              alt="Google"
              className="h-full w-10 items-center justify-center object-contain"
            />
            <h2 className="w-full text-5xl tracking-tighter">Linux</h2>
            <div className="space-y-2">
              <Button className="mx-auto h-12 w-full max-w-sm">Download</Button>
            </div>

            <div className="mt-20">
              <p className="text-sm">Minimum Requirements:</p>
              <p className="text-sm">
                {
                  "glibc >= 2.28, glibcxx >= 3.4.25 (e.g. Ubuntu 20, Debian 10, Fedora 36, RHEL 8)"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-md my-6 w-full text-center">
        Want to download an older version?
        <span className="font-semibold cursor-pointer hover:underline">
          {" "}
          View all releases
        </span>
      </p>
      <h2 className="mt-10 w-full text-3xl">
        Want to try upcoming features earlier?
      </h2>
      <p className="text-md mt-3 w-full">
        Download Windsurf Next for early access to new features.
      </p>
    </div>
  )
}
