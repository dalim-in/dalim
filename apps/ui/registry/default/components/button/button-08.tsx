"use client"

import { Button } from "@/registry/default/ui/button"

export default function Component() {
  return (
    <div className="relative inline-block">
      {/* Glowing background animation */}
      <div className="animate-glow absolute inset-0 opacity-60 blur-xl" />

      <Button className="relative bg-gradient-to-r from-red-500 via-lime-500 to-purple-500 text-white shadow-[0_0_10px_rgba(255,255,255,0.3),0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:brightness-120">
        Rainbow Button
      </Button>

      {/* Inline animation styles */}
      <style jsx>{`
        @keyframes glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-glow {
          background: linear-gradient(
            270deg,
            #f43f5e,
            #fff200,
            #ffffff,
            #8b5cf6,
            #f43f5e
          );
          background-size: 800% 800%;
          animation: glow 6s ease infinite;
        }
      `}</style>
    </div>
  )
}
