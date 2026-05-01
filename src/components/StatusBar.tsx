import { Signal, Wifi, BatteryFull } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  tone?: 'light' | 'dark'
}

/**
 * 模拟 iOS/Android 顶部状态栏。
 * - 在 Capacitor 原生壳中，系统已经渲染真实状态栏，这里自动隐藏。
 * - 在桌面 / 移动浏览器中，仍然展示作为 UI 的一部分。
 */
export default function StatusBar({ tone = 'dark' }: Props) {
  const [time, setTime] = useState(() => currentTime())
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    const cap = (window as unknown as {
      Capacitor?: { isNativePlatform?: () => boolean }
    }).Capacitor
    setIsNative(Boolean(cap?.isNativePlatform?.()))

    const t = setInterval(() => setTime(currentTime()), 30_000)
    return () => clearInterval(t)
  }, [])

  if (isNative) return null

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
