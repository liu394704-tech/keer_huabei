import { BarChart3, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBar from '@/components/StatusBar'
import PageHeader from '@/components/PageHeader'
import BudgetSlider from '@/components/BudgetSlider'
import GoalCard from '@/components/GoalCard'
import AIActionButton from '@/components/AIActionButton'
import LiveFeed from '@/components/LiveFeed'
import { useAppStore } from '@/store'

export default function StrategyNovice() {
  const budget = useAppStore((s) => s.budget)
  const setBudget = useAppStore((s) => s.setBudget)
  const goal = useAppStore((s) => s.goal)
  const setGoal = useAppStore((s) => s.setGoal)
  const aiRunning = useAppStore((s) => s.aiRunning)
  const setAiRunning = useAppStore((s) => s.setAiRunning)
  const navigate = useNavigate()

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ background: 'var(--bg-app)' }}
    >
      <div style={{ background: 'var(--bg-header)' }}>
        <StatusBar tone="light" />
        <PageHeader
          solid
          title="花呗·见微"
          subtitle="小白模式 · 智能全托管"
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

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6 pt-4">
        <div className="mb-3 text-[15px] font-semibold" style={{ color: 'var(--fg-primary)' }}>
          策略配置
        </div>

        <BudgetSlider value={budget} onChange={setBudget} />

        <div className="mt-5">
          <GoalCard value={goal} onChange={setGoal} />
        </div>

        <div className="mt-6">
          <AIActionButton
            running={aiRunning}
            onToggle={() => setAiRunning(!aiRunning)}
          />
          {aiRunning && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex justify-center"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-[6px]"
                style={{
                  background: 'rgba(46,107,255,0.08)',
                  color: 'var(--fg-brand)',
                }}
              >
                <span className="relative flex h-[6px] w-[6px]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-novice-500 opacity-75" />
                  <span className="relative h-[6px] w-[6px] rounded-full bg-novice-500" />
                </span>
                <span className="text-[12px] font-medium">AI 运行中</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-6">
          <LiveFeed />
        </div>

        <ReportEntry onClick={() => navigate('/report')} />
      </div>
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
        style={{ background: 'rgba(46,107,255,0.1)', color: 'var(--fg-brand)' }}
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
