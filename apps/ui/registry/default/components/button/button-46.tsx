"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Mail, Tag, User, Zap } from "lucide-react"

type Category = "important" | "all-mail" | "personal" | "updates" | "promotions"

interface CategoryInfo {
  id: Category
  icon: React.ReactNode
  label: string
  color: string
}

export default function Components() {
  const [activeCategory, setActiveCategory] = useState<Category>("all-mail")
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize all animations after component mounts
  useEffect(() => {
    // Small delay to ensure all elements are properly rendered
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const categories: CategoryInfo[] = [
    {
      id: "important",
      icon: <Zap className="h-5 w-5" />,
      label: "Important",
      color: "#F29B0C",
    },
    {
      id: "all-mail",
      icon: <Mail className="h-5 w-5" />,
      label: "All Mail",
      color: "#016FFF",
    },
    {
      id: "personal",
      icon: <User className="h-5 w-5" />,
      label: "Personal",
      color: "#38AD47",
    },
    {
      id: "updates",
      icon: <Bell className="h-5 w-5" />,
      label: "Updates",
      color: "#8559EB",
    },
    {
      id: "promotions",
      icon: <Tag className="h-5 w-5" />,
      label: "Promotions",
      color: "#F23E60",
    },
  ]

  return (
    <div className="flex w-full max-w-xl mx-auto">
      <div className="flex w-full gap-2 h-12">
        {categories.map((category) => {
          const isActive = activeCategory === category.id

          return (
            <motion.div
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="relative flex items-center justify-center rounded-xl text-white overflow-hidden"
              style={{
                backgroundColor: isActive ? category.color : "#222222",
              }}
              initial={false}
              animate={{
                flex: isActive ? 1 : 0.15,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 50,
                delay: isInitialized ? 0 : 0.05 * categories.findIndex((c) => c.id === category.id),
              }}
            >
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="active"
                    className="flex items-center justify-center w-full h-full px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 justify-center w-full">
                      <div className="relative">
                        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                          {category.icon}
                        </motion.div>
                      </div>
                      <motion.span
                        className="text-lg font-medium whitespace-nowrap"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {category.label}
                      </motion.span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="inactive"
                    className="flex items-center justify-center min-w-12 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {category.icon}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
