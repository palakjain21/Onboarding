import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
}

// ** masking applied only to the fake email field
const maskEmail = (name: string) => {
  const base = (name || 'user').toLowerCase().replace(/\s+/g, '')
  const visible = base.slice(0, 2)
  const masked = '*'.repeat(Math.max(2, base.length - 2))
  return `${visible}${masked}@gmail.com`
}

const SuccessModal: React.FC<Props> = ({ data }) => {
  const summary = [
    {
      label: 'Account Type',
      value: data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : '—',
    },
    {
      label: 'Email',
      value: maskEmail(data.firstName),
    },
    {
      label: 'Name',
      value: [data.firstName, data.lastName].filter(Boolean).join(' ') || '—',
    },
    {
      label: 'Mobile Number',
      value: data.phone || '—',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(47,47,47,0.72)' }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.06, type: 'spring', damping: 22, stiffness: 260 }}
        className="w-full max-w-[479px] bg-white rounded-3xl px-8 py-10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.18, type: 'spring', damping: 16, stiffness: 300 }}
          >
            <img src="/assets/success-check.svg" alt="Success" width={46} height={46} />
          </motion.div>

          <h2
            className="mt-4 mb-1"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '100%',
              letterSpacing: 0,
              color: 'rgba(63,62,63,1)',
            }}
          >
            You're all set!
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: 0,
              color: 'rgba(86,86,86,1)',
              marginBottom: '4px',
            }}
          >
            Here's a quick summary of your account details
          </p>
        </div>

        {/* Summary rows */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ background: '#F5F5F5' }}>
          {summary.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + i * 0.06 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: i < summary.length - 1 ? '1px solid rgba(255,255,255,0.6)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'rgba(113,118,128,1)',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'rgba(24,29,39,1)',
                }}
              >
                {value}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/assets/shield-check.svg" alt="" width={16} height={16} />
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: 0,
              color: 'rgba(86,86,86,1)',
              marginBottom: '4px',
            }}
          >
            Your account is secured with bank-grade security
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button
            className="w-[250px]"
            onClick={() => window.location.reload()}
          >
            Go To Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SuccessModal
