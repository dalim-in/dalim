"use client";

import React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Component() {
  const text = "SEXY SHADCN BUTTON";

  return (
    <div className="border p-1 rounded-full border-dotted border-primary">
    <Button
      className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-0 grid place-content-center bg-primary"
    >
      <p
        className="absolute inset-0"
        style={{
          animation: "text-rotation 8s linear infinite",
          position: "absolute",
          inset: 0,
        }}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            style={{ 
              position: "absolute",
              inset: "6px",
              transform: `rotate(${19 * i}deg)`,
              transformOrigin: "50% 50%",
              userSelect: "none",
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <div className="relative w-[40px] h-[40px] rounded-full text-primary bg-white flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(0, 0)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(-150%, 150%)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes text-rotation {
          to {
            rotate: 360deg;
          }
        }
        p {
          animation: text-rotation 8s linear infinite;
        }
        span {
          user-select: none;
        }
        button:hover svg:first-child {
          transform: translate(150%, -150%);
          color: black;
        }
        button:hover svg:last-child {
          transform: translate(0);
          color: black;
          transition-delay: 0.1s;
        }
      `}</style>
    </Button>
    </div>
  );
}
