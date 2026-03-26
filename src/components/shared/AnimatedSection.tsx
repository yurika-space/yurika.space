"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { scrollReveal, staggerContainer, staggerItem } from "@/styles/animations"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  stagger = false,
  delay = 0,
}: AnimatedSectionProps) {
  if (stagger) {
    return (
      <motion.section
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer.variants}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.section
      className={className}
      {...scrollReveal}
      transition={{ ...scrollReveal.transition, delay }}
    >
      {children}
    </motion.section>
  )
}

export { staggerItem }
