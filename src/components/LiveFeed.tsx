import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, CheckCircle2, Wallet, Eye, Wifi } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store'
import { feedTemplates, formatTime } from '@/mock/data'

export default function LiveFeed() {
  const aiRunning = useAppStore((s) => s.aiRunning)
  const feed = useAppStore((s) => s.feed)
  const pushFeed = useAppStore((s) => s.pushFeed)
  const clearFeed = useAppStore((s) => s.clearFeed)
  const indexRef = useRef(0)

  // 开启 AI 后，立即补充 3 条初始记录 + 周期推送
  useEffect(() => {
    if (!aiRunning) return

    // 初始注入 3 条（若为空）
    const { feed: currentFeed } = useAppStore.getState()
    if (currentFeed.length === 0) {
      const seeds = [
        feedTemplates[0], // optimize
        feedTemplates[1], // succeed
        feedTemplates[2], // save
      ]
      seeds.forEach((s, i) => {
        setTimeout(() => {
          pushFeed({
            type: s.type,
            text: s.text,
            time: formatTime(Date.now() - (seeds.length - i) * 60_000),
          })
        }, i * 120)
      })
      indexRef.current = 3
    }

    // 每 4–7s 推送一条
    const tick = () => {
      const idx = indexRef.current % feedTemplates.length
      const tpl = feedTemplates[idx]
      pushFeed({ type: tpl.type, text: tpl.text, time: formatTime(Date.now()) })
      indexRef.current += 1
    }

    const interval = setInterval(tick, 4500)
    return () => clearInterval(interval)
  }, [aiRunning, pushFeed])

  // 关闭 AI 时清空
  useEffect(() => {
    if (!aiRunning) {
      clearFeed()
      indexRef.current = 0
    }
  }, [aiRunning, clearFeed])

  return (
    <section>
      <div className="mb-2 flex items-center justify-between px-1">
        <h3
          className="text-[15px] font-semibold"
          style={{ color: 'var(--fg-primary)' }}
        >
          实时干预动态
        </h3>
        {aiRunning && (
          <span className="flex items-center gap-1 text-[12px] text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            实时监控中
          </span>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-[20px] p-4"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-soft)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        {!aiRunning ? (
          <div className="flex items-center gap-3 py-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-card-soft)' }}
            >
              <Wifi
                size={22}
                strokeWidth={2}
                style={{ color: 'var(--fg-muted)' }}
              />
            </div>
            <span
              className="text-[13px]"
              style={{ color: 'var(--fg-muted)' }}
            >
              点击开启 AI 后查看实时动态
            </span>
          </div>
        ) : (
          <div className="flex gap-3">
            {/* 左侧雷达图标 */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{
                  background:
                    'radial-gradient(circle, rgba(46,107,255,0.3) 0%, rgba(46,107,255,0) 70%)',
                }}
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(46,107,255,0.12) 0%, rgba(46,107,255,0.04) 100%)',
                }}
              >
                <Wifi
                  size={22}
                  strokeWidth={2.2}
                  style={{ color: 'var(--fg-brand)' }}
                />
              </div>
            </div>

            {/* 右侧动态流 */}
            <div className="flex-1 space-y-4">
              <AnimatePresence initial={false}>
                {feed.slice(0, 4).map((f) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, x: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-start gap-2"
                  >
                    <FeedIcon type={f.type} />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[13px] leading-[20px]"
                        style={{ color: 'var(--fg-primary)' }}
                      >
                        {f.text}
                      </p>
                      <p
                        className="mt-[2px] text-[11px] tabular-nums"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {f.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function FeedIcon({ type }: { type: string }) {
  const map: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    optimize: {
      icon: <Sparkles size={14} strokeWidth={2.4} />,
      color: '#A855F7',
      bg: 'rgba(168,85,247,0.12)',
    },
    succeed: {
      icon: <CheckCircle2 size={14} strokeWidth={2.4} />,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.12)',
    },
    save: {
      icon: <Wallet size={14} strokeWidth={2.4} />,
      color: '#2E6BFF',
      bg: 'rgba(46,107,255,0.12)',
    },
    discover: {
      icon: <Eye size={14} strokeWidth={2.4} />,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
    },
  }
  const { icon, color, bg } = map[type] ?? map.optimize
  return (
    <div
      className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ color, background: bg }}
    >
      {icon}
    </div>
  )
}
