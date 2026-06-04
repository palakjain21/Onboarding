import React from 'react'
import { motion } from 'framer-motion'
import RoleCard from '../components/ui/RoleCard'
import Button from '../components/ui/Button'
import { OnboardingData, AccountRole } from '../types'

interface Props {
  data: OnboardingData
  error?: string
  isLoading: boolean
  onNext: () => void
  onBack: () => void
  update: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
}

const RoleStep: React.FC<Props> = ({ data, error, isLoading, onNext, onBack, update }) => {
  const select = (role: AccountRole) => update('role', role)

  return (
    <div className="flex flex-col flex-1 justify-between">

      <div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="font-rubik font-normal text-2xl text-[#132C4A] leading-snug mb-8"
        >
          To join us tell us{' '}
          <span className="font-bold">what type of account</span>{' '}
          you are opening
        </motion.p>

        <div className="flex flex-col gap-3">
          <RoleCard
            icon={
              <img
                src={data.role === 'personal' ? '/assets/person-blue.svg' : '/assets/person.svg'}
                alt=""
                width={24}
                height={24}
              />
            }
            label="Personal"
            selected={data.role === 'personal'}
            onClick={() => select('personal')}
          />
          <RoleCard
            icon={
              <img
                src={data.role === 'business' ? '/assets/briefcase-blue.svg' : '/assets/briefcase.svg'}
                alt=""
                width={24}
                height={24}
              />
            }
            label="Business"
            selected={data.role === 'business'}
            onClick={() => select('business')}
          />
        </div>

        {error && (
          <p className="text-xs font-rubik text-red-500 mt-3">{error}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={onBack} disabled className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} isLoading={isLoading} className="flex-1">
          Continue
        </Button>
      </div>

    </div>
  )
}

export default RoleStep
