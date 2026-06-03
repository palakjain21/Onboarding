import React from 'react'
import PhoneInput from '../components/ui/PhoneInput'
import Button from '../components/ui/Button'
import { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  error?: string
  isLoading: boolean
  onNext: () => void
  onBack: () => void
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
}

const PhoneStep: React.FC<Props> = ({ data, error, isLoading, onNext, onBack, update }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-rubik font-medium text-2xl text-navy mb-8">
        OTP Verification
      </h2>

      <PhoneInput
        value={data.phone}
        onChange={val => update('phone', val)}
        error={error}
      />

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

export default PhoneStep
