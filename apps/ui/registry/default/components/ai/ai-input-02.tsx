"use client"

import { useState, type FormEventHandler } from "react"
import { DalimLogoIcon } from "@dalim/core/components/logo"
import { GlobeIcon, MicIcon, PlusIcon, SendIcon } from "lucide-react"

import {
  AIInput,
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/registry/default/ui/ai/input"

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "cohere-command", name: "Command" },
  { id: "mistral-7b", name: "Mistral 7B" },
]

const Component = () => {
  const [model, setModel] = useState<string>(models[0].id)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = formData.get("message")
    console.log("Submitted message:", message)
  }

  return (
    <div className="">
      <div className="overflow-hidden rounded-xl border">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DalimLogoIcon />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Dalim AI
                </h2>
              </div>
            </div>

            <AIInputModelSelect value={model} onValueChange={setModel}>
              <AIInputModelSelectTrigger className="w-28">
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {models.map((model) => (
                  <AIInputModelSelectItem key={model.id} value={model.id}>
                    {model.name}
                  </AIInputModelSelectItem>
                ))}
              </AIInputModelSelectContent>
            </AIInputModelSelect>
          </div>
        </div>

        {/* Input Area */}
        <AIInput onSubmit={handleSubmit} className="border-none">
          <div className="relative">
            <AIInputTextarea
              placeholder="Ask me anything... I'm here to help!"
              className="min-h-[220px] text-xs w-full leading-relaxed"
            />

            <AIInputToolbar className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl border p-2 shadow-lg">
              <AIInputTools className="flex items-center gap-1">
                <AIInputButton className="flex h-9 w-9 items-center justify-center rounded-lg">
                  <PlusIcon size={16} />
                </AIInputButton>
                <AIInputButton className="flex h-9 w-9 items-center justify-center rounded-lg">
                  <MicIcon size={16} />
                </AIInputButton>
                <AIInputButton className="flex h-9 items-center gap-2 rounded-lg px-3">
                  <GlobeIcon size={16} />
                  <span className="text-sm font-medium">Search</span>
                </AIInputButton>
              </AIInputTools>

              <AIInputSubmit className="group flex h-9 w-9 items-center justify-center rounded-lg">
                <SendIcon
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </AIInputSubmit>
            </AIInputToolbar>
          </div>
        </AIInput>
      </div>
    </div>
  )
}

export default Component
