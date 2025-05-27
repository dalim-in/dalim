"use client";

import React, { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Bell, Check } from "lucide-react";

export default function Component() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Button
      onClick={() => setSubscribed(!subscribed)}
      className={`relative overflow-hidden text-white transition-all duration-300
        ${
          subscribed
            ? "bg-gray-800 hover:bg-gray-900"
            : "bg-red-600 hover:bg-red-700"
        }
        ${subscribed ? "scale-95" : "scale-100"}
      `}
    >
      {/* Default state: Subscribe */}
      <span
        className={`flex items-center gap-2 transition-opacity duration-300 ${
          subscribed ? "opacity-0" : "opacity-100"
        }`}
      >
        <Bell className="h-5 w-5" />
        Subscribe
      </span>

      {/* Subscribed state */}
      <span
        className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          subscribed ? "opacity-100" : "opacity-0"
        }`}
      >
        <Check className="h-5 w-5" />
        Subscribed
      </span>
    </Button>
  );
}
