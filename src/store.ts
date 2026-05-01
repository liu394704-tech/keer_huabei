import { create } from 'zustand'

export type Mode = 'novice' | 'expert'
export type Goal = 'gmv' | 'margin'
export type OppStatus = 'pending' | 'accepted' | 'rejected' | 'modified'

export interface Opportunity {
  id: string
  grade: 'A' | 'B'
  title: string
  confidence: number
  insight: string
  suggestion: string
  roi: string
  status: OppStatus
  customValue?: string
}

export interface FeedItem {
  id: string
  type: 'optimize' | 'succeed' | 'save' | 'discover'
  text: string
  time: string
  createdAt: number
}

interface AppState {
  mode: Mode
  setMode: (m: Mode) => void

  // 小白模式
  budget: number
  setBudget: (n: number) => void
  goal: Goal
  setGoal: (g: Goal) => void

  // AI 运行状态
  aiRunning: boolean
  setAiRunning: (b: boolean) => void

  // 商机卡
  opportunities: Opportunity[]
  setOpportunityStatus: (id: string, status: OppStatus, customValue?: string) => void

  // 实时动态
  feed: FeedItem[]
  pushFeed: (item: Omit<FeedItem, 'id' | 'createdAt'>) => void
  clearFeed: () => void
}

const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    grade: 'A',
    title: '平板电脑需求激增',
    confidence: 92,
    insight: 'A 类用户对平板电脑需求环比上涨 85%',
    suggestion: '开启 6 期免息',
    roi: '1:8',
    status: 'pending',
  },
  {
    id: 'opp-2',
    grade: 'A',
    title: '3C 配件关联购买',
    confidence: 88,
    insight: '手机用户购买后，配件加购率仅 23%',
    suggestion: '推送配件优惠券',
    roi: '1:5',
    status: 'pending',
  },
  {
    id: 'opp-3',
    grade: 'B',
    title: '犹豫用户挽回',
    confidence: 78,
    insight: '每小时约有 15 名用户浏览超过 3 次但未下单',
    suggestion: '发放限时折扣券',
    roi: '1:3',
    status: 'pending',
  },
]

export const useAppStore = create<AppState>((set) => ({
  mode: 'novice',
  setMode: (m) => set({ mode: m }),

  budget: 5000,
  setBudget: (n) => set({ budget: n }),
  goal: 'gmv',
  setGoal: (g) => set({ goal: g }),

  aiRunning: false,
  setAiRunning: (b) => set({ aiRunning: b }),

  opportunities: initialOpportunities,
  setOpportunityStatus: (id, status, customValue) =>
    set((state) => ({
      opportunities: state.opportunities.map((o) =>
        o.id === id ? { ...o, status, customValue: customValue ?? o.customValue } : o,
      ),
    })),

  feed: [],
  pushFeed: (item) =>
    set((state) => ({
      feed: [
        {
          ...item,
          id: `feed-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        },
        ...state.feed,
      ].slice(0, 12),
    })),
  clearFeed: () => set({ feed: [] }),
}))
