import React, { useEffect } from 'react'
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

  // Auto-start countdown when this step mounts
  useEffect(() => { start() }, [])

  const handleResend = () => {
    if (isRunning) return
    update('otp', Array(4).fill(''))
    start()
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-rubik font-medium text-2xl text-navy mb-2">
        OTP Verification
      </h2>
      <p className="font-rubik font-normal text-xs text-text-muted mb-8">
        An OTP has been sent to your mobile number
      </p>

      <OTPInput
        length={4}
        value={data.otp}
        onChange={val => update('otp', val)}
      />

      {error && (
        <p className="text-xs font-rubik text-red-500 mt-3">{error}</p>
      )}

      <div className="mt-4">
        {isRunning ? (
          <span className="font-rubik font-medium text-sm text-text-muted">
            Did not receive OTP?{' '}
            <span className="text-blue/40">Resend OTP ({seconds}s)</span>
          </span>
        ) : (
          <span className="font-rubik font-medium text-sm text-text-muted">
            Did not receive OTP?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue underline underline-offset-2 hover:opacity-75 transition-opacity focus:outline-none"
            >
              Resend OTP
            </button>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mt-12">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} isLoading={isLoading}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default OTPStep
