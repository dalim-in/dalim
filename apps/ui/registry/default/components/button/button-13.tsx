"use client";

import { Button } from "@/registry/default/ui/button";

export default function Component() {
  return (
    <Button
      className="relative z-0 overflow-hidden group"
    >
      <span className="relative z-10">Hover Me</span>
      <span
        className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-in-out group-hover:w-full z-0"
      ></span>
    </Button>
  );
}
