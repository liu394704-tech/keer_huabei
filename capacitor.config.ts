import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.huabei.jianwei',
  appName: '花呗·见微',
  webDir: 'dist',
  android: {
    // 允许 HTTP（本地调试）
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      backgroundColor: '#2E6BFF',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      // 状态栏默认：首页是蓝色头部，白色文字
      style: 'LIGHT',
      backgroundColor: '#2E6BFF',
    },
  },
}

export default config
