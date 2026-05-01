import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import Home from './pages/Home'
import StrategyNovice from './pages/StrategyNovice'
import StrategyExpert from './pages/StrategyExpert'
import Report from './pages/Report'
import useNativeBridge from './hooks/useNativeBridge'

/**
 * 运行环境：
 *  - 真机原生（Capacitor 壳）：直接全屏
 *  - 移动浏览器：直接全屏
 *  - 桌面浏览器：外面套一个手机壳做预览
 */
function useIsFullscreen() {
  const [fullscreen, setFullscreen] = useState(() => computeFullscreen())
  useEffect(() => {
    const onResize = () => setFullscreen(computeFullscreen())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return fullscreen
}

function computeFullscreen() {
  if (typeof window === 'undefined') return false
  // Capacitor 原生注入
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor
  if (cap?.isNativePlatform?.()) return true
  // 移动端视口宽度判断
  return window.innerWidth <= 768
}

function AppRoutes() {
  useNativeBridge()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/novice" element={<StrategyNovice />} />
      <Route path="/expert" element={<StrategyExpert />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  )
}

export default function App() {
  const fullscreen = useIsFullscreen()

  if (fullscreen) {
    // 真机 / 移动端：直接全屏渲染，不套任何外壳
    return (
      <div className="h-dvh w-dvw" data-theme="novice" style={{ background: 'var(--bg-app)' }}>
        <AppRoutes />
      </div>
    )
  }

  // 桌面浏览器：套手机壳做开发预览
  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center p-6 sm:p-10"
      style={{
        background:
          'radial-gradient(1200px 800px at 20% 10%, #1a2240 0%, #0b1120 40%, #05070e 100%)',
      }}
    >
      <PhoneFrame>
        <AppRoutes />
      </PhoneFrame>
    </div>
  )
}
