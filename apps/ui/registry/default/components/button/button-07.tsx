"use client"

import { useState } from "react"
import { Button } from "@/registry/default/ui/button"
import { Fingerprint } from "lucide-react"

export default function Component() {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="text-center space-y-6"> 
        <div className="relative">
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className={`
              relative w-12 h-12 rounded-full border-2 transition-all duration-300
              ${
                isScanning
                  ? "shadow-sm"
                  : ""
              }
            `}
          >
            <Fingerprint
              className={`
                size-24 transition-all duration-300
                ${isScanning ? "animate-pulse" : "text-primary-foreground"}
              `}
            />

            {isScanning && <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping" />}
          </Button>

          {isScanning && (
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        <div className="text-xs mt-4">
          {isScanning ? "Scanning fingerprint..." : "Place your finger on the sensor"}
        </div>
      </div>
    </div>
  )
}
