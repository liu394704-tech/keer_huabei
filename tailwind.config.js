/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 小白模式（蓝）
        novice: {
          50: '#EEF3FF',
          100: '#DCE7FF',
          200: '#B8D0FF',
          300: '#8DB2FF',
          400: '#5A8CFF',
          500: '#2E6BFF',
          600: '#1F56EB',
          700: '#1744C2',
          800: '#143A9E',
          900: '#0E2A7A',
        },
        // 专家模式（金）
        expert: {
          50: '#FFF9E6',
          100: '#FFF0B8',
          200: '#FFE17A',
          300: '#FFCE3D',
          400: '#FFBE16',
          500: '#E5A508',
          600: '#B37F00',
          700: '#7A5600',
          800: '#3E2C00',
          900: '#1A1407',
        },
        ink: {
          50: '#F7F9FC',
          100: '#EEF2F7',
          200: '#DDE3EC',
          300: '#B6BFCC',
          400: '#7A8494',
          500: '#515B6B',
          600: '#303948',
          700: '#1A2130',
          800: '#0E1421',
          900: '#060912',
        },
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"HarmonyOS Sans"',
          '"Noto Sans SC"',
          '"Helvetica Neue"',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 12px rgba(25, 50, 100, 0.06)',
        'card-lg': '0 10px 40px rgba(25, 50, 100, 0.1)',
        phone:
          '0 40px 80px -20px rgba(0,0,0,0.55), 0 20px 40px -20px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.06) inset',
      },
      animation: {
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
        'sheet-in': 'sheetIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        'theme-ripple': 'themeRipple 0.8s ease-out forwards',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.7)', opacity: '0.8' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(0.85)', opacity: '0.85' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        sheetIn: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        themeRipple: {
          from: { transform: 'scale(0)', opacity: '0.6' },
          to: { transform: 'scale(3)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
