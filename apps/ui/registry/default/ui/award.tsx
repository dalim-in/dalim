"use client"

import type React from "react"
import { Award, CreditCard, Shield, Stamp, Star, Trophy } from "lucide-react"

import { cn } from "@/registry/default/lib/utils"

export interface AwardsComponentProps {
  variant?: "stamp" | "award" | "certificate" | "badge" | "sticker" | "id-card"
  title: string
  subtitle?: string
  description?: string
  issuer?: string
  date?: string
  recipient?: string
  level?: "bronze" | "silver" | "gold" | "platinum"
  color?: "blue" | "green" | "red" | "purple" | "orange" | "pink"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showIcon?: boolean
  customIcon?: React.ReactNode
}

const colorVariants = {
  blue: {
    primary: "bg-blue-500",
    secondary: "bg-blue-100",
    text: "text-blue-900",
    border: "border-blue-300",
    accent: "text-blue-600",
  },
  green: {
    primary: "bg-green-500",
    secondary: "bg-green-100",
    text: "text-green-900",
    border: "border-green-300",
    accent: "text-green-600",
  },
  red: {
    primary: "bg-red-500",
    secondary: "bg-red-100",
    text: "text-red-900",
    border: "border-red-300",
    accent: "text-red-600",
  },
  purple: {
    primary: "bg-purple-500",
    secondary: "bg-purple-100",
    text: "text-purple-900",
    border: "border-purple-300",
    accent: "text-purple-600",
  },
  orange: {
    primary: "bg-orange-500",
    secondary: "bg-orange-100",
    text: "text-orange-900",
    border: "border-orange-300",
    accent: "text-orange-600",
  },
  pink: {
    primary: "bg-pink-500",
    secondary: "bg-pink-100",
    text: "text-pink-900",
    border: "border-pink-300",
    accent: "text-pink-600",
  },
}

const levelColors = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-gray-400 to-gray-600",
  gold: "from-yellow-400 to-yellow-600",
  platinum: "from-slate-300 to-slate-500",
}

const sizeVariants = {
  sm: { container: "w-48 h-32", text: "text-xs", icon: "w-4 h-4" },
  md: { container: "w-64 h-40", text: "text-sm", icon: "w-5 h-5" },
  lg: { container: "w-80 h-48", text: "text-base", icon: "w-6 h-6" },
  xl: { container: "w-96 h-56", text: "text-lg", icon: "w-8 h-8" },
}

export function AwardsComponent({
  variant = "badge",
  title,
  subtitle,
  description,
  issuer,
  date,
  recipient,
  level = "gold",
  color = "blue",
  size = "md",
  className,
  showIcon = true,
  customIcon,
}: AwardsComponentProps) {
  const colors = colorVariants[color]
  const sizes = sizeVariants[size]

  const getIcon = () => {
    if (customIcon) return customIcon

    switch (variant) {
      case "stamp":
        return <Stamp className={sizes.icon} />
      case "award":
        return <Trophy className={sizes.icon} />
      case "certificate":
        return <Award className={sizes.icon} />
      case "badge":
        return <Shield className={sizes.icon} />
      case "sticker":
        return <Star className={sizes.icon} />
      case "id-card":
        return <CreditCard className={sizes.icon} />
      default:
        return <Award className={sizes.icon} />
    }
  }

  // Stamp Variant
  if (variant === "stamp") {
    const createSerratedPath = () => {
      const radius = 96 // Half of 192px (w-48)
      const teeth = 40
      const innerRadius = radius - 8
      const outerRadius = radius

      let path = ""
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * 2 * Math.PI
        const r = i % 2 === 0 ? outerRadius : innerRadius
        const x = Math.cos(angle) * r + radius
        const y = Math.sin(angle) * r + radius

        if (i === 0) {
          path += `M ${x} ${y}`
        } else {
          path += ` L ${x} ${y}`
        }
      }
      path += " Z"
      return path
    }

    // Create curved text path
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createTextPath = (radius: number, id: string) => {
      const centerX = 96
      const centerY = 96
      return `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`
    }
    return (
      <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
        {/* SVG for serrated border and curved text */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 192 192"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Define paths for curved text */}
            <path
              id="top-curve"
              d={createTextPath(55, "top-curve")}
              fill="none"
            />
            <path
              id="bottom-curve"
              d={createTextPath(60, "bottom-curve")}
              fill="none"
              transform="rotate(180 96 96)"
            />
          </defs>

          {/* Serrated border */}
          <path
            d={createSerratedPath()}
            strokeWidth="0.2"
            className="fill-white stroke-black dark:fill-black dark:stroke-white"
          />

          {/* Inner circle */}
          <circle
            cx="96"
            cy="96"
            r="78"
            className="fill-white stroke-black dark:fill-black dark:stroke-white"
            strokeWidth="0.2"
          />

          {/* Curved text - top */}
          <text className="fill-white text-xl font-bold">
            <textPath
              href="#top-curve"
              startOffset="50%"
              textAnchor="middle"
              className="dark:fill-white fill-black"
            >
              {title}
            </textPath>
          </text>

          {/* Curved text - bottom */}
          <text className="text-[10px] tracking-wider">
            <textPath
              href="#bottom-curve"
              startOffset="50%"
              textAnchor="middle"
              className="dark:fill-white fill-black"
            >
              {subtitle}
            </textPath>
          </text>
        </svg>
 
        <div className="relative z-10 text-center">
          {showIcon && (
            <div className="mb-1 flex justify-center text-center text-2xl">
              {<Star fill="#a855f7" className="text-[#a855f7]" />}
            </div>
          )}
           {recipient && <div className="mt-2 text-[14px]">{recipient}</div>}

          {date && <div className="text-[10px] italic">{date}</div>}
        </div>
      </div>
    )
  }

  // Award Variant
  if (variant === "award") {
    return (
      <div
        className={cn(
          "relative bg-gradient-to-br",
          levelColors[level],
          "rounded-lg border-4 border-yellow-300 shadow-xl",
          "p-6 text-center text-white",
          sizes.container,
          className
        )}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-full border-2 border-yellow-300 bg-yellow-400 p-2">
            {showIcon && getIcon()}
          </div>
        </div>
        <div className="mt-4">
          <h3 className={cn("mb-2 font-bold", sizes.text)}>{title}</h3>
          {subtitle && <p className="mb-2 text-sm opacity-90">{subtitle}</p>}
          {recipient && (
            <p className="text-xs opacity-80">Awarded to: {recipient}</p>
          )}
          {date && <p className="mt-1 text-xs opacity-80">{date}</p>}
        </div>
        <div className="absolute right-2 bottom-2 left-2 h-1 rounded bg-yellow-300 opacity-50"></div>
      </div>
    )
  }

  // Certificate Variant
  if (variant === "certificate") {
    return (
      <div
        className={cn(
          "border-8 border-double bg-white",
          colors.border,
          "p-8 text-center shadow-2xl",
          sizes.container,
          "relative overflow-hidden",
          className
        )}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-4 rounded border border-gray-300"></div>
        </div>
        <div className="relative z-10">
          {showIcon && (
            <div
              className={cn(
                "mb-4 flex justify-center",
                colors.primary,
                "mx-auto w-fit rounded-full p-3"
              )}
            >
              <div className="text-white">{getIcon()}</div>
            </div>
          )}
          <h2 className={cn("mb-2 font-serif text-2xl", colors.text)}>
            Certificate
          </h2>
          <p className="mb-4 text-sm text-gray-600">This is to certify that</p>
          <h3 className={cn("mb-4 text-xl font-bold", colors.accent)}>
            {recipient || title}
          </h3>
          {description && (
            <p className="mb-4 text-sm text-gray-700">{description}</p>
          )}
          <div className="mt-6 flex items-end justify-between text-xs text-gray-600">
            <div>{issuer && `Issued by: ${issuer}`}</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
    )
  }

  // Badge Variant
  if (variant === "badge") {
    return (
      <div
        className={cn(
          "relative inline-flex flex-col items-center",
          sizes.container,
          className
        )}
      >
        <div
          className={cn(
            "rounded-full border-4 p-4 shadow-lg",
            colors.primary,
            colors.border,
            "flex items-center justify-center"
          )}
        >
          {showIcon && <div className="text-white">{getIcon()}</div>}
        </div>
        <div
          className={cn(
            "mt-2 rounded-full px-4 py-2 text-center",
            colors.secondary,
            colors.text,
            "shadow-md"
          )}
        >
          <div className={cn("font-semibold", sizes.text)}>{title}</div>
          {level && (
            <div className="text-xs tracking-wide uppercase opacity-75">
              {level}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Sticker Variant
  if (variant === "sticker") {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center",
          "-rotate-6 transform rounded-full border-4 shadow-lg",
          colors.primary,
          "p-4 text-white",
          sizes.container,
          className
        )}
      >
        <div className="text-center">
          {showIcon && (
            <div className="mb-2 flex justify-center">{getIcon()}</div>
          )}
          <div className={cn("font-bold uppercase", sizes.text)}>{title}</div>
          {subtitle && (
            <div className="mt-1 text-xs opacity-90">{subtitle}</div>
          )}
        </div>
        <div className="absolute inset-2 rounded-full border-2 border-white opacity-30"></div>
      </div>
    )
  }

  // ID Card Variant
  if (variant === "id-card") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-white shadow-xl",
          colors.border,
          sizes.container,
          className
        )}
      >
        <div className={cn("h-8", colors.primary)}></div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            {showIcon && (
              <div
                className={cn(
                  "flex-shrink-0 rounded-full p-2",
                  colors.secondary
                )}
              >
                <div className={colors.accent}>{getIcon()}</div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  "truncate font-semibold",
                  colors.text,
                  sizes.text
                )}
              >
                {recipient || title}
              </h3>
              {subtitle && (
                <p className="truncate text-sm text-gray-600">{subtitle}</p>
              )}
              {description && (
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-xs text-gray-500">
            <span>{issuer}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return null
}
