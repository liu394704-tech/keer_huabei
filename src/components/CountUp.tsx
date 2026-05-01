import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  style?: React.CSSProperties
}

export default function CountUp({
  value,
  duration = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  style,
}: Props) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const startedAt = useRef<number | null>(null)
  const raf = useRef<number>()

  useEffect(() => {
    fromRef.current = display
    startedAt.current = null
    const from = display
    const to = value
    const step = (ts: number) => {
      if (startedAt.current == null) startedAt.current = ts
      const elapsed = ts - startedAt.current
      const p = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = from + (to - from) * eased
      setDisplay(current)
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  const formatted = Number(display).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
