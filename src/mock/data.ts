export interface FeedTemplate {
  type: 'optimize' | 'succeed' | 'save' | 'discover'
  text: string
}

export const feedTemplates: FeedTemplate[] = [
  { type: 'optimize', text: '实时优化中：识别到新用户群体，已调整策略' },
  { type: 'succeed', text: '识别到一名犹豫用户，已下发 3 期免息权益… 订单已达成！' },
  { type: 'save', text: '识别到一名全款意向用户，已自动隐藏免息标签，节省手续费 4.5 元' },
  { type: 'discover', text: '捕获 18–24 岁用户访问高峰，已联动优惠券发放' },
  { type: 'optimize', text: '根据近 1 小时转化率，已微调分期展示权重' },
  { type: 'succeed', text: '向高意向用户推送 6 期免息，订单金额 ¥1,289 已成交' },
  { type: 'save', text: '拦截 2 名高风险用户补贴发放，避免无效成本 ¥36' },
  { type: 'discover', text: '识别到 3C 配件加购机会，已自动上架优惠权益' },
  { type: 'succeed', text: '复购用户识别，已发放会员专属免息券，转化率 +22%' },
  { type: 'optimize', text: '周末流量高峰预测已生效，补贴策略自动倾斜' },
]

export function formatTime(ts: number) {
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// 经营战报 - GMV 对比
export const gmvSeven = [
  { day: '周一', base: 3800, ai: 4500 },
  { day: '周二', base: 4200, ai: 5100 },
  { day: '周三', base: 4000, ai: 4900 },
  { day: '周四', base: 4600, ai: 5500 },
  { day: '周五', base: 5100, ai: 6200 },
  { day: '周六', base: 5800, ai: 7300 },
  { day: '周日', base: 5600, ai: 6950 },
]

export const gmvThirty = Array.from({ length: 30 }, (_, i) => {
  const base = 3500 + Math.round(Math.sin(i / 2) * 900 + Math.random() * 400 + i * 15)
  const ai = Math.round(base * (1.16 + Math.random() * 0.1))
  return { day: `${i + 1}`, base, ai }
})

export const reportSeven = {
  netGain: 9350,
  withoutAI: 33100,
  withAI: 42450,
  metrics: {
    gmvDelta: { value: 12580, trend: 18.5 },
    roi: { value: '1:5.8', trend: 2.3 },
    costSave: { value: 845, trend: -12.3 },
    conversion: { value: 8.6, trend: 3.2 },
  },
  insights: [
    { icon: 'help', text: '周末 GMV 提升显著，建议在周末增加免息期数' },
    { icon: 'users', text: '25–35 岁用户转化率最高，建议重点运营该群体' },
    { icon: 'clock', text: '14:00–16:00 是用户下单高峰期，ROI 达 1:7.2' },
  ],
}

export const reportThirty = {
  netGain: 38920,
  withoutAI: 142800,
  withAI: 181720,
  metrics: {
    gmvDelta: { value: 52140, trend: 22.1 },
    roi: { value: '1:6.2', trend: 3.1 },
    costSave: { value: 4320, trend: -15.8 },
    conversion: { value: 9.2, trend: 4.6 },
  },
  insights: [
    { icon: 'help', text: '月末大促期间开启 12 期免息，GMV 环比提升 31%' },
    { icon: 'users', text: '新用户首购转化提升显著，建议加大新客专属权益投入' },
    { icon: 'clock', text: '晚间 20:00–22:00 为转化峰值，建议叠加定向补贴' },
  ],
}
