/**
 * 生成用于 @capacitor/assets 的源图标与启动图。
 * - resources/icon.png (1024×1024)  —— 应用图标源图
 * - resources/splash.png (2732×2732) —— 启动图源图
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const ROOT = resolve(process.cwd(), 'resources')
await mkdir(ROOT, { recursive: true })

const ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2E6BFF"/>
      <stop offset="100%" stop-color="#1F56EB"/>
    </linearGradient>
    <linearGradient id="spark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE17A"/>
      <stop offset="100%" stop-color="#FFBE16"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="220" fill="url(#bg)"/>
  <!-- Trending line -->
  <path d="M220 720 L400 520 L540 620 L790 310"
        stroke="#FFFFFF" stroke-width="48"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- End arrow -->
  <path d="M720 310 L810 310 L810 400"
        stroke="#FFFFFF" stroke-width="48"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Spark dot -->
  <circle cx="810" cy="220" r="58" fill="url(#spark)"/>
  <circle cx="810" cy="220" r="24" fill="#FFFFFF"/>
</svg>`

const SPLASH_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">
  <defs>
    <radialGradient id="rbg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#3A7BFF"/>
      <stop offset="60%" stop-color="#2E6BFF"/>
      <stop offset="100%" stop-color="#1F56EB"/>
    </radialGradient>
    <linearGradient id="spark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE17A"/>
      <stop offset="100%" stop-color="#FFBE16"/>
    </linearGradient>
  </defs>
  <rect width="2732" height="2732" fill="url(#rbg)"/>
  <!-- Center icon (~560×560) -->
  <g transform="translate(1086, 1036) scale(0.547)">
    <rect width="1024" height="1024" rx="220" fill="#FFFFFF" opacity="0.12"/>
    <path d="M220 720 L400 520 L540 620 L790 310"
          stroke="#FFFFFF" stroke-width="48"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M720 310 L810 310 L810 400"
          stroke="#FFFFFF" stroke-width="48"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="810" cy="220" r="58" fill="url(#spark)"/>
    <circle cx="810" cy="220" r="24" fill="#FFFFFF"/>
  </g>
  <!-- App name -->
  <text x="1366" y="1780" text-anchor="middle"
        font-family="PingFang SC, Noto Sans SC, sans-serif"
        font-size="120" font-weight="700" fill="#FFFFFF"
        letter-spacing="6">花呗·见微</text>
  <text x="1366" y="1870" text-anchor="middle"
        font-family="PingFang SC, Noto Sans SC, sans-serif"
        font-size="46" font-weight="400" fill="#FFFFFF" opacity="0.82">
    智能商家增长助手
  </text>
</svg>`

async function renderPng(svg, filename, size) {
  const out = resolve(ROOT, filename)
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out)
  console.log('✔ wrote', out)
}

await renderPng(ICON_SVG, 'icon.png', 1024)
await renderPng(SPLASH_SVG, 'splash.png', 2732)
await renderPng(SPLASH_SVG, 'splash-dark.png', 2732)
console.log('\nSources generated in ./resources')
