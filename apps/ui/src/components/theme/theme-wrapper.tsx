'use client';

import React from "react";
import { cn } from "@/registry/default/lib/utils";
import { useConfig } from "@/src/hooks/use-config";
import { baseColorsV4 } from "@/registry/registry-base-colors";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig();

  const themeName = defaultTheme || config.theme;
  const themeColors = baseColorsV4[themeName as keyof typeof baseColorsV4];

  const cssVariables = React.useMemo(() => {
    if (!themeColors) return {};

    const lightVars: Record<string, string> = {};
    const darkVars: Record<string, string> = {};

    Object.entries(themeColors.light).forEach(([key, value]) => {
      lightVars[`--${key}`] = value;
    });

    Object.entries(themeColors.dark).forEach(([key, value]) => {
      darkVars[`--${key}`] = value;
    });

    return { lightVars, darkVars };
  }, [themeColors]);

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Tailwind dark mode with `class` strategy depends on HTML class
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDark(isDark);

      // Optional: Listen for changes
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      className={cn(`theme-${themeName}`, "w-full", className)}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
          ...cssVariables.lightVars,
          ...(isDark ? cssVariables.darkVars : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
