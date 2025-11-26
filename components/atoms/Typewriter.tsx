"use client";
import { useState, useEffect } from 'react'

interface Props {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export default function Typewriter({ text, speed = 100, delay = 2000, className = '' }: Props) {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1))
        setIndex(index + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('')
        setIndex(0)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [index, text, speed, delay])

  return (
    <span className={`${className} animate-pulse`}>
      {displayText}<span className="animate-pulse">_</span>
    </span>
  )
}