import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number  // 0–1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const pct = Math.min(1, Math.max(0, progress)) * 100

  return (
    <div className="w-full px-[45px] py-4">
      <div
        style={{
          height: '6px',
          borderRadius: '999px',
          overflow: 'hidden',
          background: 'rgba(0,84,253,0.10)',
          outline: '1px solid rgba(0,84,253,0.18)',
          outlineOffset: '-1px',
        }}
      >
        <motion.div
          style={{ background: '#0054FD', height: '100%' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
