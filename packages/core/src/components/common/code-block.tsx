"use client"

import { type JSX, useLayoutEffect, useState } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import type { BundledLanguage } from "shiki/bundle/web"
import { codeToHast } from "shiki/bundle/web"

// eslint-disable-next-line react-refresh/only-export-components
export async function highlight(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    theme: "github-dark",
  })

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}

type Props = {
  code: string | null
  lang: BundledLanguage
  initial?: JSX.Element
  preHighlighted?: JSX.Element | null
}

export function CodeBlock({ code, lang, initial, preHighlighted }: Props) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null
  )

  useLayoutEffect(() => {
    // If we have pre-highlighted content, use that
    if (preHighlighted) {
      setContent(preHighlighted)
      return
    }

    let isMounted = true

    if (code) {
      highlight(code, lang).then((result) => {
        if (isMounted) setContent(result)
      })
    } else {
      setContent(
        <pre className="rounded-md bg-zinc-950 p-4">No code available</pre>
      )
    }

    return () => {
      isMounted = false
    }
  }, [code, lang, preHighlighted])

  return content ? (
    <div className="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:pr-20 [&_pre]:max-h-[450px] [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-zinc-950! [&_pre]:p-4 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900!">
      {content}
    </div>
  ) : (
    <pre className="rounded-md bg-zinc-950 p-4">Loading...</pre>
  )
}

export function CodeBlocks({ code, lang, initial, preHighlighted }: Props) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null
  );
  const [loading, setLoading] = useState(!preHighlighted && !initial);

  useLayoutEffect(() => {
    if (preHighlighted) {
      setContent(preHighlighted);
      setLoading(false);
      return;
    }

    let isMounted = true;

    if (code) {
      setLoading(true);
      highlight(code, lang).then((result) => {
        if (isMounted) {
          setContent(result);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  return (
    <div className="w-full h-full overflow-auto">
      {loading ? (
        <div className="p-4 text-sm text-muted-foreground font-mono">
          Loading code…
        </div>
      ) : (
        <div className="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:h-full [&_pre]:w-full [&_pre]:overflow-auto [&_pre]:bg-zinc-950 [&_pre]:p-4 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900">
          {content}
        </div>
      )}
    </div>
  );
}

