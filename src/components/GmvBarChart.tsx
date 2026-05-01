import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface Datum {
  day: string
  base: number
  ai: number
}

interface Props {
  data: Datum[]
  compact?: boolean
}

export default function GmvBarChart({ data, compact = false }: Props) {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
          barGap={compact ? 1 : 4}
          barCategoryGap={compact ? 2 : '28%'}
        >
          <defs>
            <linearGradient id="baseBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C7D0DC" />
              <stop offset="100%" stopColor="#E3E8F0" />
            </linearGradient>
            <linearGradient id="aiBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E6BFF" />
              <stop offset="100%" stopColor="#5A8CFF" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.2)" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            interval={compact ? 4 : 0}
            tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
            tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(46,107,255,0.06)' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #e5e9f0',
              fontSize: 12,
            }}
            formatter={(value: number, key) => [
              `¥${value.toLocaleString()}`,
              key === 'base' ? '未开启 AI' : '开启 AI',
            ]}
            labelStyle={{ color: '#0E1421', fontWeight: 600 }}
          />
          <Bar
            dataKey="base"
            fill="url(#baseBar)"
            radius={[compact ? 2 : 6, compact ? 2 : 6, 0, 0]}
          />
          <Bar
            dataKey="ai"
            fill="url(#aiBar)"
            radius={[compact ? 2 : 6, compact ? 2 : 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
