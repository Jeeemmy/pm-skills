"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface Skill {
  name: string
  description: string
  tags?: string[]
  installation: string
  author?: string
  stars?: string
  installs?: string
  series?: string
  skillsUrl?: string
  repositoryUrl?: string
}

interface SkillDialogProps {
  skill: Skill | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSeriesClick?: (seriesName: string) => void
}

export function SkillDialog({ skill, open, onOpenChange, onSeriesClick }: SkillDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!skill) return
    try {
      await navigator.clipboard.writeText(skill.installation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (!skill) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto text-left">
        <DialogHeader className="text-left">
          {/* Title with tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <DialogTitle className="text-xl">{skill.name}</DialogTitle>
            {skill.tags && skill.tags.length > 0 && (
              <>
                {skill.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
          <DialogDescription className="text-sm sm:text-base leading-relaxed pt-2 text-left">
            {skill.description}
          </DialogDescription>
        </DialogHeader>

        {/* Author, Stars, Installs row */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {/* Author */}
            {skill.author && (
              <span className="flex items-center gap-1">
                {/* Author icon - @ symbol style */}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="-2 -2 28 28"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                </svg>
                {skill.author}
              </span>
            )}
            {/* Stars */}
            {skill.stars && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {skill.stars}
              </span>
            )}
            {/* Installs */}
            {skill.installs && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="-1 -1.5 26 26"
                >
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </svg>
                {skill.installs}
              </span>
            )}
          </div>
          {/* Data source link */}
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground/70 hover:text-muted-foreground transition-colors whitespace-nowrap"
          >
            <span>数据来自 skills.sh</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Series row */}
        {skill.series && (
          <button
            onClick={() => onSeriesClick?.(skill.series!)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
          >
            {/* Series icon - stacked layers style */}
            <svg
              className="w-3.5 h-3.5 inline-block align-text-bottom mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="-1.5 -1.5 27 27"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>来自 {skill.series} 系列，查看该系列更多 skills</span>
            {/* Right arrow icon */}
            <svg
              className="w-3 h-3 inline-block align-text-bottom ml-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Installation */}
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground mb-3">发送给任意 AI 安装 Skill</p>
          <div className="relative">
            <pre className="bg-muted rounded-lg p-4 pr-12 overflow-x-auto whitespace-pre-wrap break-all">
              <code className="text-sm text-foreground font-mono break-all">
                {skill.installation}
              </code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 rounded-md hover:bg-background/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="复制安装命令"
            >
              {copied ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
