"use client"

import { useRef, useCallback, useState, useMemo, useEffect } from "react"
import { SkillCard } from "./skill-card"
import { SkillDialog } from "./skill-dialog"

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

interface SkillsGridProps {
  skills: Skill[]
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const filterBarRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTabRef = useRef<HTMLButtonElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTag, setActiveTag] = useState<string>("所有")
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 })
  const [searchText, setSearchText] = useState("")
  const [confirmedSearchText, setConfirmedSearchText] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearchAnimating, setIsSearchAnimating] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  // Extract unique tags from all skills (excluding 页面还原)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    skills.forEach(skill => {
      skill.tags?.forEach(tag => {
        if (tag !== "页面还原") {
          tagSet.add(tag)
        }
      })
    })
    return ["所有", ...Array.from(tagSet)]
  }, [skills])

  // Filter skills based on active tag or search (use confirmed text for filtering)
  const filteredSkills = useMemo(() => {
    if (isSearchActive && confirmedSearchText.trim()) {
      const query = confirmedSearchText.toLowerCase().trim()
      return skills.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        skill.series?.toLowerCase().includes(query)
      )
    }
    if (isSearchActive && !confirmedSearchText.trim()) {
      return skills
    }
    if (activeTag === "所有") return skills
    return skills.filter(skill => skill.tags?.includes(activeTag))
  }, [skills, activeTag, isSearchActive, confirmedSearchText])

  // Handle series click from dialog - activate search with series name
  const handleSeriesClick = useCallback((seriesName: string) => {
    setDialogOpen(false)
    setIsSearchActive(true)
    setSearchText(seriesName)
    setConfirmedSearchText(seriesName)
    
    setTimeout(() => {
      setIsSearchAnimating(true)
      setIsSearchFocused(true)
      searchInputRef.current?.focus()
    }, 300)
  }, [])

  // Detect sticky state using IntersectionObserver
  useEffect(() => {
    const filterBar = filterBarRef.current
    if (!filterBar) return

    // Create a sentinel element to detect when filter bar becomes sticky
    const sentinel = document.createElement('div')
    sentinel.style.position = 'absolute'
    sentinel.style.top = '-69px' // 68px (sticky top) + 1px
    sentinel.style.height = '1px'
    sentinel.style.width = '1px'
    sentinel.style.pointerEvents = 'none'
    filterBar.parentElement?.insertBefore(sentinel, filterBar)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  // Update slider position when active tag changes
  useEffect(() => {
    if (isSearchActive) {
      if (searchTabRef.current) {
        const parentRect = searchTabRef.current.parentElement?.getBoundingClientRect()
        const tabRect = searchTabRef.current.getBoundingClientRect()
        if (parentRect) {
          setSliderStyle({
            left: tabRect.left - parentRect.left,
            width: tabRect.width,
          })
        }
      }
    } else {
      const activeIndex = allTags.indexOf(activeTag)
      const activeTab = tabsRef.current[activeIndex]
      if (activeTab) {
        const parentRect = activeTab.parentElement?.getBoundingClientRect()
        const tabRect = activeTab.getBoundingClientRect()
        if (parentRect) {
          setSliderStyle({
            left: tabRect.left - parentRect.left,
            width: tabRect.width,
          })
        }
      }
    }
  }, [activeTag, allTags, isSearchActive])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cardsRef.current.forEach((card) => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  }, [])

  const handleCardClick = (skill: Skill) => {
    setSelectedSkill(skill)
    setDialogOpen(true)
  }

  const handleSearchClick = () => {
    setIsSearchActive(true)
    // Wait for slider animation (300ms) to complete before starting search animation
    setTimeout(() => {
      setIsSearchAnimating(true)
      setIsSearchFocused(true)
      searchInputRef.current?.focus()
    }, 300)
  }

  const handleTagClick = (tag: string) => {
    setIsSearchActive(false)
    setIsSearchFocused(false)
    setIsSearchAnimating(false)
    setSearchText("")
    setConfirmedSearchText("")
    setActiveTag(tag)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    // Only update confirmed text if not composing (IME not active)
    if (!isComposing) {
      setConfirmedSearchText(e.target.value)
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    setConfirmedSearchText((e.target as HTMLInputElement).value)
  }

  const handleSearchBlur = () => {
    setIsSearchFocused(false)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  return (
    <div>
      {/* Mobile Filter Bar */}
      <div className={`md:hidden sticky top-[68px] z-40 flex gap-2 w-[calc(100%+12px)] -ml-1.5 mb-6 p-1.5 bg-secondary/70 backdrop-blur-xl rounded-lg transition-shadow duration-300 ${isSticky ? 'shadow-xl shadow-black/10 dark:shadow-black/30' : 'shadow-none'}`}>
        {/* Category Dropdown */}
        <div className="relative flex-1">
          <select
            value={isSearchActive ? "" : activeTag}
            onChange={(e) => {
              if (e.target.value) {
                handleTagClick(e.target.value)
              }
            }}
            className="w-full h-9 px-3 pr-8 text-sm font-medium bg-background rounded-md appearance-none cursor-pointer text-foreground focus:outline-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(96,165,250,0.5), inset 0 0 0 1px rgba(167,139,250,0.3)',
            }}
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {/* Search Input */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              setConfirmedSearchText(e.target.value)
              if (e.target.value.trim()) {
                setIsSearchActive(true)
              } else {
                setIsSearchActive(false)
              }
            }}
            placeholder="搜索"
            className="w-full h-9 pl-9 pr-3 text-sm bg-background rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(96,165,250,0.5), inset 0 0 0 1px rgba(167,139,250,0.3)',
            }}
          />
        </div>
      </div>

      {/* Desktop Tag Filter Tabs */}
      <div ref={filterBarRef} className={`hidden md:flex sticky top-[68px] z-40 w-[calc(100%+12px)] -ml-1.5 mb-6 p-1 bg-secondary/70 backdrop-blur-xl rounded-lg transition-shadow duration-300 ${isSticky ? 'shadow-xl shadow-black/10 dark:shadow-black/30' : 'shadow-none'}`}>
        {/* Sliding background indicator with subtle gradient border */}
        <div
          className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-out"
          style={{
            left: sliderStyle.left,
            width: sliderStyle.width,
            padding: '1px',
          }}
        >
          {/* Light mode gradient border */}
          <div 
            className="absolute inset-0 rounded-md dark:hidden"
            style={{
              background: "linear-gradient(135deg, rgba(96,165,250,0.5), rgba(167,139,250,0.5))",
            }}
          />
          {/* Dark mode gradient border */}
          <div 
            className="absolute inset-0 rounded-md hidden dark:block"
            style={{
              background: "linear-gradient(135deg, rgba(96,165,250,0.3), rgba(167,139,250,0.3))",
            }}
          />
          {/* White background inner */}
          <div className="relative w-full h-full bg-background rounded-[5px]" />
        </div>
        {allTags.map((tag, index) => (
          <button
            key={tag}
            ref={(el) => { tabsRef.current[index] = el }}
            onClick={() => handleTagClick(tag)}
            className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 rounded-md relative z-10 cursor-pointer ${
              !isSearchActive && activeTag === tag
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
        {/* Search Tab */}
        <button
          ref={searchTabRef}
          onClick={handleSearchClick}
          className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 rounded-md relative z-10 cursor-pointer min-w-0 overflow-hidden ${
            isSearchActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1.5 w-full justify-center px-3">
            {/* Search icon */}
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            {isSearchActive ? (
              <input
                ref={searchInputRef}
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onBlur={handleSearchBlur}
                onFocus={handleSearchFocus}
                placeholder="搜索"
                className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span>搜索</span>
            )}
          </span>
        </button>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[540px] content-start"
      >
        {filteredSkills.length === 0 ? (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center pt-32 text-muted-foreground">
            <img 
              src="/images/empty-box.jpg" 
              alt="Empty box" 
              className="w-32 h-32 mb-4 opacity-70 object-contain"
            />
            <p className="text-sm">没有找到相关 Skills</p>
            <button
              onClick={() => handleTagClick("所有")}
              className="mt-4 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
            >
              重置搜索条件
            </button>
          </div>
        ) : (
          filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              ref={(el) => { cardsRef.current[index] = el }}
              name={skill.name}
              description={skill.description}
              tags={skill.tags}
              author={skill.author}
              stars={skill.stars}
              installs={skill.installs}
              series={skill.series}
              onClick={() => handleCardClick(skill)}
            />
          ))
        )}
      </div>
      
      <SkillDialog
        skill={selectedSkill}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSeriesClick={handleSeriesClick}
      />
    </div>
  )
}
