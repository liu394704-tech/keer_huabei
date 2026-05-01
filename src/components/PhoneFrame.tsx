import type { ReactNode } from 'react'
import clsx from 'clsx'
import { useAppStore } from '@/store'

interface Props {
  children: ReactNode
}

/**
 * 模拟华为 Mate 60 Pro（6.82" FHD+ 2720×1260）的外框
 * 物理 2720×1260, DPR ≈ 3 -> CSS 逻辑 ≈ 420×907
 * 四曲面屏 + 居中药丸屏幕开孔
 */
export default function PhoneFrame({ children }: Props) {
  const mode = useAppStore((s) => s.mode)

  return (
    <div
      className="relative"
      style={{
        width: '448px',
        height: '940px',
        maxWidth: '100vw',
        maxHeight: '100dvh',
      }}
    >
      {/* 背壳 */}
      <div
        className="absolute inset-0 rounded-[60px] shadow-phone"
        style={{
          background:
            'linear-gradient(145deg, #1b1f27 0%, #0e1117 40%, #1a1d24 100%)',
        }}
      />
      {/* 金属边框 */}
      <div
        className="absolute inset-[4px] rounded-[58px]"
        style={{
          background:
            'linear-gradient(145deg, #3a3f4a 0%, #1a1d24 45%, #3a3f4a 100%)',
        }}
      />
      {/* 侧键提示 */}
      <div className="absolute -right-[2px] top-[190px] h-[90px] w-[3px] rounded-l bg-[#20242c]" />
      <div className="absolute -left-[2px] top-[170px] h-[50px] w-[3px] rounded-r bg-[#20242c]" />
      <div className="absolute -left-[2px] top-[240px] h-[90px] w-[3px] rounded-r bg-[#20242c]" />

      {/* 屏幕 */}
      <div
        data-theme={mode}
        className={clsx(
          'absolute inset-[10px] overflow-hidden rounded-[52px] curved-edge',
          'flex flex-col',
        )}
        style={{
          background: 'var(--bg-app)',
          transition: 'background-color 0.5s ease',
        }}
      >
        {/* 药丸摄像头 */}
        <div className="pointer-events-none absolute left-1/2 top-[14px] z-50 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  )
}
