"use client"

import Link from "next/link"
import { useState } from "react"
import { slides } from "@/lib/pitch-deck-data"

export default function PitchDeckPage() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-[10px] font-display text-[#ccff00] glow-lime">
          YURIKA.SPACE // PITCH DECK
        </Link>
        <nav className="hidden md:flex gap-2 flex-wrap justify-end max-w-xl">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`px-2 py-1 text-[8px] font-mono border ${
                i === index ? "border-[#ccff00] text-[#ccff00]" : "border-[#2a2a2a] text-[#666]"
              }`}
            >
              {s.label.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 min-h-[70vh] flex flex-col justify-center">
        <p className="text-[9px] font-mono text-[#555] mb-4 tracking-widest">
          SLIDE {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} — {slide.label.toUpperCase()}
        </p>
        <h1 className="text-[clamp(14px,3vw,28px)] font-display text-[#ccff00] glow-lime mb-8 leading-relaxed">
          {slide.title}
        </h1>
        <ul className="space-y-4">
          {slide.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[12px] font-mono text-[#888] leading-relaxed">
              <span className="text-[#9d00ff] flex-shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-[#2a2a2a] px-6 py-6 flex justify-between items-center">
        <button
          type="button"
          className="btn-ghost text-[9px] px-6 py-2"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          PREV
        </button>
        <span className="text-[9px] font-mono text-[#555]">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          className="btn-primary text-[9px] px-6 py-2"
          disabled={index === slides.length - 1}
          onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
        >
          NEXT
        </button>
      </footer>
    </div>
  )
}
