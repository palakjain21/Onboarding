import React from 'react'
import { motion } from 'framer-motion'

interface RoleCardProps {
  icon: React.ReactNode
  label: string
  selected: boolean
  onClick: () => void
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, label, selected, onClick }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,84,253,0.10)' }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        w-full flex items-center justify-between
        px-5 py-[18px] rounded-2xl bg-white border-2
        transition-colors duration-150 text-left cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-[#0054FD]/20
        ${selected ? 'border-[#0054FD]' : 'border-[#D9E0E6] hover:border-[#729CF0]'}
      `}
    >
      <div className="flex items-center gap-4">
        <span className={`transition-colors ${selected ? 'text-[#0054FD]' : 'text-[#132C4A]'}`}>
          {icon}
        </span>
        <span className={`font-rubik font-medium text-base transition-colors ${selected ? 'text-[#0054FD]' : 'text-[#132C4A]'}`}>
          {label}
        </span>
      </div>

      {/* opacity + scale animate together so the checkmark "pops" in */}
      <span
        aria-hidden="true"
        className={`transition-all duration-200 ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <img src="/assets/check-circle.svg" alt="" width={22} height={22} />
      </span>
    </motion.button>
  )
}

export default RoleCard
