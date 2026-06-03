import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
}

const maskPhone = (phone: string) => {
  if (phone.length < 4) return phone
  return phone.slice(0, 2) + '·'.repeat(phone.length - 4) + phone.slice(-2)
}

const SuccessModal: React.FC<Props> = ({ data }) => {
  const summary = [
    { label: 'Account Type', value: data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : '—' },
    { label: 'Name',         value: [data.firstName, data.lastName].filter(Boolean).join(' ') || '—' },
    { label: 'Mobile Number', value: maskPhone(data.phone) || '—' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(47,47,47,0.72)' }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.08, type: 'spring', damping: 22, stiffness: 260 }}
        className="w-full max-w-[460px] bg-white rounded-3xl px-8 py-10 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <img src="/assets/success-check.svg" alt="Success" width={56} height={56} />
          <h2 className="font-sans font-semibold text-2xl text-[#3E3D3F] mt-4 mb-1">
            You're all set!
          </h2>
          <p className="font-sans font-normal text-sm text-[#565656]">
            Here's a quick summary of your account details
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden mb-5" style={{ background: '#F5F5F5' }}>
          {summary.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex items-center justify-between px-5 py-3.5 font-sans text-sm ${
                i < summary.length - 1 ? 'border-b border-white/60' : ''
              }`}
            >
              <span className="text-[#565656]">{label}</span>
              <span className="font-semibold text-navy">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <img src="/assets/shield-check.svg" alt="" width={16} height={16} />
          <p className="font-sans text-xs text-[#565656]">
            Your account is secured with bank-grade security
          </p>
        </div>

        <Button
          className="w-full"
          onClick={() => window.location.reload()}
        >
          Go To Dashboard
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default SuccessModal
