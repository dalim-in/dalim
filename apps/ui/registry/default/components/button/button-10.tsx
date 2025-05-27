"use client";

import React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Component() {
  return (
    <>
      <Button
        className="relative rounded-full bg-primary shadow-lg border-white dark:border-black"
      >
        Pulse Border 
        <span className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-50 animate-border-pulse pointer-events-none"></span>

      </Button>

      <style jsx>{`
        @keyframes borderPulse {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 6px 2px rgba(59, 130, 246, 0.6);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px 3px rgba(59, 130, 246, 1);
          }
        }

        .animate-border-pulse {
          animation: borderPulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}