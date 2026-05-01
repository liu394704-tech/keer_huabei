import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface Props {
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (v: number) => void
  presets?: number[]
}

export default function BudgetSlider({
  min = 1000,
  max = 10000,
  step = 500,
  value,
  onChange,
  presets = [3000, 5000, 8000],
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const percent = Math.min(1, Math.max(0, (value - min) / (max - min)))

  const commit = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      const raw = min + ratio * (max - min)
      const snapped = Math.round(raw / step) * step
      onChange(Math.max(min, Math.min(max, snapped)))
    },
    [min, max, step, onChange],
  )

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      commit(x)
    }
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [dragging, commit])

  return (
    <div className="app-card p-5">
      <div className="flex items-baseline justify-between">
        <span
          className="text-[14px] font-medium"
          style={{ color: 'var(--fg-secondary)' }}
        >
          月补贴上限
        </span>
        <span
          className="text-[24px] font-bold tabular-nums"
          style={{ color: 'var(--fg-brand)' }}
        >
          ¥{value.toLocaleString()}
        </span>
      </div>

      <div
        ref={trackRef}
        onMouseDown={(e) => {
          setDragging(true)
          commit(e.clientX)
        }}
        onTouchStart={(e) => {
          setDragging(true)
          commit(e.touches[0].clientX)
        }}
        className="relative mt-4 h-[6px] cursor-pointer rounded-full"
        style={{ background: 'var(--border-soft)' }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-150"
          style={{
            width: `${percent * 100}%`,
            background:
              'linear-gradient(90deg, var(--brand-1) 0%, var(--brand-2) 100%)',
          }}
        />
        <div
          className="absolute top-1/2 h-[20px] w-[20px] -translate-y-1/2 rounded-full border-[3px] shadow"
          style={{
            left: `calc(${percent * 100}% - 10px)`,
            background: '#fff',
            borderColor: 'var(--brand-1)',
            transition: dragging ? 'none' : 'left 0.15s',
          }}
        />
      </div>

      <div
        className="mt-2 flex justify-between text-[12px]"
        style={{ color: 'var(--fg-muted)' }}
      >
        <span>¥{min.toLocaleString()}</span>
        <span>¥{max.toLocaleString()}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {presets.map((p) => {
          const active = value === p
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={clsx(
                'rounded-xl py-[10px] text-[14px] font-medium transition active:scale-95',
              )}
              style={{
                background: active ? 'var(--fg-brand)' : 'var(--bg-card-soft)',
                color: active ? 'var(--fg-on-brand)' : 'var(--fg-secondary)',
                border: '1px solid',
                borderColor: active ? 'var(--fg-brand)' : 'var(--border-soft)',
              }}
            >
              ¥{p.toLocaleString()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
