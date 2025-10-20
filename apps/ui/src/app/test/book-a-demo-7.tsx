"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { Separator } from "@/registry/default/ui/separator"
import { Textarea } from "@/registry/default/ui/textarea"

export default function DemoBlock() {
  return (
    <div className="flex flex-col py-20 mx-auto max-w-5xl items-center justify-between p-6 md:flex-row">
      <div className="w-full">
        <div className="space-y-6">
          <h1 className="text-xl font-light text-green-500">
            Connect with an AI Specialist
          </h1>
          <h2 className="w-full text-5xl tracking-tighter font-semibold">
            Let’s tackle your <br className="hidden md:block"/> key data issues together
          </h2>
        </div>
        <div className="mt-6 grid w-full lg:grid-cols-2 border">
          <form className="space-y-8 lg:border-r p-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text" 
                  placeholder="First Name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  type="text" 
                  placeholder="Organization"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  type="text" 
                  placeholder="Position"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  type="email" 
                  placeholder="Business Email"
                  className="mt-2"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Project Budget ( select one )</Label>
              <div className="mt-2 flex justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{"<$50k"}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{"$50k – $250k"}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{"$250k – $1M"}</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{"$1M – $5M"}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{"$5M – $10M"}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-6 w-6 rounded-full" />
                    <Label>{">$10M"}</Label>
                  </div>
                </div>
              </div>
              <Separator className="my-6 w-full" />
              <div>
                <Label>
                  Which Sector do you represent? (select all that apply)
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="mt-2 h-6 w-6" />
                    <Label>Commercial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="mt-2 h-6 w-6" />
                    <Label>Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="mt-2 h-6 w-6" />
                    <Label>Charity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="mt-2 h-6 w-6" />
                    <Label>Other</Label>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6 w-full" />
            <div>
              <Label>Share more about your needs</Label>
              <Textarea 
                placeholder="Type your message here..."
                className="mt-4 h-30"
              />
            </div>
            <Separator className="my-6 w-full" />
            <div className="flex space-x-2">
              <Checkbox />
              <p className="text-primary/60 text-xs">
                By checking this box, you agree to receive updates, insights,
                and promotional messages from us. See our Privacy Policy and
                Terms & Conditions. You can unsubscribe anytime.
              </p>
            </div>
            <Button>
              <ArrowRight />
              Submit
            </Button>
          </form>
          <div className="mt-6 border-t lg:border-t-0 flex h-full w-full flex-col space-y-6 p-10">
            <div className="">
              <img
                src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                alt="IBM"
                className="w-20"
              />
              <p className="mt-10 italic">
                “Partnering with Amini supports Apple mission for innovative
                sustainability. This creates value for the world, its
                inhabitants, and local areas, with potential for growth.”
              </p>
              <p className="mt-10 font-semibold">Jane Smith // Apple</p>
              <p>Chief Technology Officer</p>
            </div>
            <Separator className="my-10 w-full" />
            <p>Trusted by global leaders in technology, research & impact</p>
            <div className="mb-6 flex h-full">
              <div className="grid h-full grid-cols-2 border md:grid-cols-3">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full items-center justify-center border object-contain p-10"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border border-t-0 p-20 text-center">
          <h3 className="text-3xl md:text-5xl font-semibold">
            Ready to expand <br /> your influence?
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant={"outline"}>Get in touch</Button>
            <Button> <ArrowRight />Discover our services</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
