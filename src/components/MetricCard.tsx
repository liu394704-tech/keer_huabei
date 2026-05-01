import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  value: ReactNode
  trend: number
  trendSuffix?: string // 默认 '%'，ROI 这种指标传 ''
  inverseGood?: boolean // 数值越低越好（如成本节约）
}

export default function MetricCard({
  label,
  value,
  trend,
  trendSuffix = '%',
  inverseGood = false,
}: Props) {
  const isGood = inverseGood ? trend < 0 : trend > 0
  const color = isGood ? '#10B981' : '#EF4444'
  const Arrow = trend >= 0 ? ArrowUpRight : ArrowDownRight

  const trendAbs = Math.abs(trend)
  const trendText = `${trend >= 0 ? '+' : '-'}${trendAbs}${trendSuffix}`

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div
        className="text-[12px]"
        style={{ color: 'var(--fg-muted)' }}
      >
        {label}
      </div>
      <div
        className="mt-1 text-[22px] font-bold leading-tight"
        style={{ color: 'var(--fg-primary)' }}
      >
        {value}
      </div>
      <div
        className="mt-1 inline-flex items-center gap-[2px] text-[11px] font-medium"
        style={{ color }}
      >
        <Arrow size={12} strokeWidth={2.6} />
        {trendText}
      </div>
    </div>
  )
}
