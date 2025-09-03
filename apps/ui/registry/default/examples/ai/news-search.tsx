"use client"

import * as React from "react"

import type { NewsSearchResult } from "@/registry/default/ui/ai/tools/news-tools"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

export function NewsList({ data }: { data: NewsSearchResult }) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>News</CardTitle>
        <CardDescription>Topic: {data.topic}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.items.map((item) => (
            <li key={item.id} className="bg-muted rounded-md px-3 py-2">
              {item.url ? (
                <a
                  href={item.url}
                  className="font-medium hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <span className="font-medium">{item.title}</span>
              )}
              {item.publishedAt && (
                <div className="text-muted-foreground text-xs">
                  {new Date(item.publishedAt).toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default NewsList
