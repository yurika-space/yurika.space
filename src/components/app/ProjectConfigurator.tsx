"use client"

import { useState, useRef } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { useCreateProject, useProjects } from "@/hooks/useProjects"
import { useAuthErrorMessage } from "@/hooks/useAuth"
import { uploadPitchDeck } from "@/app/actions/uploadPitchDeck"

export function ProjectConfigurator() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pitchDeckUrl, setPitchDeckUrl] = useState("")
  const [repositoryUrl, setRepositoryUrl] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const { data: projects } = useProjects()
  const createProject = useCreateProject()
  const errMsg = useAuthErrorMessage(createProject.error)

  const unattached = projects?.filter((p) => !p.is_attached && !p.campaign_id) ?? []

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const url = await uploadPitchDeck(formData)
      setPitchDeckUrl(url)
      setMessage("File uploaded successfully")
    } catch (err: any) {
      setMessage(`Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  async function handleCreate() {
    if (!name.trim()) return
    setMessage(null)
    createProject.reset()
    try {
      await createProject.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        pitch_deck_url: pitchDeckUrl.trim() || undefined,
        repository_url: repositoryUrl.trim() || undefined,
      })
      setMessage(`Project created: ${name.trim()}`)
      setName("")
      setDescription("")
      setPitchDeckUrl("")
      setRepositoryUrl("")
    } catch {
      /* errMsg */
    }
  }

  return (
    <section id="project" className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 00 // PROJECT SETUP"}</p>
      <h2 className="mb-5 text-[10px] font-mono tracking-widest text-[#9d00ff]">CREATE PROJECT</h2>
      <p className="mb-4 text-[11px] font-mono text-[#888] leading-relaxed">
        Define your project first. After you vault a domain, attach this project when you launch the funding
        campaign.
      </p>

      {!isAuthed && (
        <p className="mb-4 text-[10px] font-mono text-[#ffaa00]">
          Sign in via the header wallet before creating a project.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">PROJECT NAME</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isAuthed}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>
        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">DESCRIPTION</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={!isAuthed}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>
        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">PITCH / PROJECT UPLOAD URL</span>
          <div className="flex gap-2">
            <input
              value={pitchDeckUrl}
              onChange={(e) => setPitchDeckUrl(e.target.value)}
              placeholder="https://deck or docs link"
              disabled={!isAuthed || isUploading}
              className="flex-1 border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isAuthed || isUploading}
              className="border border-[#2a2a2a] bg-[#141414] px-4 py-2 text-[11px] font-mono text-[#ccff00] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isUploading ? "UPLOADING..." : "UPLOAD FILE"}
            </button>
          </div>
        </label>
        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">REPOSITORY (OPTIONAL)</span>
          <input
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="https://github.com/..."
            disabled={!isAuthed}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>
      </div>

      <button
        type="button"
        className="btn-primary mt-6 px-6 py-3 text-[10px]"
        disabled={!isAuthed || !name.trim() || createProject.isPending}
        onClick={handleCreate}
      >
        {createProject.isPending ? "CREATING..." : "[ CREATE PROJECT ]"}
      </button>

      {message && <p className="mt-4 text-[10px] font-mono text-[#ccff00]">{message}</p>}
      {!message && errMsg && <p className="mt-4 text-[10px] font-mono text-[#ff3131]">{errMsg}</p>}

      {unattached.length > 0 && (
        <div className="mt-8 border border-[#2a2a2a] p-4">
          <p className="text-[9px] font-mono text-[#555] mb-2">// READY FOR CAMPAIGN</p>
          <ul className="space-y-1 text-[10px] font-mono text-[#888]">
            {unattached.map((p) => (
              <li key={p.id} className="text-[#ccff00]">
                {p.name}
                {p.pitch_deck_url ? " · deck linked" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
