import React from 'react'
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
    <div className="flex flex-col">
      <p className="font-rubik font-normal text-2xl text-navy leading-snug mb-8">
        To join us tell us{' '}
        <span className="font-semibold">what type of account</span>{' '}
        you are opening
      </p>

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

      <div className="flex items-center justify-between gap-4 mt-12">
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
