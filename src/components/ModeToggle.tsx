import { Heart, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { Mode } from '@/store'

interface Props {
  mode: Mode
  onChange: (m: Mode) => void
}

export default function ModeToggle({ mode, onChange }: Props) {
  return (
    <div
      className="relative grid grid-cols-2 gap-3 rounded-2xl p-3"
      style={{
        background:
          mode === 'novice'
            ? 'rgba(255,255,255,0.14)'
            : 'rgba(255,255,255,0.06)',
      }}
    >
      <TabButton
        active={mode === 'novice'}
        mode={mode}
        onClick={() => onChange('novice')}
        icon={<Heart size={22} strokeWidth={2.2} />}
        title="小白模式"
        subtitle="智能全托管"
      />
      <TabButton
        active={mode === 'expert'}
        mode={mode}
        onClick={() => onChange('expert')}
        icon={<Brain size={22} strokeWidth={2.2} />}
        title="专家模式"
        subtitle="辅助决策"
      />
    </div>
  )
}

function TabButton({
  active,
  mode,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean
  mode: Mode
  onClick: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  const activeBg = mode === 'novice' ? '#ffffff' : '#FFBE16'
  const activeFg = mode === 'novice' ? '#1F56EB' : '#1A1407'
  const inactiveFg = mode === 'novice' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)'

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={clsx(
        'relative flex flex-col items-center gap-1 rounded-xl py-4 transition',
        'overflow-hidden',
      )}
      style={{
        background: active ? activeBg : 'transparent',
        color: active ? activeFg : inactiveFg,
        boxShadow: active ? '0 6px 20px rgba(0,0,0,0.15)' : undefined,
      }}
    >
      <div>{icon}</div>
      <div className="text-[15px] font-semibold leading-none">{title}</div>
      <div className="text-[11px] leading-none opacity-80">{subtitle}</div>
    </motion.button>
  )
}
