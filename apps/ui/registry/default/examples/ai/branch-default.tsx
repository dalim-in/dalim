"use client"

import {
  Branch,
  BranchMessages,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "@/registry/default/ui/ai/branch"
import { Message, MessageContent } from "@/registry/default/ui/ai/message"

export default function BranchDemo() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-full max-w-xl">
        <Branch defaultBranch={0}>
          <BranchMessages>
            <Message from="user">
              <MessageContent>
                What are the key strategies for optimizing React performance?
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageContent>
                How can I improve the performance of my React application?
              </MessageContent>
            </Message>
            <Message from="user">
              <MessageContent>
                What performance optimization techniques should I use in React?
              </MessageContent>
            </Message>
          </BranchMessages>
          <BranchSelector from="user" className="p-0">
            <BranchPrevious />
            <BranchPage />
            <BranchNext />
          </BranchSelector>
        </Branch>
        <Branch defaultBranch={0}>
          <BranchMessages>
            <Message from="assistant">
              <MessageContent>
                Here&apos;s the first response to your question. This approach
                focuses on performance optimization.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageContent>
                Here&apos;s an alternative response. This approach emphasizes
                code readability and maintainability over pure performance.
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageContent>
                And here&apos;s a third option. This balanced approach considers
                both performance and maintainability, making it suitable for
                most use cases.
              </MessageContent>
            </Message>
          </BranchMessages>
          <BranchSelector from="assistant" className="p-0">
            <BranchPrevious />
            <BranchPage />
            <BranchNext />
          </BranchSelector>
        </Branch>
      </div>
    </div>
  )
}
