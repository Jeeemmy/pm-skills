"use client"

import { forwardRef } from "react"

interface SkillCardProps {
  name: string
  description: string
  tags?: string[]
  author?: string
  stars?: string
  installs?: string
  series?: string
  onClick?: () => void
}

export const SkillCard = forwardRef<HTMLDivElement, SkillCardProps>(
  function SkillCard({ name, description, tags = [], author, stars, installs, series, onClick }, ref) {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="skill-card group relative rounded-lg p-4 sm:p-5 cursor-pointer h-[140px] sm:h-[148px] overflow-hidden"
      >
        {/* Border glow layer - follows mouse with blue-purple gradient */}
        <div 
          className="skill-card-glow absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          {/* Light mode - more visible */}
          <div 
            className="absolute inset-0 dark:hidden"
            style={{
              background: `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.85), rgba(167,139,250,0.85) 50%, transparent 70%)`,
            }}
          />
          {/* Dark mode - subtle */}
          <div 
            className="absolute inset-0 hidden dark:block"
            style={{
              background: `radial-gradient(250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.5), rgba(167,139,250,0.5) 50%, transparent 70%)`,
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Title row with tags */}
          <div className="flex items-center gap-2 mb-2 min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate shrink-0 max-w-[50%] sm:max-w-none sm:truncate-none sm:line-clamp-1">
              {name}
            </h3>
            {tags.length > 0 && (
              <div className="flex gap-1.5 shrink-0">
                {tags.slice(0, 1).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
                <span className="hidden sm:inline text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                  {tags[1]}
                </span>
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
          
          {/* Author, stars, installs and series */}
          {(author || stars || installs || series) && (
            <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                {author && (
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
                    {author}
                  </span>
                )}
                {stars && (
                  <span className="flex items-center gap-1">
                    {/* Star icon - line style */}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    {stars}
                  </span>
                )}
                {installs && (
                  <span className="flex items-center gap-1">
                    {/* Package icon - line style, slightly smaller via viewBox */}
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
                    {installs}
                  </span>
                )}
              </div>
              {series && (
                <span className="hidden sm:inline text-muted-foreground/70">{series} 系列</span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
