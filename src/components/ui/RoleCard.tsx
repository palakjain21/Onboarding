import React from 'react'

interface RoleCardProps {
  icon: React.ReactNode
  label: string
  selected: boolean
  onClick: () => void
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`
        w-full flex items-center justify-between
        px-5 py-[22px] rounded-2xl bg-white border-2
        transition-all duration-150 text-left cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-blue/20 active:scale-[0.99]
        ${selected ? 'border-blue' : 'border-border-default hover:border-blue-light'}
      `}
    >
      <div className="flex items-center gap-4">
        <span className={`transition-colors ${selected ? 'text-blue' : 'text-text-muted'}`}>
          {icon}
        </span>
        <span className={`font-rubik font-medium text-base transition-colors ${selected ? 'text-blue' : 'text-navy'}`}>
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
    </button>
  )
}

export default RoleCard
