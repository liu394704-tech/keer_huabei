import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  title: string
  subtitle?: string
  right?: ReactNode
  solid?: boolean
  back?: boolean
  onBack?: () => void
}

export default function PageHeader({
  title,
  subtitle,
  right,
  solid = false,
  back = true,
  onBack,
}: Props) {
  const navigate = useNavigate()
  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <div
      className={clsx(
        'relative flex h-[78px] shrink-0 items-center px-4',
        solid ? 'text-white' : '',
      )}
      style={solid ? { background: 'var(--bg-header)' } : undefined}
    >
      {back && (
        <button
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95"
          style={{ color: solid ? '#fff' : 'var(--fg-primary)' }}
        >
          <ChevronLeft size={24} strokeWidth={2.2} />
        </button>
      )}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          className="text-[17px] font-semibold"
          style={{ color: solid ? '#fff' : 'var(--fg-primary)' }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="mt-[2px] text-[11px]"
            style={{ color: solid ? 'rgba(255,255,255,0.8)' : 'var(--fg-muted)' }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-3">{right}</div>
    </div>
  )
}
