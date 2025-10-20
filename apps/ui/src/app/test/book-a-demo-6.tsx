"use client"

import { Check } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Textarea } from "@/registry/default/ui/textarea"


export default function DemoBlock() {
  return (
    <div className="mx-auto py-20 flex max-w-6xl flex-col items-center justify-between p-6 md:flex-row">
      <div className="">
        <div className="mt-6 grid w-full lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-md text-muted-foreground font-light">
              <span className="cursor-pointer hover:underline">Contact</span> /
            </h1>
            <h2 className="w-full text-5xl tracking-tighter">
              Let&apos;s talk
            </h2>
            <div className="">
              <div className="mb-6 hidden space-y-6 lg:flex lg:flex-col">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                    <p className="text-sm">
                      Tell us about your content operations needs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                    <p className="text-sm">Get a custom demo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                    <p className="text-sm">Explore enterprise plan options</p>
                  </div>
                </div>
                <p className="font-semibold">
                  Trusted by +5000 leaders and innovators
                </p>
                <div className="grid h-full grid-cols-2 gap-6 md:grid-cols-4">
                  <img
                    src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                    alt="Google"
                    className="h-full w-10 items-center justify-center object-contain"
                  />
                  <img
                    src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                    alt="Google"
                    className="h-full w-10 items-center justify-center object-contain"
                  />
                  <img
                    src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                    alt="Google"
                    className="h-full w-10 items-center justify-center object-contain"
                  />
                  <img
                    src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                    alt="Google"
                    className="h-full w-10 items-center justify-center object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-8 border p-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label>Work email</Label>
                <Input
                  type="text"
                  placeholder="name@company.com"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  placeholder="Company name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label>Company Size</Label>
                <Select required>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Number of employees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100">0-100</SelectItem>
                    <SelectItem value="100-500">100-500</SelectItem>
                    <SelectItem value="500-5000">500-5000</SelectItem>
                    <SelectItem value="5000+">5000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Message ( optional )</Label>
              <Textarea
                placeholder="Type your message here..."
                className="mt-4 h-24"
              />
            </div>
            <div>
              <Label>Where did you find us? ( optional )</Label>
              <Textarea
                placeholder="Type your message here..."
                className="mt-4 [resize:none]"
              />
            </div>
            <Button>Contact Sales</Button>
            <div className="flex space-x-2">
              <p className="text-primary/60 text-xs">
                By submitting this form, you confirm that you have read and
                understood Sanity&apos;s <span className="underline">Privacy Policy.</span> This site is protected
                by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and 
                <span className="underline"> Terms of Service</span> apply.
              </p>
            </div>
          </form>
          <div>
            <div className="mt-10 mb-6 space-y-10 lg:hidden">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                  <p className="text-sm">
                    Tell us about your content operations needs
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                  <p className="text-sm">Get a custom demo</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="bg-secondary text-primary h-6 w-6 rounded-full p-1.5" />
                  <p className="text-sm">Explore enterprise plan options</p>
                </div>
              </div>
              <p className="font-semibold">
                Trusted by +5000 leaders and innovators
              </p>
              <div className="grid h-full grid-cols-2 gap-6 md:grid-cols-4">
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-10 items-center justify-center object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-10 items-center justify-center object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-10 items-center justify-center object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/ui/public/apple.png"
                  alt="Google"
                  className="h-full w-10 items-center justify-center object-contain"
                />
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h1 className="font-semibold">Pricing FAQ</h1>
                <p className="text-sm">
                  See collection of <span className="underline"> Frequency Asked Questions</span> about pricing and
                  billing on our pricing page.
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Technical support</h1>
                <p className="text-sm">
                  Get help from the Sanity team and thousands of developers in
                  our <span className="underline"> Discord Community.</span>
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Account support</h1>
                <p className="text-sm">
                  <span className="underline">Get help</span> with billing, quotas, plans, and user management for
                  existing customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
