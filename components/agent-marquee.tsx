"use client"

import { Marquee } from "@/components/marquee"
import { OpenClaw, Cursor, Trae, Antigravity, ClaudeCode, OpenCode, Codex } from "@lobehub/icons"

const agents = [
  { name: "Openclaw", Icon: OpenClaw },
  { name: "Cursor", Icon: Cursor },
  { name: "TRAE", Icon: Trae },
  { name: "Antigravity", Icon: Antigravity },
  { name: "Claude Code", Icon: ClaudeCode },
  { name: "OpenCode", Icon: OpenCode },
  { name: "Codex", Icon: Codex },
]

export function AgentMarquee() {
  return (
    <div className="mt-6 sm:mt-8 w-full">
      <Marquee duration={35} pauseOnHover fade fadeAmount={15}>
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="flex items-center gap-2 mx-5 sm:mx-7 text-xs sm:text-sm text-muted-foreground/50 font-medium select-none"
          >
            <agent.Icon size={18} />
            <span>{agent.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
