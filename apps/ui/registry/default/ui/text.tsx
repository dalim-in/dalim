/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useEffect, useRef, useState } from "react"
import * as Slot from "@radix-ui/react-slot"
import { motion, useInView, type MotionProps } from "motion/react"

import { cn } from "@/registry/default/lib/utils"

type Variant = {
  variant: string
  component: React.FC<
    React.ComponentProps<"span"> &
      Partial<MotionProps> & { speed?: number; delay?: number }
  >
}

const variants = [
  // Original variants (enhanced)
  {
    variant: "shine",
    component: ({ children, className, speed = 5, ...props }) => (
      <motion.span
        {...props}
        className={cn(
          "bg-[linear-gradient(110deg,#bfbfbf,35%,#000,50%,#bfbfbf,75%,#bfbfbf)] dark:bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)]",
          "bg-[length:200%_100%] bg-clip-text text-transparent",
          className
        )}
        initial={{ backgroundPosition: "200% 0" }}
        animate={{ backgroundPosition: "-200% 0" }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "typewriter",
    component: ({ children, className, speed = 0.05, delay = 0, ...props }) => {
      const [displayedText, setDisplayedText] = useState("")
      const text = typeof children === "string" ? children : ""

      useEffect(() => {
        let i = 0
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i))
            i++
            if (i > text.length) {
              clearInterval(interval)
            }
          }, speed * 1000)
          return () => clearInterval(interval)
        }, delay * 1000)

        return () => clearTimeout(timer)
      }, [text, speed, delay])

      return (
        <span {...props} className={cn("font-mono", className)}>
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        </span>
      )
    },
  },
  {
    variant: "wave",
    component: ({ children, className, speed = 0.5, ...props }) => {
      if (typeof children !== "string") return null

      return (
        <div className="inline-block">
          {children.split("").map((char, index) => (
            <motion.span
              {...props}
              key={char + String(index)}
              className={cn("inline-block", className)}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      )
    },
  },
  {
    variant: "rainbow",
    component: ({ children, className, speed = 2, ...props }) => (
      <motion.span
        {...props}
        className={cn(
          "bg-gradient-to-r from-red-500 via-green-500 to-purple-500",
          "bg-[length:200%_100%] bg-clip-text text-transparent",
          className
        )}
        animate={{
          backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "neon",
    component: ({ children, className, ...props }) => (
      <motion.span
        {...props}
        className={cn("text-[#fff200]", className)}
        animate={{
          textShadow: [
            "0 0 10px rgba(255, 242, 0, 0.5)", // soft glow
            "0 0 20px rgba(255, 242, 0, 0.9)", // stronger glow
            "0 0 10px rgba(255, 242, 0, 0.5)", // back to soft
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "scramble",
    component: ({ children, className, speed = 0.05, ...props }) => {
      const [displayText, setDisplayText] = useState("")
      const text = typeof children === "string" ? children : ""
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

      useEffect(() => {
        let iteration = 0
        const interval = setInterval(() => {
          setDisplayText(
            text
              .split("")
              .map((char, index) => {
                if (index < iteration) {
                  return char
                }
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join("")
          )

          if (iteration >= text.length) {
            clearInterval(interval)
          }

          iteration += 1 / 3
        }, speed * 1000)

        return () => clearInterval(interval)
      }, [text, speed])

      return (
        <span {...props} className={cn("font-mono", className)}>
          {displayText}
        </span>
      )
    },
  },
  {
    variant: "fade",
    component: ({ children, className, delay = 0, ...props }) => {
      const ref = useRef(null)
      const isInView = useInView(ref, { once: true })

      if (typeof children !== "string") return null

      return (
        <div ref={ref} className="inline-block">
          {children.split("").map((char, index) => (
            <motion.span
              {...props}
              key={char + String(index)}
              className={cn("inline-block", className)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + index * 0.05,
                ease: "easeOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      )
    },
  },
  {
    variant: "rotate",
    component: ({ children, className, speed = 2, ...props }) => {
      const words = typeof children === "string" ? children.split(" ") : []
      const [currentIndex, setCurrentIndex] = useState(0)

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
        }, speed * 1000)

        return () => clearInterval(interval)
      }, [words.length, speed])

      return (
        <div className="relative inline-block h-8 overflow-hidden">
          {words.map((word, index) => (
            <motion.span
              {...props}
              key={word + String(index)}
              className={cn("absolute top-0 left-0", className)}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: currentIndex === index ? 0 : -20,
                opacity: currentIndex === index ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      )
    },
  },
  {
    variant: "elastic",
    component: ({ children, className, ...props }) => (
      <motion.span
        {...props}
        className={cn("inline-block cursor-pointer", className)}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: {
            rotate: {
              type: "tween",
              duration: 0.4,
              ease: "easeInOut",
            },
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "matrix",
    component: ({ children, className, speed = 0.1, ...props }) => {
      const [matrixChars, setMatrixChars] = useState("")
      const text = typeof children === "string" ? children : ""
      const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789"

      useEffect(() => {
        let iteration = 0
        const interval = setInterval(() => {
          setMatrixChars(
            text
              .split("")
              .map((char, index) => {
                if (index < iteration) {
                  return char
                }
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join("")
          )

          if (iteration >= text.length) {
            clearInterval(interval)
          }

          iteration += 0.5
        }, speed * 1000)

        return () => clearInterval(interval)
      }, [text, speed])

      return (
        <span
          {...props}
          className={cn(
            "font-mono drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]",
            className
          )}
        >
          {matrixChars}
        </span>
      )
    },
  },
  {
    variant: "pulse",
    component: ({ children, className, speed = 1, ...props }) => (
      <motion.span
        {...props}
        className={cn("inline-block", className)}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "slide",
    component: ({ children, className, delay = 0, ...props }) => {
      const ref = useRef(null)
      const isInView = useInView(ref, { once: true })

      return (
        <div ref={ref} className="relative inline-block overflow-hidden">
          <motion.div
            className="bg-primary-foreground absolute inset-0 z-10"
            initial={{ x: 0 }}
            animate={isInView ? { x: "100%" } : {}}
            transition={{
              duration: 0.8,
              delay: delay,
              ease: "easeInOut",
            }}
          />
          <motion.span
            {...props}
            className={cn("inline-block", className)}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.1,
              delay: delay + 0.4,
            }}
          >
            {children}
          </motion.span>
        </div>
      )
    },
  },
  {
    variant: "morphing",
    component: ({ children, className, speed = 2, ...props }) => {
      const words =
        typeof children === "string" ? children.split("|") : [children]
      const [currentIndex, setCurrentIndex] = useState(0)

      useEffect(() => {
        if (words.length > 1) {
          const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length)
          }, speed * 1000)

          return () => clearInterval(interval)
        }
      }, [words.length, speed])

      return (
        <motion.span
          {...props}
          className={cn("inline-block", className)}
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {words[currentIndex]}
        </motion.span>
      )
    },
  },
  // Enhanced original variants
  {
    variant: "generate",
    component: ({
      children,
      className,
      delay = 0,
      speed = 0.015,
      ...props
    }) => {
      if (typeof children !== "string") return null
      return (
        <div className="inline-block whitespace-pre">
          {children.split("").map((char, index) => (
            <motion.span
              {...props}
              key={char + String(index)}
              className={cn("inline-block whitespace-pre", className)}
              initial={{ opacity: 0, filter: "blur(4px)", rotateX: 90, y: 5 }}
              whileInView={{
                opacity: 1,
                filter: "blur(0px)",
                rotateX: 0,
                y: 0,
              }}
              transition={{
                ease: "easeOut",
                duration: 0.3,
                delay: delay + index * speed,
              }}
              viewport={{ once: true }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      )
    },
  },
  {
    variant: "glitch",
    component: ({ children, className, ...props }) => (
      <div className="group relative overflow-hidden font-medium">
        <span {...props} className={cn("invisible", className)}>
          {children}
        </span>
        <motion.span
          {...props}
          className={cn(
            "absolute top-0 left-0 transition-transform duration-500 ease-in-out",
            "group-hover:-translate-y-full hover:duration-300",
            className
          )}
          whileHover={{
            textShadow: [
              "2px 0 #ff0000, -2px 0 #00ffff",
              "-2px 0 #ff0000, 2px 0 #00ffff",
              "2px 0 #ff0000, -2px 0 #00ffff",
            ],
          }}
          transition={{ duration: 0.2, repeat: 3 }}
        >
          {children}
        </motion.span>
        <span
          {...props}
          className={cn(
            "absolute top-0 left-0 translate-y-full transition-transform duration-500",
            "ease-in-out group-hover:translate-y-0 hover:duration-300",
            className
          )}
        >
          {children}
        </span>
      </div>
    ),
  },
  {
    variant: "enter",
    component: ({ children, className, speed = 0.25, ...props }) => {
      if (typeof children !== "string") return null
      const STAGGER = 0.025
      const letters = children
        .split("")
        .map((letter) => (letter === " " ? "\u00A0" : letter))

      return (
        <motion.span
          {...props}
          className={cn(
            "relative block overflow-hidden whitespace-nowrap select-none",
            className
          )}
          initial="initial"
          whileHover="hovered"
          style={{ lineHeight: 0.9 }}
        >
          <div>
            {letters.map((letter, i) => (
              <motion.span
                key={String(i)}
                className="inline-block"
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" },
                }}
                transition={{
                  duration: speed,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className="absolute inset-0">
            {letters.map((letter, i) => (
              <motion.span
                key={String(i)}
                className="inline-block"
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration: speed,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.span>
      )
    },
  },
  {
    variant: "shake",
    component: ({ children, className, ...props }) => (
      <motion.span
        {...props}
        className={cn("inline-block cursor-pointer", className)}
        whileHover={{
          x: [0, -2, 2, -2, 2, 0],
          transition: { duration: 0.4 },
        }}
      >
        {children}
      </motion.span>
    ),
  },
  {
    variant: "decoration",
    component: ({ children, className, ...props }) => (
      <div
        className={cn(
          "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right",
          "after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
        )}
      >
        <span {...props} className={cn("relative z-10", className)}>
          {children}
        </span>
      </div>
    ),
  },
] as const satisfies readonly Variant[]

export type AdvancedTextProps = {
  variant?: (typeof variants)[number]["variant"]
  speed?: number
  delay?: number
} & React.ComponentProps<"span"> &
  Partial<MotionProps>

export function Text({
  variant = "shine",
  className,
  speed,
  delay,
  ...props
}: AdvancedTextProps) {
  const FALLBACK_INDEX = 0
  const variantComponent = variants.find(
    (v) => v.variant === variant
  )?.component
  const Component = variantComponent || variants[FALLBACK_INDEX].component

  return (
    <Slot.Root className={cn("text-sm font-medium")}>
      <Component {...props} className={className} speed={speed} delay={delay} />
    </Slot.Root>
  )
}
