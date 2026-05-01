import { BarChart3, ChevronRight, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StatusBar from '@/components/StatusBar'
import PageHeader from '@/components/PageHeader'
import OpportunityCard from '@/components/OpportunityCard'
import CustomAmountSheet from '@/components/CustomAmountSheet'
import LiveFeed from '@/components/LiveFeed'
import { useAppStore, type Opportunity, type OppStatus } from '@/store'

export default function StrategyExpert() {
  const navigate = useNavigate()
  const opportunities = useAppStore((s) => s.opportunities)
  const setOpportunityStatus = useAppStore((s) => s.setOpportunityStatus)
  const aiRunning = useAppStore((s) => s.aiRunning)
  const setAiRunning = useAppStore((s) => s.setAiRunning)
  const [editing, setEditing] = useState<Opportunity | null>(null)

  // 专家模式默认开启 AI
  useEffect(() => {
    if (!aiRunning) setAiRunning(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAction = (id: string, status: OppStatus) => {
    setOpportunityStatus(id, status)
  }
  const handleModify = (opp: Opportunity) => setEditing(opp)
  const handleConfirmCustom = (v: string) => {
    if (editing) {
      setOpportunityStatus(editing.id, 'modified', v)
      setEditing(null)
    }
  }

  return (
    <div
      className="relative flex h-full w-full flex-col"
      style={{ background: 'var(--bg-app)' }}
    >
      <div style={{ background: 'var(--bg-header)' }}>
        <StatusBar tone="light" />
        <PageHeader
          solid
          title="花呗·见微"
          subtitle="专家模式 · 灵感辅助驾驶"
          right={
            <button
              onClick={() => navigate('/report')}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-95"
              aria-label="经营战报"
            >
              <BarChart3 size={22} strokeWidth={2.2} />
            </button>
          }
        />
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="text-[15px] font-semibold"
            style={{ color: 'var(--fg-primary)' }}
          >
            策略配置
          </span>
          <span
            className="inline-flex items-center gap-1 text-[11px]"
            style={{ color: 'var(--fg-muted)' }}
          >
            <Lightbulb size={12} /> 左滑接受 · 右滑拒绝
          </span>
        </div>

        <section
          className="rounded-[22px] p-4"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-soft)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div
            className="mb-3 text-[14px] font-semibold"
            style={{ color: 'var(--fg-primary)' }}
          >
            AI 商机组
          </div>
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opp={opp}
                onAction={(st) => handleAction(opp.id, st)}
                onModify={() => handleModify(opp)}
              />
            ))}
          </div>
        </section>

        <div className="mt-5">
          <LiveFeed />
        </div>

        <ReportEntry onClick={() => navigate('/report')} />
      </div>

      <CustomAmountSheet
        open={!!editing}
        opp={editing}
        onClose={() => setEditing(null)}
        onConfirm={handleConfirmCustom}
      />
    </div>
  )
}

function ReportEntry({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 flex w-full items-center gap-3 rounded-[20px] p-4 text-left active:scale-[0.99]"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: 'rgba(46,107,255,0.1)',
          color: 'var(--fg-brand)',
        }}
      >
        <BarChart3 size={20} strokeWidth={2.2} />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className="text-[14px] font-semibold"
          style={{ color: 'var(--fg-primary)' }}
        >
          经营战报
        </div>
        <div
          className="mt-[2px] text-[12px]"
          style={{ color: 'var(--fg-muted)' }}
        >
          查看 AI 带来的增长价值
        </div>
      </div>
      <ChevronRight size={18} style={{ color: 'var(--fg-muted)' }} />
    </button>
  )
}
