"use client"

import * as React from "react"

import type { GetWeatherResult } from "@/registry/default/ui/ai/tools/waether-tools"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

export function WeatherCard({ data }: { data: GetWeatherResult }) {
  const {
    location,
    temperature,
    unit,
    condition,
    high,
    low,
    humidity,
    windKph,
  } = data
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Powered by your tool</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="mb-1 text-lg font-semibold">{location}</div>
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-bold">
            {temperature}°{unit}
          </div>
          <div className="text-muted-foreground text-sm">{condition}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="bg-muted rounded-md p-3 text-center">
            <div className="text-muted-foreground">High</div>
            <div className="font-medium">
              {high}°{unit}
            </div>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <div className="text-muted-foreground">Low</div>
            <div className="font-medium">
              {low}°{unit}
            </div>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <div className="text-muted-foreground">Humidity</div>
            <div className="font-medium">{Math.round(humidity * 100)}%</div>
          </div>
        </div>
        <div className="text-muted-foreground mt-3 text-sm">
          Wind: {windKph} kph
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
