import React from 'react'
import { motion } from 'framer-motion'
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
    <div className="flex flex-col flex-1 justify-between">

      <div>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="font-rubik font-medium text-2xl text-[#132C4A] mb-8"
        >
          What is your name?
        </motion.h2>

        <div className="flex flex-col gap-5">
          <Input
            label="First Name"
            placeholder="First Name"
            value={data.firstName}
            onChange={e => update('firstName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
            error={errors.firstName}
            autoComplete="off"
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={data.lastName}
            onChange={e => update('lastName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
            error={errors.lastName}
            autoComplete="off"
          />
        </div>
      </div>

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

export default NameStep
