import React from 'react'
import PasswordInput from '../components/ui/PasswordInput'
import Button from '../components/ui/Button'
import { OnboardingData } from '../types'

interface Props {
  data: OnboardingData
  errors: Partial<Record<keyof OnboardingData, string>>
  isLoading: boolean
  onNext: () => void
  onBack: () => void
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
}

const PasswordStep: React.FC<Props> = ({ data, errors, isLoading, onNext, onBack, update }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-rubik font-medium text-2xl text-navy mb-8">
        Create Password for your account
      </h2>

      <div className="flex flex-col gap-5">
        <PasswordInput
          label="Enter new password"
          placeholder="Enter new password"
          value={data.password}
          onChange={e => update('password', e.target.value)}
          hint="Must be atleast 6 characters"
          error={errors.password}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Confirm  password"
          value={data.confirmPassword}
          onChange={e => update('confirmPassword', e.target.value)}
          hint="Both passwords must match"
          error={errors.confirmPassword}
        />
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

export default PasswordStep
