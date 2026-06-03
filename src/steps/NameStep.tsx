import React from 'react'
import Input from '../components/ui/Input'
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

const NameStep: React.FC<Props> = ({ data, errors, isLoading, onNext, onBack, update }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-rubik font-medium text-2xl text-navy mb-8">
        What is your name?
      </h2>

      <div className="flex flex-col gap-5">
        <Input
          label="First Name"
          placeholder="Oliver"
          value={data.firstName}
          onChange={e => update('firstName', e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          value={data.lastName}
          onChange={e => update('lastName', e.target.value)}
          error={errors.lastName}
        />
      </div>

      <div className="flex items-center justify-between gap-4 mt-12">
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

export default NameStep
