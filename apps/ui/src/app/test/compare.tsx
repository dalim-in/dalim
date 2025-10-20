"use client"

import { Check } from "lucide-react"

export default function DemoBlock() {
  return (
    <div className="flex flex-col items-center justify-between p-6 py-20 md:flex-row">
      <div className="mt-6 grid w-full lg:grid-cols-2">
        <div className="mx-auto max-w-2xl space-y-10 px-6 py-20">
          <h2 className="w-full text-center text-5xl tracking-tighter">
            Choose Windsurf for
          </h2>
          <div className="space-y-12">
            <div className="flex flex-col space-y-6">
              <h2 className="w-full text-lg font-medium tracking-tighter">
                Large Complex Codebases
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Working with codebases as big as 100M+ lines
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Need multi-file refactoring capabilities
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">Deep context understanding needed</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <h2 className="w-full text-lg font-medium tracking-tighter">
                Enterprise Security
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Require advanced compliance certifications (HIPAA, FedRAMP,
                    ITAR)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <h2 className="w-full text-lg font-medium tracking-tighter">
                Multi-IDE Workflows
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Team uses various development environments
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Need plugins for JetBrains, Vim, etc.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Want consistent AI experience across IDEs
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <h2 className="w-full text-lg font-medium tracking-tighter">
                Cross-Functional Teams
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                  <p className="text-md">
                    Designers need to preview and share prototypes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary">
          <div className="mx-auto max-w-2xl space-y-10 px-6 py-20">
            <h2 className="w-full text-center text-5xl tracking-tighter">
              Choose Cursor for
            </h2>
            <div className="space-y-12">
              <div className="flex flex-col space-y-6">
                <h2 className="w-full text-lg font-medium tracking-tighter">
                  Small Development Teams
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">Team of 1-5 developers</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">
                      Working on simple to medium projects
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">No compliance requirements</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h2 className="w-full text-lg font-medium tracking-tighter">
                  Basic AI Assistance Needs
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">
                      Simple autocomplete and chat sufficient
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">
                      Don&apos;t need advanced context understanding
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">Single-file editing focus</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Check className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-1" />
                    <p className="text-md">
                      No team collaboration requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
