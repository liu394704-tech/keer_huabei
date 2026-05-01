import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  Brain,
  Coins,
  Compass,
  Database,
  Gauge,
  LineChart,
  Lock,
  Rocket,
  Search,
  Shield,
  Sliders,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '@/components/StatusBar'
import ModeToggle from '@/components/ModeToggle'
import { useAppStore } from '@/store'

export default function Home() {
  const mode = useAppStore((s) => s.mode)
  const setMode = useAppStore((s) => s.setMode)
  const navigate = useNavigate()
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null)

  const handleToggle = (m: typeof mode) => {
    if (m === mode) return
    setRipple({ x: m === 'novice' ? 25 : 75, y: 18, key: Date.now() })
    setMode(m)
  }

  const isNovice = mode === 'novice'

  const headerBg = isNovice
    ? 'linear-gradient(180deg, #2E6BFF 0%, #1F56EB 100%)'
    : 'linear-gradient(180deg, #0B1120 0%, #141C33 100%)'

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        background: 'var(--bg-app)',
        transition: 'background-color 0.5s ease',
      }}
    >
      {/* 主题扩散动画 */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            onAnimationComplete={() => setRipple(null)}
            className="pointer-events-none absolute h-[380px] w-[380px] rounded-full"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              translate: '-50% -50%',
              background:
                mode === 'novice'
                  ? 'radial-gradient(circle, rgba(46,107,255,0.9) 0%, rgba(46,107,255,0) 70%)'
                  : 'radial-gradient(circle, rgba(255,190,22,0.85) 0%, rgba(255,190,22,0) 70%)',
              zIndex: 30,
            }}
          />
        )}
      </AnimatePresence>

      {/* 顶部彩色 Header（只覆盖状态栏 + 标题 + 模式切换） */}
      <div
        className="relative z-10 rounded-b-[28px]"
        style={{
          background: headerBg,
          boxShadow: isNovice
            ? '0 12px 28px -12px rgba(46,107,255,0.4)'
            : '0 12px 28px -12px rgba(0,0,0,0.55)',
          transition: 'background 0.5s ease',
        }}
      >
        <StatusBar tone="light" />

        <div className="px-5 pb-6 pt-1 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <TrendingUp size={20} strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold leading-tight tracking-wide">
                花呗·见微
              </h1>
              <p className="text-[12px] opacity-80">智能商家增长助手</p>
            </div>
          </div>

          <div className="mt-4">
            <ModeToggle mode={mode} onChange={handleToggle} />
          </div>
        </div>
      </div>

      {/* 可滚动内容 —— 与蓝色 header 留出清晰空白 */}
      <div className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-5 pb-6 pt-6">
        <AnimatePresence mode="wait">
          {isNovice ? (
            <motion.div
              key="novice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <NoviceCard />
              <FeatureHighlights mode="novice" />
            </motion.div>
          ) : (
            <motion.div
              key="expert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <ExpertCard />
              <FeatureHighlights mode="expert" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div
        className="relative z-10 px-5 pb-5 pt-3 safe-bottom"
        style={{
          background:
            'linear-gradient(180deg, rgba(244,247,252,0) 0%, var(--bg-app) 30%)',
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(isNovice ? '/novice' : '/expert')}
          className="w-full rounded-2xl py-[14px] text-[16px] font-semibold shadow-card-lg"
          style={{
            background: isNovice
              ? 'linear-gradient(90deg, #2E6BFF 0%, #5A8CFF 100%)'
              : 'linear-gradient(90deg, #FFBE16 0%, #FFCE3D 100%)',
            color: isNovice ? '#fff' : '#1A1407',
          }}
        >
          开启花呗·见微
        </motion.button>
        <p
          className="mt-3 text-center text-[11px]"
          style={{ color: 'var(--fg-muted)' }}
        >
          登录即表示同意
          <span style={{ color: 'var(--fg-brand)' }}>《花呗商家服务协议》</span>
        </p>
      </div>
    </div>
  )
}

function NoviceCard() {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#2E6BFF]">
          <Sparkles size={22} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold text-ink-800">小白模式</h2>
          <p className="mt-1 text-[12px] text-ink-400">省心托管 · 自动优化</p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-[22px] text-ink-600">
        AI 将自动分析市场趋势和用户行为，为您智能调整补贴策略，实现 GMV 稳健增长。
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {['轻松上手', '一键托管', '智能调优'].map((t) => (
          <span key={t} className="app-chip">
            ✓ {t}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        <FeatureCell icon={<Zap size={18} />} label="实时监控" color="#2E6BFF" />
        <FeatureCell icon={<LineChart size={18} />} label="自动调优" color="#2E6BFF" />
        <FeatureCell icon={<Shield size={18} />} label="稳定可靠" color="#2E6BFF" />
        <FeatureCell icon={<Lock size={18} />} label="风险防控" color="#2E6BFF" />
      </div>
    </div>
  )
}

function ExpertCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-5"
      style={{
        background:
          'linear-gradient(160deg, #1a1f34 0%, #141a2d 60%, #1a1f34 100%)',
        border: '1px solid rgba(255, 190, 22, 0.25)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
      }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-expert-400/10 blur-2xl" />
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-expert-400/15 text-expert-300">
          <Brain size={22} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold text-white">专家模式</h2>
          <p className="mt-1 text-[12px] text-white/70">深度洞察 · 精准掌控</p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-[22px] text-white/85">
        AI 提供实时商机洞察和策略建议，您可自主决策、灵活调整，把握每一个增长机会。
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: <Compass size={12} />, text: '全局洞察' },
          { icon: <Sliders size={12} />, text: '精准调控' },
          { icon: <Gauge size={12} />, text: '数据驱动' },
        ].map((c) => (
          <span
            key={c.text}
            className="inline-flex items-center gap-1 rounded-full bg-expert-400/10 px-3 py-1 text-[12px] text-expert-300"
          >
            {c.icon}
            {c.text}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        <FeatureCell dark icon={<Search size={18} />} label="商机发现" color="#FFBE16" />
        <FeatureCell dark icon={<Sliders size={18} />} label="策略调控" color="#FFBE16" />
        <FeatureCell dark icon={<Rocket size={18} />} label="精准执行" color="#FFBE16" />
        <FeatureCell dark icon={<Database size={18} />} label="数据洞察" color="#FFBE16" />
      </div>
    </div>
  )
}

function FeatureCell({
  icon,
  label,
  color,
  dark = false,
}: {
  icon: React.ReactNode
  label: string
  color: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl py-2">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-[10px]"
        style={{
          background: dark ? 'rgba(255,190,22,0.1)' : '#EEF3FF',
          color,
        }}
      >
        {icon}
      </div>
      <span
        className="text-[11px]"
        style={{ color: dark ? 'rgba(255,255,255,0.8)' : '#515B6B' }}
      >
        {label}
      </span>
    </div>
  )
}

function FeatureHighlights({ mode }: { mode: 'novice' | 'expert' }) {
  const items =
    mode === 'novice'
      ? [
          {
            icon: <Coins size={20} />,
            title: '成本优化',
            desc: '精准投放，降低无效补贴',
            bg: '#EEF3FF',
            color: '#2E6BFF',
          },
          {
            icon: <Activity size={20} />,
            title: 'GMV 增长',
            desc: '智能权益，提升转化率',
            bg: '#EEF3FF',
            color: '#2E6BFF',
          },
        ]
      : [
          {
            icon: <Coins size={20} />,
            title: '精准投放',
            desc: '降低无效补贴',
            bg: 'rgba(255,190,22,0.08)',
            color: '#FFBE16',
          },
          {
            icon: <BarChart3 size={20} />,
            title: '智能权益',
            desc: '提升转化率',
            bg: 'rgba(255,190,22,0.08)',
            color: '#FFBE16',
          },
        ]

  const dark = mode === 'expert'
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {items.map((it) => (
        <div
          key={it.title}
          className="rounded-2xl p-4"
          style={{
            background: dark ? 'rgba(20,28,51,0.8)' : '#fff',
            border: dark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid #eef2f7',
            boxShadow: dark
              ? '0 8px 20px rgba(0,0,0,0.3)'
              : '0 4px 16px rgba(25,50,100,0.05)',
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: it.bg, color: it.color }}
          >
            {it.icon}
          </div>
          <div
            className="mt-3 text-[15px] font-semibold"
            style={{ color: dark ? '#fff' : '#0E1421' }}
          >
            {it.title}
          </div>
          <div
            className="mt-1 text-[12px] leading-[18px]"
            style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#8A93A2' }}
          >
            {it.desc}
          </div>
        </div>
      ))}
    </div>
  )
}
