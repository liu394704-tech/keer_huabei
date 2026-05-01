import { Route, Routes } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import Home from './pages/Home'
import StrategyNovice from './pages/StrategyNovice'
import StrategyExpert from './pages/StrategyExpert'
import Report from './pages/Report'

export default function App() {
  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center bg-ink-900 p-6 sm:p-10"
      style={{
        background:
          'radial-gradient(1200px 800px at 20% 10%, #1a2240 0%, #0b1120 40%, #05070e 100%)',
      }}
    >
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novice" element={<StrategyNovice />} />
          <Route path="/expert" element={<StrategyExpert />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </PhoneFrame>
    </div>
  )
}
