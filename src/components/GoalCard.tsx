import { LineChart, Banknote } from 'lucide-react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { Goal } from '@/store'

interface Props {
  value: Goal
  onChange: (g: Goal) => void
}

export default function GoalCard({ value, onChange }: Props) {
  const items: {
    key: Goal
    icon: React.ReactNode
    title: string
    desc: string
  }[] = [
    {
      key: 'gmv',
      icon: <LineChart size={22} strokeWidth={2.2} />,
      title: '冲销量',
      desc: '提升 GMV',
    },
    {
      key: 'margin',
      icon: <Banknote size={22} strokeWidth={2.2} />,
      title: '保毛利',
      desc: '控制成本',
    },
  ]

  return (
    <div>
      <div
        className="mb-3 text-[15px] font-semibold"
        style={{ color: 'var(--fg-primary)' }}
      >
        运营目标
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => {
          const active = value === it.key
          return (
            <motion.button
              key={it.key}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(it.key)}
              className={clsx(
                'relative flex flex-col items-center gap-[6px] rounded-2xl px-4 py-5 transition',
              )}
              style={{
                background: active ? 'var(--bg-card-soft)' : 'var(--bg-card)',
                border: '1.5px solid',
                borderColor: active ? 'var(--fg-brand)' : 'var(--border-soft)',
                boxShadow: active
                  ? '0 4px 14px rgba(46,107,255,0.12)'
                  : undefined,
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  color: active ? 'var(--fg-brand)' : 'var(--fg-secondary)',
                  background: active
                    ? 'rgba(46,107,255,0.08)'
                    : 'var(--bg-card-soft)',
                }}
              >
                {it.icon}
              </div>
              <div
                className="text-[15px] font-semibold"
                style={{
                  color: active ? 'var(--fg-brand)' : 'var(--fg-primary)',
                }}
              >
                {it.title}
              </div>
              <div
                className="text-[11px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {it.desc}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
