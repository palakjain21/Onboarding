import React from 'react'
import { motion } from 'framer-motion'
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
    <div className="flex flex-col flex-1 justify-between">

      <div>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="font-rubik font-medium text-2xl text-[#132C4A] mb-8"
        >
          Enter your Mobile Number
        </motion.h2>

        <PhoneInput
          value={data.phone}
          onChange={val => update('phone', val)}
          country={data.country}
          onCountryChange={c => update('country', c)}
          error={error}
        />
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

export default PhoneStep
