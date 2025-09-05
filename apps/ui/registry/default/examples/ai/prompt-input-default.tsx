"use client"

import { useState } from "react"
import { GlobeIcon, MicIcon } from "lucide-react"

import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/registry/default/ui/ai/prompt-input"

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-opus-4-20250514", name: "Claude 4 Opus" },
]

export default function PromptInputDemo() {
  const [text, setText] = useState("")
  const [model, setModel] = useState(models[0].id)
  const [status, setStatus] = useState<"ready" | "streaming">("ready")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text.trim()) return

    setStatus("streaming")
    // Fake async send
    setTimeout(() => {
      console.log("Submitted:", { text, model })
      setText("")
      setStatus("ready")
    }, 1200)
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-xl">
        <PromptInput onSubmit={handleSubmit} className="relative w-full">
          {/* Textarea */}
          <PromptInputTextarea
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (text.trim()) {
                  handleSubmit(e as any)
                }
              }
            }}
          />

          {/* Toolbar */}
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton type="button">
                <MicIcon size={16} />
              </PromptInputButton>
              <PromptInputButton type="button">
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                value={model}
                onValueChange={(v) => setModel(v)}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((m) => (
                    <PromptInputModelSelectItem key={m.id} value={m.id}>
                      {m.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>

            <PromptInputSubmit
              disabled={!text.trim() || status === "streaming"}
              status={status}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  )
}
