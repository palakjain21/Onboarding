import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { OnboardingStep, OnboardingData, AccountRole } from '../types'

const PROGRESS: Record<OnboardingStep, number | undefined> = {
  role:     undefined,   // no bar on first screen
  phone:    0.20,
  otp:      0.40,
  name:     0.65,
  password: 1.0,
  success:  1.0,
}

const SignupPage: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>('role')

  const [data, setData] = useState<OnboardingData>({
    role: null,
    phone: '',
    otp: Array(4).fill(''),
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const goBack = () => {
    const order: OnboardingStep[] = ['role', 'phone', 'otp', 'name', 'password']
    const idx = order.indexOf(step)
    if (idx > 0) setStep(order[idx - 1])
  }

  return (
    <AuthLayout progress={PROGRESS[step]}>
      <div>
        {step === 'role' && (
          <div></div>
        )}
        {step === 'phone' && (
          <div></div>
        )}
        {step === 'otp' && (
          <div></div>
        )}
        {step === 'name' && (
          <div></div>
        )}
        {step === 'password' && (
          <div></div>
        )}
        {step === 'success' && (
          <div></div>
        )}
      </div>
    </AuthLayout>
  )
}

export default SignupPage
