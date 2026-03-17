"use client"

import { useRef, useState, useEffect } from "react"

const pricingPlans = [
  {
    name: "在线自学",
    price: "0",
    unit: "",
    description: "通过官网文档、视频号和公众号信息进行自学，适合有一定基础的同学。",
    features: [
      "工具帮助文档",
      "视频号和公众号教程",
      "预计每月 2 场直播",
      "平均学习时长约 2 个月",
    ],
    buttonText: "查看文档",
    recommended: false,
  },
  {
    name: "社群交流",
    price: "49",
    unit: "/年",
    description: "加入飞书社群，获取更系统、更深度的学习资料，与同行交流。",
    features: [
      "社群问答互助",
      "产品相关的 AI 资源和实践分享",
      "预计每月 4 场直播或回放",
      "平均节省 25% 学习时间，提升 20% 成效",
    ],
    buttonText: "加入社群",
    recommended: false,
  },
  {
    name: "专业训练营",
    price: "199",
    unit: "/期",
    description: "通过 1 对 1 指导实战，专属视频课程，定制直播，微信群答疑，可在 1 个月内掌握实战技能。",
    features: [
      "15 项实战任务，支持 1 对 1 指导",
      "专属视频课程，定制直播内容",
      "加入飞书社群/年（价值 49 元）",
      "平均节省 50% 学习时间，提升 30% 成效",
    ],
    buttonText: "马上报名",
    recommended: true,
  },
]

function PricingCard({ 
  plan, 
  mouseX, 
  mouseY 
}: { 
  plan: typeof pricingPlans[0]
  mouseX: number
  mouseY: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [localX, setLocalX] = useState(0)
  const [localY, setLocalY] = useState(0)

  useEffect(() => {
    if (cardRef.current && mouseX !== 0 && mouseY !== 0) {
      const rect = cardRef.current.getBoundingClientRect()
      setLocalX(mouseX - rect.left)
      setLocalY(mouseY - rect.top)
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-lg ${plan.recommended ? 'bg-foreground text-background' : 'skill-card bg-card'}`}
      style={{
        '--mouse-x': `${localX}px`,
        '--mouse-y': `${localY}px`,
      } as React.CSSProperties}
    >
      {/* Border glow layer */}
      {!plan.recommended && (
        <div 
          className="skill-card-glow absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--primary), transparent 70%)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Recommended badge */}
      {plan.recommended && (
        <div className="absolute -top-px -right-px bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-tr-lg rounded-bl-lg">
          推荐
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <h3 className={`font-semibold text-lg mb-3 ${plan.recommended ? 'text-background' : 'text-foreground'}`}>
          {plan.name}
        </h3>
        
        <div className="mb-4">
          <span className={`text-3xl font-bold ${plan.recommended ? 'text-background' : 'text-foreground'}`}>
            ¥{plan.price}
          </span>
          {plan.unit && (
            <span className={`text-sm ${plan.recommended ? 'text-background/70' : 'text-muted-foreground'}`}>
              {plan.unit}
            </span>
          )}
        </div>

        <p className={`text-sm mb-6 leading-relaxed ${plan.recommended ? 'text-background/80' : 'text-muted-foreground'}`}>
          {plan.description}
        </p>

        <ul className="flex-1 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 mb-2">
              <svg 
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-primary' : 'text-muted-foreground'}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-sm ${plan.recommended ? 'text-background/90' : 'text-muted-foreground'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
            plan.recommended
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-background border border-border text-foreground hover:bg-secondary'
          }`}
        >
          {plan.buttonText}
        </button>
      </div>
    </div>
  )
}

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-[960px] mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          学习与 AI 协作
        </h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          在 AI 高速发展的初期，我们认为需要投入一定的时间和精力去学习，才能掌握和 AI 协作并落地。欢迎有同样理念的同学和我们一起。
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Axhub 提供的 Make / Runtime / Chrome 扩展等 AI 工具都是免费的，欢迎大家通过知识付费来支持我们继续探索。
        </p>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onMouseMove={handleMouseMove}
        >
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
