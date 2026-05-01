import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * 与原生壳（Capacitor）桥接：
 *  - 根据当前路由动态切换状态栏主题/背景色
 *  - 处理 Android 硬件返回键（可返回则返回，栈底则退出 App）
 *  - 仅在原生环境生效，Web 预览下不会报错
 */
export default function useNativeBridge() {
  const location = useLocation()
  const navigate = useNavigate()

  // 状态栏主题同步
  useEffect(() => {
    ;(async () => {
      const mod = await safeImport(() => import('@capacitor/status-bar'))
      if (!mod) return
      const { StatusBar, Style } = mod

      // 规则：
      //  - /          蓝色/金色头部，白色状态栏文字
      //  - /novice    蓝色头部，白色状态栏文字
      //  - /expert    蓝色头部，白色状态栏文字
      //  - /report    白色 / 深色头部，黑色状态栏文字
      const path = location.pathname
      try {
        if (path === '/report') {
          await StatusBar.setStyle({ style: Style.Dark })
          await StatusBar.setBackgroundColor({ color: '#FFFFFF' })
        } else {
          await StatusBar.setStyle({ style: Style.Light })
          await StatusBar.setBackgroundColor({ color: '#2E6BFF' })
        }
        await StatusBar.setOverlaysWebView({ overlay: false })
      } catch {
        /* 非原生环境会忽略 */
      }
    })()
  }, [location.pathname])

  // Android 硬件返回键
  useEffect(() => {
    let remove: (() => void) | undefined
    ;(async () => {
      const mod = await safeImport(() => import('@capacitor/app'))
      if (!mod?.App) return
      const handler = await mod.App.addListener('backButton', (ev) => {
        if (ev.canGoBack) {
          navigate(-1)
        } else {
          mod.App.exitApp()
        }
      })
      remove = () => handler.remove()
    })()
    return () => {
      if (remove) remove()
    }
  }, [navigate])
}

async function safeImport<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn()
  } catch {
    return undefined
  }
}
