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
            <div className="not-prose py-2 w-80 md:w-full md:max-w-xl overflow-x-auto flex flex-col">
                <pre
                    {...props}
                    className={`w-full relative overflow-x-auto rounded-xl border border-neutral-200 p-4 text-sm bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50`}>
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
                className={`${className} rounded-md bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800`}
                {...props}>
                {children}
                <div className="absolute right-2 top-2">
                        <CopyButton textToCopy={children} />
                    </div>
            </code>
        )
    }
}
