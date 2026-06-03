import React, { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { OnboardingStep } from '../types'

const SignupPage: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AuthLayout>
      <div>
        {step === 'email' && <div></div>}
        {step === 'otp' && <div></div>}
        {step === 'profile' && <div></div>}
        {step === 'password' && <div></div>}
        {step === 'success' && <div></div>}
      </div>
    </AuthLayout>
  )
}

export default SignupPage
