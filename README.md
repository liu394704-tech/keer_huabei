# 花呗·见微 · 智能商家增长助手

一个金融方向的移动端 Demo：面向商家，通过 AI 为「花呗分期 / 免息 / 优惠券」等权益补贴做实时智能调优。

UI 针对 **华为 Mate 60 Pro（6.82" FHD+ · 2720×1260 · DPR≈3）** 逻辑分辨率进行适配，桌面浏览器中以手机外壳形式预览。

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS 3（双主题 · CSS 变量）
- Framer Motion（主题扩散、商机卡左右滑、底部抽屉）
- Recharts（GMV 对比柱状图）
- Zustand（模式 / 预算 / 目标 / AI 状态 / 实时流）
- lucide-react（图标）

## 页面

| 路由 | 说明 |
|---|---|
| `/` | 首页 · 模式选择（小白 / 专家） + 登录入口 |
| `/novice` | 小白模式 · 策略配置（月预算、运营目标、一键开启 AI、实时动态） |
| `/expert` | 专家模式 · AI 商机组（接受 / 拒绝 / 修改，支持左右滑） |
| `/report` | 经营战报 · 指标 + GMV 柱状图 + 洞察 |

专家模式卡片「修改」操作弹出底部抽屉以输入自定义金额。

## 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:5173 。桌面下居中渲染手机外壳，移动端下铺满视口。

## 构建产物

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

## 交互亮点

1. 首页切换模式时以点击点为圆心扩散主题色（蓝 ↔ 金黑），整屏渐变过渡
2. 「一键开启 AI」按钮具脉冲波纹动画，强化"AI 正在工作"的感知
3. 实时干预动态每 4.5 秒 mock 推一条新记录，具 Framer Motion 进入/退出动画
4. 专家模式商机卡支持左右滑动接受 / 拒绝
5. 经营战报切换周期时，数字使用 CountUp 滚动、柱状图淡入淡出
6. 全局适配 `env(safe-area-inset-bottom)`，避免操作按钮被曲面屏/小黑条遮挡

## 目录

```
src/
├── components/      # PhoneFrame、BudgetSlider、OpportunityCard、LiveFeed 等
├── pages/           # Home、StrategyNovice、StrategyExpert、Report
├── mock/            # 假数据（商机、动态、战报）
├── store.ts         # Zustand 全局状态
├── main.tsx
├── App.tsx
└── index.css        # Tailwind + 双主题 CSS 变量
```
