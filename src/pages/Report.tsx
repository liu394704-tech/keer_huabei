import { HelpCircle, Users, Clock3 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import StatusBar from '@/components/StatusBar'
import PageHeader from '@/components/PageHeader'
import MetricCard from '@/components/MetricCard'
import CountUp from '@/components/CountUp'
import GmvBarChart from '@/components/GmvBarChart'
import {
  gmvSeven,
  gmvThirty,
  reportSeven,
  reportThirty,
} from '@/mock/data'

type Period = 'week' | 'month'

export default function Report() {
  const [period, setPeriod] = useState<Period>('week')
  const data = period === 'week' ? reportSeven : reportThirty
  const chartData = useMemo(
    () => (period === 'week' ? gmvSeven : gmvThirty),
    [period],
  )

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ background: 'var(--bg-app)' }}
    >
      <StatusBar tone="dark" />
      <PageHeader title="经营战报" subtitle="花呗·见微 AI 驱动增长" />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* 周期切换 */}
        <div
          className="relative mb-4 grid grid-cols-2 rounded-2xl p-1"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <PeriodTab
            active={period === 'week'}
            onClick={() => setPeriod('week')}
          >
            近 7 天
          </PeriodTab>
          <PeriodTab
            active={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            近 30 天
          </PeriodTab>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="absolute top-1 h-[calc(100%-8px)] rounded-xl"
            style={{
              width: 'calc(50% - 4px)',
              left: period === 'week' ? '4px' : 'calc(50% + 0px)',
              background: 'var(--fg-brand)',
              zIndex: 0,
              boxShadow: '0 6px 14px rgba(46,107,255,0.24)',
            }}
          />
        </div>

        {/* 净增益卡片 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={period + 'net'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="app-card p-5"
          >
            <div
              className="text-[13px] font-medium"
              style={{ color: 'var(--fg-secondary)' }}
            >
              AI 净增益
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <CountUp
                value={data.netGain}
                prefix="+¥"
                className="text-[34px] font-bold leading-none tabular-nums"
                style={{ color: 'var(--fg-brand)' }}
              />
              <span
                className="text-[12px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                较未开启增长
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <CompareBar
                label="未开启 AI"
                value={data.withoutAI}
                max={data.withAI}
                color="#C7D0DC"
              />
              <CompareBar
                label="开启 AI"
                value={data.withAI}
                max={data.withAI}
                color="#2E6BFF"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 四宫格 */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard
            label="增量 GMV"
            value={
              <CountUp
                value={data.metrics.gmvDelta.value}
                prefix="+¥"
                className="tabular-nums"
              />
            }
            trend={data.metrics.gmvDelta.trend}
          />
          <MetricCard
            label="AI ROI"
            value={<span className="tabular-nums">{data.metrics.roi.value}</span>}
            trend={data.metrics.roi.trend}
            trendSuffix=""
          />
          <MetricCard
            label="成本节约"
            value={
              <CountUp
                value={data.metrics.costSave.value}
                prefix="¥"
                className="tabular-nums"
              />
            }
            trend={data.metrics.costSave.trend}
            inverseGood
          />
          <MetricCard
            label="转化率"
            value={
              <CountUp
                value={data.metrics.conversion.value}
                decimals={1}
                suffix="%"
                className="tabular-nums"
              />
            }
            trend={data.metrics.conversion.trend}
          />
        </div>

        {/* GMV 对比 */}
        <section
          className="mt-4 rounded-[20px] p-4"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-soft)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div
              className="text-[14px] font-semibold"
              style={{ color: 'var(--fg-primary)' }}
            >
              GMV 对比
            </div>
            <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[#C7D0DC]" />
                未开启
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[#2E6BFF]" />
                开启 AI
              </span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={period + 'chart'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GmvBarChart data={chartData} compact={period === 'month'} />
            </motion.div>
          </AnimatePresence>
        </section>

        {/* AI 洞察分析 */}
        <section
          className="mt-4 rounded-[20px] p-4"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-soft)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div
            className="mb-3 text-[14px] font-semibold"
            style={{ color: 'var(--fg-primary)' }}
          >
            AI 洞察分析
          </div>
          <div className="space-y-3">
            {data.insights.map((it, i) => (
              <div key={i} className="flex items-start gap-3">
                <InsightIcon kind={it.icon} />
                <p
                  className="flex-1 text-[13px] leading-[20px]"
                  style={{ color: 'var(--fg-secondary)' }}
                >
                  {it.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PeriodTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="relative z-10 py-[8px] text-[13px] font-medium transition"
      style={{
        color: active ? 'var(--fg-on-brand)' : 'var(--fg-secondary)',
      }}
    >
      {children}
    </button>
  )
}

function CompareBar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  const pct = Math.min(1, value / Math.max(1, max))
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="flex items-center gap-1" style={{ color: 'var(--fg-muted)' }}>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: color }}
          />
          {label}
        </span>
        <span className="tabular-nums" style={{ color: 'var(--fg-primary)' }}>
          ¥{value.toLocaleString()}
        </span>
      </div>
      <div
        className="mt-1 h-[6px] w-full overflow-hidden rounded-full"
        style={{ background: 'var(--bg-card-soft)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function InsightIcon({ kind }: { kind: string }) {
  const map: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
  > = {
    help: {
      icon: <HelpCircle size={16} strokeWidth={2.4} />,
      color: '#2E6BFF',
      bg: 'rgba(46,107,255,0.1)',
    },
    users: {
      icon: <Users size={16} strokeWidth={2.4} />,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
    },
    clock: {
      icon: <Clock3 size={16} strokeWidth={2.4} />,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
    },
  }
  const v = map[kind] ?? map.help
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
      style={{ background: v.bg, color: v.color }}
    >
      {v.icon}
    </div>
  )
}
