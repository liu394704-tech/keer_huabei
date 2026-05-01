import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Opportunity } from '@/store'

interface Props {
  open: boolean
  opp: Opportunity | null
  onClose: () => void
  onConfirm: (value: string) => void
}

export default function CustomAmountSheet({ open, opp, onClose, onConfirm }: Props) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (open) setValue('')
  }, [open])

  return (
    <AnimatePresence>
      {open && opp && (
        <>
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-40 sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[28px] p-5 safe-bottom"
            style={{ background: 'var(--bg-card)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <div className="mx-auto mb-3 h-[4px] w-[40px] rounded-full bg-ink-200/60" />
            <div className="flex items-center justify-between">
              <h3
                className="text-[18px] font-semibold"
                style={{ color: 'var(--fg-primary)' }}
              >
                自定义金额
              </h3>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full active:scale-95"
                style={{ color: 'var(--fg-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="mt-4 rounded-2xl p-4"
              style={{ background: 'var(--bg-card-soft)' }}
            >
              <div
                className="text-[13px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                修改分期期数
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                  建议：
                </span>
                <span
                  className="text-[15px] font-semibold"
                  style={{ color: 'var(--fg-brand)' }}
                >
                  {opp.suggestion}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="输入自定义金额（元）"
                className="w-full rounded-2xl px-4 py-[14px] text-[14px] outline-none"
                style={{
                  background: 'var(--bg-card-soft)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--fg-primary)',
                }}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!value.trim()}
              onClick={() => onConfirm(value.trim())}
              className="mt-4 w-full rounded-2xl py-[14px] text-[16px] font-semibold disabled:opacity-50"
              style={{
                background: 'var(--fg-brand)',
                color: 'var(--fg-on-brand)',
              }}
            >
              确认修改
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
