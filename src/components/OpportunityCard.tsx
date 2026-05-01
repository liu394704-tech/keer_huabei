import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Check, X, Pencil, Sparkles } from 'lucide-react'
import type { Opportunity, OppStatus } from '@/store'

interface Props {
  opp: Opportunity
  onAction: (status: OppStatus) => void
  onModify: () => void
}

export default function OpportunityCard({ opp, onAction, onModify }: Props) {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-120, 0, 120],
    [
      'linear-gradient(90deg, rgba(239,68,68,0.15), transparent)',
      'transparent',
      'linear-gradient(-90deg, rgba(16,185,129,0.15), transparent)',
    ],
  )

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 90) onAction('accepted')
    else if (info.offset.x < -90) onAction('rejected')
  }

  const gradeColor =
    opp.grade === 'A'
      ? { bg: 'rgba(239,68,68,0.12)', fg: '#EF4444' }
      : { bg: 'rgba(59,130,246,0.12)', fg: '#3B82F6' }

  const statusBadge = getStatusBadge(opp.status)

  return (
    <motion.div
      className="relative"
      style={{ touchAction: 'pan-y' }}
    >
      {/* 左右滑提示（底层） */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-between rounded-2xl px-6"
        style={{ background }}
      >
        <div className="flex items-center gap-1 text-[13px] font-semibold text-emerald-500 opacity-0" />
        <div className="flex items-center gap-1 text-[13px] font-semibold text-red-500 opacity-0" />
      </motion.div>

      <motion.div
        drag={opp.status === 'pending' ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileTap={{ scale: 0.99 }}
        className="relative overflow-hidden rounded-2xl p-4"
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'var(--bg-card-soft)',
            border: '1px solid var(--border-card)',
          }}
        />

        <div className="relative">
          {/* 顶部 */}
          <div className="flex items-center gap-2">
            <span
              className="rounded-md px-[6px] py-[2px] text-[11px] font-semibold"
              style={{ background: gradeColor.bg, color: gradeColor.fg }}
            >
              {opp.grade} 类
            </span>
            <span
              className="text-[15px] font-semibold"
              style={{ color: 'var(--fg-primary)' }}
            >
              {opp.title}
            </span>
            <span className="ml-auto text-[11px]" style={{ color: 'var(--fg-muted)' }}>
              置信度{' '}
              <span
                className="text-[14px] font-bold tabular-nums"
                style={{ color: 'var(--fg-brand)' }}
              >
                {opp.confidence}%
              </span>
            </span>
          </div>

          {/* 描述 */}
          <p
            className="mt-2 text-[13px] leading-[20px]"
            style={{ color: 'var(--fg-secondary)' }}
          >
            {opp.insight}
          </p>

          {/* 建议 */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
            <span style={{ color: 'var(--fg-muted)' }}>建议：</span>
            <span
              className="font-semibold"
              style={{ color: 'var(--fg-brand)' }}
            >
              {opp.customValue ?? opp.suggestion}
            </span>
            <span
              className="inline-flex items-center rounded-md px-[6px] py-[1px] text-[11px] font-medium"
              style={{
                background: 'rgba(16,185,129,0.12)',
                color: '#10B981',
              }}
            >
              ROI {opp.roi}
            </span>
          </div>

          {/* 按钮 */}
          {opp.status === 'pending' ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              <ActionButton
                label="接受"
                active
                onClick={() => onAction('accepted')}
              />
              <ActionButton
                label="拒绝"
                onClick={() => onAction('rejected')}
              />
              <ActionButton
                label="修改"
                accent
                onClick={onModify}
              />
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2">
              {statusBadge}
              {opp.status !== 'rejected' && (
                <button
                  onClick={() => onAction('pending')}
                  className="ml-auto text-[12px] underline"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  撤回
                </button>
              )}
              {opp.status === 'rejected' && (
                <button
                  onClick={() => onAction('pending')}
                  className="ml-auto text-[12px] underline"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  重新评估
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ActionButton({
  label,
  active = false,
  accent = false,
  onClick,
}: {
  label: string
  active?: boolean
  accent?: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="rounded-xl py-[8px] text-[13px] font-medium transition"
      style={{
        background: active
          ? 'var(--fg-brand)'
          : accent
            ? 'rgba(255,190,22,0.1)'
            : 'transparent',
        color: active
          ? 'var(--fg-on-brand)'
          : accent
            ? '#E5A508'
            : 'var(--fg-secondary)',
        border: '1px solid',
        borderColor: active
          ? 'var(--fg-brand)'
          : accent
            ? 'rgba(255,190,22,0.4)'
            : 'var(--border-soft)',
      }}
    >
      {label}
    </motion.button>
  )
}

function getStatusBadge(status: OppStatus) {
  const map: Record<
    string,
    { icon: React.ReactNode; text: string; bg: string; color: string }
  > = {
    accepted: {
      icon: <Check size={14} strokeWidth={2.6} />,
      text: '已采纳',
      bg: 'rgba(16,185,129,0.12)',
      color: '#10B981',
    },
    rejected: {
      icon: <X size={14} strokeWidth={2.6} />,
      text: '已拒绝',
      bg: 'rgba(148,163,184,0.16)',
      color: '#64748B',
    },
    modified: {
      icon: <Pencil size={14} strokeWidth={2.6} />,
      text: '已调整',
      bg: 'rgba(245,158,11,0.12)',
      color: '#F59E0B',
    },
    pending: {
      icon: <Sparkles size={14} strokeWidth={2.4} />,
      text: '待决策',
      bg: 'rgba(46,107,255,0.08)',
      color: '#2E6BFF',
    },
  }
  const v = map[status]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-[5px] text-[12px] font-medium"
      style={{ background: v.bg, color: v.color }}
    >
      {v.icon}
      {v.text}
    </span>
  )
}
