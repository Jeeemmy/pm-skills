"use client"

import { useState, useRef, useEffect } from "react"

const aiTools = [
  {
    name: "产品 AI 工作台",
    url: "https://axhub.im/make/",
  },
  {
    name: "网页转 Axure 原型",
    url: "https://axhub.im/chrome/",
  },
  {
    name: "网页转 Figma 设计稿",
    url: "https://axhub.im/chrome/",
  },
]

export function AIToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleClick = () => {
    setIsOpen(true)
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={handleClick}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-3 py-2"
      >
        AI 原型工具
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 pt-1 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-48 bg-background border border-border rounded-lg shadow-lg py-1">
            {aiTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
