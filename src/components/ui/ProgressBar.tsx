import React from 'react'

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressWidth = Math.min(1, Math.max(0, progress)) * 100

  return (
    <div className="w-full h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(0,84,253,0.15)' }}>
      <div
        className="h-full rounded-full bg-blue transition-all duration-500 ease-out"
        style={{ width: `${progressWidth}%` }}
      />
    </div>
  )
}

export default ProgressBar
