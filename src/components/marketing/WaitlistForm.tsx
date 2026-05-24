"use client"

import { useState } from "react"

type UserType = "founder" | "curator" | "connector"

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<UserType>("founder")
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Request failed")
        return
      }
      setStatus("ok")
      setMessage("SIGNAL LOGGED — YOU ARE ON THE WAITLIST.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("TRANSMISSION FAILED — TRY AGAIN.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4 max-w-md mx-auto"}>
      <div className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <input
          type="email"
          required
          placeholder="founder@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as UserType)}
          className="border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
        >
          <option value="founder">FOUNDER</option>
          <option value="curator">CURATOR</option>
          <option value="connector">CONNECTOR</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full py-3 text-[10px]"
      >
        {status === "loading" ? "TRANSMITTING..." : "[ JOIN WAITLIST ]"}
      </button>
      {message && (
        <p
          className={`text-[10px] font-mono text-center ${
            status === "error" ? "text-[#ff3131]" : "text-[#ccff00]"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
