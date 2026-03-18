import { ThemeToggle } from "@/components/theme-toggle"
import { SkillsGrid } from "@/components/skills-grid"
import { AIToolsDropdown } from "@/components/ai-tools-dropdown"
import { HeroBlobs } from "@/components/hero-blobs"
import { skills } from "@/data/skills"

export default function PMSkillsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="font-brand font-semibold text-foreground text-base tracking-tight">
            PM Skills
          </div>
          <div className="flex items-center gap-3">
            <AIToolsDropdown />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Header spacer for fixed header */}
      <div className="h-14" />

      {/* Hero Section */}
      <section className="h-[45vh] sm:h-[55vh] flex items-center justify-center relative">
        <HeroBlobs />
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 w-full text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
            <span className="font-brand">PM Skills</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 sm:mb-3">
            精选产品经理 AI Skills
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/70">
            装上 PM Skills，做需求交给 AI
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <main id="skills" className="flex-1 pb-12 relative z-10">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6">          
          <SkillsGrid skills={skills} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border relative z-10">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Axhub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
