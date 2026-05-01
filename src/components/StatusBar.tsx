import { Signal, Wifi, BatteryFull } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  tone?: 'light' | 'dark'
}

export default function StatusBar({ tone = 'dark' }: Props) {
  const [time, setTime] = useState(() => currentTime())

  useEffect(() => {
    const t = setInterval(() => setTime(currentTime()), 30_000)
    return () => clearInterval(t)
  }, [])

  const color = tone === 'light' ? '#ffffff' : 'var(--fg-primary)'

  return (
    <div
      className="relative flex h-[46px] shrink-0 items-center justify-between px-7 pt-[6px] text-[13px] font-medium"
      style={{ color }}
    >
      <span className="tracking-wide">{time}</span>
      <span className="flex items-center gap-[6px]">
        <Signal size={14} strokeWidth={2.4} />
        <Wifi size={14} strokeWidth={2.4} />
        <span className="flex items-center gap-[2px] text-[11px]">
          <span>79</span>
          <BatteryFull size={18} strokeWidth={2} />
        </span>
      </span>
    </div>
  )
}

function currentTime() {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}
