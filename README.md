# 花呗·见微 · 智能商家增长助手

一个面向商家的金融增长助手 **原生 Android 应用**，使用 React + Capacitor 打包，安装后可在华为 Mate 60 Pro / 任何 Android 7+ 设备上**全屏原生体验**运行。

UI 针对 **华为 Mate 60 Pro（6.82" FHD+ · 2720×1260）** 设计，亦兼容其他 Android 屏幕尺寸。

---

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS 3（双主题 · CSS 变量）
- Framer Motion / Recharts / Zustand / lucide-react
- **Capacitor 8** （Web → 原生 Android 壳）
  - `@capacitor/app`：硬件返回键、生命周期
  - `@capacitor/status-bar`：原生状态栏主题
  - `@capacitor/splash-screen`：启动页

## 应用功能

| 路由 | 说明 |
|---|---|
| `/` | 首页 · 模式选择（小白 / 专家） + 登录入口 |
| `/novice` | 小白模式 · 策略配置（月预算、运营目标、一键开启 AI、实时干预动态） |
| `/expert` | 专家模式 · AI 商机组（接受 / 拒绝 / 修改，支持左右滑） |
| `/report` | 经营战报 · 指标 + GMV 柱状图 + 洞察 |

---

## 一、本地 Web 开发预览

```bash
npm install
npm run dev      # http://localhost:5173
```

桌面浏览器下渲染带手机外壳的预览；移动浏览器或原生壳中自动全屏。

---

## 二、打包真实 Android APK，安装到华为真机

### 路径 A：本地构建（一次性安装环境，之后秒级出包）

#### 1. 安装环境（一次性，约 10 分钟）

下载安装 [Android Studio](https://developer.android.com/studio)（自带 JDK + Android SDK）。

启动后让它自动下载默认 SDK，结束后在 `~/.zshrc` 添加：

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
export JAVA_HOME=$(/usr/libexec/java_home)
```

`source ~/.zshrc` 让其生效。

#### 2. 构建 APK

```bash
npm run android:apk
# 等价于：
#   npm run build && npx cap sync android && cd android && ./gradlew assembleDebug
```

产物路径：

```
android/app/build/outputs/apk/debug/app-debug.apk
```

直接传到手机安装即可。

#### 3. 用 Android Studio 图形化构建 / 真机调试（可选）

```bash
npm run cap:open
```

会打开 Android Studio，点 ▶ 即可在 USB 连接的真机上运行；或菜单 `Build → Build APK(s)` 出包。

---

### 路径 B：GitHub Actions 云端构建（无需本地装任何东西）

仓库已经准备好 `.github/workflows/android-apk.yml`：

1. 把项目推到 GitHub 公开 / 私有仓库
2. GitHub 网页 → Actions 页 → 选 `Build Android APK` → `Run workflow`
3. 完成后在该次运行的 `Artifacts` 区下载 `huabei-jianwei-debug-apk.zip`，解压得 `app-debug.apk`

---

### 路径 C：直接交给我（在对话里告诉我即可）

如果你不想装 Android Studio 也不想搭 GitHub，告诉我，我可以指导你用 [Codemagic](https://codemagic.io) 或类似平台（免费额度够个人开发用）一次性出 APK。

---

## 三、把 APK 装到华为 Mate 60 Pro

### 方法 1：手机直接传输

1. 把 `app-debug.apk` 通过 微信文件传输助手 / AirDrop / U 盘 / 数据线 传到手机
2. 手机文件管理打开该 APK
3. 系统提示「**当前设置不允许安装来自此来源的应用**」，点 **设置** → 允许此应用安装外部应用 → 返回再装
4. 装完桌面就有图标，点开即用

### 方法 2：USB 调试（推荐，开发期更快）

1. 手机：设置 → 系统 → 关于手机 → 连续点 **版本号** 7 次开启开发者选项
2. 设置 → 系统 → 开发者选项 → 打开 **USB 调试**
3. 数据线连 Mac，手机弹「允许此电脑调试」点确认
4. 终端执行：

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

> 也可以执行 `npm run cap:run` 直接编译并部署到当前连接的设备。

### Mate 60 Pro 兼容说明

- Mate 60 Pro 出厂为 HarmonyOS 4.x，**完全兼容** 标准 Android APK，安装方式同上
- 若已升级到「HarmonyOS NEXT」（纯鸿蒙系统）则不再支持 Android APK，需要鸿蒙原生开发，请在升级前进行测试

---

## 四、目录结构

```
keer_huabei/
├── android/                 # Capacitor 生成的原生 Android 工程
├── resources/
│   ├── icon.png             # 应用图标源图（1024×1024）
│   ├── splash.png           # 启动图源图（2732×2732）
│   └── splash-dark.png
├── scripts/
│   └── generate-source-assets.mjs  # 重新生成图标 / splash 源图
├── src/
│   ├── components/      # PhoneFrame、BudgetSlider、OpportunityCard …
│   ├── hooks/
│   │   └── useNativeBridge.ts  # 状态栏主题 + 硬件返回键
│   ├── pages/           # Home、StrategyNovice、StrategyExpert、Report
│   ├── mock/            # 假数据
│   ├── store.ts         # Zustand 全局状态
│   ├── main.tsx
│   ├── App.tsx          # 路由 + 桌面/移动渲染分流
│   └── index.css
├── capacitor.config.ts  # Capacitor 主配置（应用名/包名/插件）
├── vite.config.ts
└── tailwind.config.js
```

---

## 五、修改图标 / 启动图

替换 `resources/icon.png`（1024×1024）和 `resources/splash.png`（2732×2732）后执行：

```bash
npm run cap:assets
npm run cap:sync
```

即可重新生成所有尺寸并同步到 Android。
