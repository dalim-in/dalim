/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CopyButton from '../../ui/copy-button'

interface CodeBlockProps {
    node: any
    inline: boolean
    className: string
    children: any
}

export function CodeBlock({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    node,
    inline,
    className,
    children,
    ...props
}: CodeBlockProps) {
    if (!inline) {
        return (
            <div className="not-prose flex flex-col">
                <pre
                    {...props}
                    className={`w-full relative overflow-x-auto rounded-xl border border-zinc-200 p-4 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50`}>
                    <code className="whitespace-pre-wrap break-words">{children}</code>
                    <div className="absolute right-2 top-2">
                        <CopyButton textToCopy={children} />
                    </div>
                </pre>
            </div>
        )
    } else {
        return (
            <code
                className={`${className} rounded-md bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800`}
                {...props}>
                {children}
            </code>
        )
    }
}
