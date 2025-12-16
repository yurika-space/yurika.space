"use client";
import { useState, useEffect } from 'react'

interface Props {
  text: string
  speed?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
  spanItem?: '_' | string
}

export default function Typewriter({ text, speed = 100, delay = 2000, className = '', spanItem = '_' }: Props) {
  const [displayText, setDisplayText] = useState(text)
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
    <span className={`${className}`}>
      {displayText}<span className="animate-pulse">{spanItem}</span>
    </span>
  )
}
