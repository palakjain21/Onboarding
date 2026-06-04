import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import OTPInput from '../components/ui/OTPInput'
import Button from '../components/ui/Button'
import { OnboardingData } from '../types'
import useCountdown from '../hooks/useCountdown'

interface Props {
  data: OnboardingData
  error?: string
  isLoading: boolean
  onNext: () => void
  onBack: () => void
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
}

const OTPStep: React.FC<Props> = ({ data, error, isLoading, onNext, onBack, update }) => {
  const { seconds, isRunning, start } = useCountdown(30)

  useEffect(() => { start() }, [start])

  const handleResend = () => {
    if (isRunning) return
    update('otp', Array(4).fill(''))
    start()
  }

  return (
    <div className="flex flex-col flex-1 justify-between">

      <div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <h2 className="font-rubik font-medium text-2xl text-[#132C4A] mb-1">
            OTP Verification
          </h2>
          <p className="font-rubik font-normal mb-8" style={{ fontSize: '12px', color: 'rgba(130,146,161,1)' }}>
            An OTP has been sent to your mobile number
          </p>
        </motion.div>

        <OTPInput
          length={4}
          value={data.otp}
          onChange={val => update('otp', val)}
        />

        {error && (
          <p className="text-xs font-rubik text-red-500 mt-3">{error}</p>
        )}

        <div className="mt-5 flex items-center">
          <span className="font-rubik font-normal text-sm" style={{ color: 'rgba(19, 44, 74, 1)' }}>
            Did not receive OTP?{' '}
          </span>
          {isRunning ? (
            <span className="font-rubik font-normal text-sm ml-1" style={{ color: 'rgba(0,84,253,0.4)' }}>
              Resend OTP ({seconds}s)
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-rubik font-semibold text-sm ml-1 underline underline-offset-2 hover:opacity-75 transition-opacity focus:outline-none"
              style={{ color: 'rgba(0,84,253,1)' }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} isLoading={isLoading} className="flex-1">
          Continue
        </Button>
      </div>

    </div>
  )
}

export default OTPStep
