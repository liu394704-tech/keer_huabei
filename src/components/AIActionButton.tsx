import { Play, Pause } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  running: boolean
  onToggle: () => void
}

export default function AIActionButton({ running, onToggle }: Props) {
  return (
    <div className="relative">
      {/* 能量波纹：只在运行中显示 */}
      {running && (
        <>
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl animate-pulse-ring"
            style={{
              background:
                'radial-gradient(circle, rgba(255,190,22,0.35) 0%, rgba(255,190,22,0) 70%)',
            }}
          />
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl animate-pulse-ring"
            style={{
              animationDelay: '0.8s',
              background:
                'radial-gradient(circle, rgba(255,190,22,0.25) 0%, rgba(255,190,22,0) 70%)',
            }}
          />
        </>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        className="relative flex w-full items-center justify-center gap-2 rounded-2xl py-[14px] text-[16px] font-semibold"
        style={{
          background: running
            ? 'linear-gradient(90deg, #FFD87A 0%, #FFBE16 100%)'
            : 'linear-gradient(90deg, #2E6BFF 0%, #5A8CFF 100%)',
          color: running ? '#6B4600' : '#fff',
          boxShadow: running
            ? '0 10px 22px rgba(255,190,22,0.35)'
            : '0 10px 22px rgba(46,107,255,0.28)',
        }}
      >
        {running ? (
          <>
            <Pause size={18} fill="currentColor" strokeWidth={0} />
            <span>暂停 AI 运行</span>
          </>
        ) : (
          <>
            <Play size={18} fill="currentColor" strokeWidth={0} />
            <span>一键开启 AI</span>
          </>
        )}
      </motion.button>
    </div>
  )
}
