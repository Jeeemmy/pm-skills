"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

const MIN_BLOB_COUNT = 2
const PIXELS_PER_BLOB = 200

const blobTemplates = [
  {
    left: -10,
    top: -15,
    width: 450,
    height: 280,
    colorClass: "bg-teal-400/[0.07] dark:bg-teal-400/[0.06]",
    animationClass: "animate-blob-1",
  },
  {
    left: 105,
    top: 5,
    width: 280,
    height: 420,
    colorClass: "bg-emerald-500/[0.055] dark:bg-emerald-500/[0.05]",
    animationClass: "animate-blob-2",
  },
  {
    left: 50,
    top: 35,
    width: 320,
    height: 200,
    colorClass: "bg-green-400/[0.06] dark:bg-green-400/[0.05]",
    animationClass: "animate-blob-3",
  },
  {
    left: 10,
    top: 58,
    width: 420,
    height: 260,
    colorClass: "bg-teal-500/[0.045] dark:bg-teal-500/[0.04]",
    animationClass: "animate-blob-4",
  },
  {
    left: 85,
    top: 12,
    width: 300,
    height: 400,
    colorClass: "bg-emerald-400/[0.055] dark:bg-emerald-400/[0.05]",
    animationClass: "animate-blob-5",
  },
  {
    left: 28,
    top: -8,
    width: 260,
    height: 360,
    colorClass: "bg-emerald-500/[0.05] dark:bg-emerald-500/[0.045]",
    animationClass: "animate-blob-2",
  },
  {
    left: 68,
    top: 48,
    width: 360,
    height: 220,
    colorClass: "bg-green-400/[0.05] dark:bg-green-400/[0.045]",
    animationClass: "animate-blob-3",
  },
  {
    left: 22,
    top: 20,
    width: 300,
    height: 190,
    colorClass: "bg-teal-400/[0.05] dark:bg-teal-400/[0.045]",
    animationClass: "animate-blob-1",
  },
  {
    left: 98,
    top: 42,
    width: 380,
    height: 240,
    colorClass: "bg-teal-500/[0.04] dark:bg-teal-500/[0.035]",
    animationClass: "animate-blob-4",
  },
  {
    left: 72,
    top: -10,
    width: 340,
    height: 230,
    colorClass: "bg-emerald-400/[0.045] dark:bg-emerald-400/[0.04]",
    animationClass: "animate-blob-5",
  },
  {
    left: 45,
    top: 60,
    width: 300,
    height: 320,
    colorClass: "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.035]",
    animationClass: "animate-blob-2",
  },
  {
    left: 58,
    top: 8,
    width: 280,
    height: 180,
    colorClass: "bg-green-400/[0.045] dark:bg-green-400/[0.04]",
    animationClass: "animate-blob-3",
  },
] as const

function getBlobCount(windowWidth: number) {
  return Math.max(MIN_BLOB_COUNT, Math.floor(windowWidth / PIXELS_PER_BLOB))
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function HeroBlobs() {
  const [blobCount, setBlobCount] = useState(MIN_BLOB_COUNT)

  useEffect(() => {
    const updateBlobCount = () => {
      const nextCount = getBlobCount(window.innerWidth)
      setBlobCount((currentCount) => (
        currentCount === nextCount ? currentCount : nextCount
      ))
    }

    updateBlobCount()
    window.addEventListener("resize", updateBlobCount)

    return () => {
      window.removeEventListener("resize", updateBlobCount)
    }
  }, [])

  const blobs = useMemo(() => {
    return Array.from({ length: blobCount }, (_, index) => {
      const cycle = Math.floor(index / blobTemplates.length)
      const template = blobTemplates[index % blobTemplates.length]
      const cycleDirection = cycle % 2 === 0 ? 1 : -1
      const horizontalShift = cycle === 0 ? 0 : cycleDirection * 6
      const verticalShift = cycle === 0 ? 0 : cycleDirection * 8

      return {
        key: `hero-blob-${index}`,
        className: cn(
          "absolute rounded-full",
          template.colorClass,
          template.animationClass,
        ),
        style: {
          left: `${clamp(template.left + horizontalShift, -12, 112)}%`,
          top: `${template.top + verticalShift}%`,
          width: template.width,
          height: template.height,
        },
      }
    })
  }, [blobCount])

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {blobs.map((blob) => (
        <div
          key={blob.key}
          className={blob.className}
          style={blob.style}
        />
      ))}
    </div>
  )
}
