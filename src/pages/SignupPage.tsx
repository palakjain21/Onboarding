import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuthLayout from '../components/AuthLayout'
import RoleStep from '../steps/RoleStep'
import PhoneStep from '../steps/PhoneStep'
import OTPStep from '../steps/OTPStep'
import NameStep from '../steps/NameStep'
import PasswordStep from '../steps/PasswordStep'
import SuccessModal from '../steps/SuccessModal'
import { OnboardingStep, OnboardingData } from '../types'
import { getExpectedDigits } from '../hooks/useCountries'

const STEPS: OnboardingStep[] = ['role', 'phone', 'otp', 'name', 'password', 'success']

const PROGRESS: Record<OnboardingStep, number | undefined> = {
  role:     undefined,
  phone:    0.25,
  otp:      0.50,
  name:     0.75,
  password: 1.0,
  success:  1.0,
}

const variants = {
  enter:  (dir: number) => ({ x: dir * 36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir * -36, opacity: 0 }),
}

const SignupPage: React.FC = () => {
  const [step, setStep]         = useState<OnboardingStep>('role')
  const [direction, setDir]     = useState(1)
  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState<OnboardingData>({
    role:            'personal',
    phone:           '',
    country:         null,
    otp:             Array(4).fill(''),
    firstName:       '',
    lastName:        '',
    password:        '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({})

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    switch (step) {
      case 'role':
        if (!data.role) { setErrors({ role: 'Please select an account type' }); return false }
        return true

      case 'phone': {
        const expectedDigits = getExpectedDigits(data.country?.dialCode ?? '+91')
        if (data.phone.length !== expectedDigits) {
          const countryName = data.country?.name ?? 'your country'
          setErrors({ phone: `Please enter a valid ${expectedDigits}-digit number for ${countryName}` })
          return false
        }
        return true
      }

      case 'otp':
        if (data.otp.some(d => !d)) { setErrors({ otp: 'Please enter the complete OTP' }); return false }
        return true

      case 'name': {
        const errs: typeof errors = {}
        const alphaOnly = /^[a-zA-Z\s]+$/
        if (!data.firstName.trim()) errs.firstName = 'First name is required'
        else if (!alphaOnly.test(data.firstName.trim())) errs.firstName = 'Only alphabets are allowed'
        if (data.lastName.trim() && !alphaOnly.test(data.lastName.trim())) errs.lastName = 'Only alphabets are allowed'
        if (Object.keys(errs).length) { setErrors(errs); return false }
        return true
      }

      case 'password': {
        const errs: typeof errors = {}
        if (data.password.length < 6) errs.password = 'Must be at least 6 characters'
        if (!data.confirmPassword || data.password !== data.confirmPassword) {
          errs.confirmPassword = data.confirmPassword ? 'Passwords do not match' : 'Please confirm your password'
        }
        if (Object.keys(errs).length) { setErrors(errs); return false }
        return true
      }

      default:
        return true
    }
  }

  const goNext = () => {
    if (!validate()) return
    setLoading(true)
    // Simulate async (OTP send, verification, etc.)
    setTimeout(() => {
      setLoading(false)
      const idx = STEPS.indexOf(step)
      if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
    }, 700)
  }

  const goBack = () => {
    setErrors({})
    setDir(-1)
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1])
  }

  const stepProps = { data, errors, isLoading, onNext: goNext, onBack: goBack, update }

  // Success modal overlays the password step — keep 'password' mounted underneath
  const activeStep = step === 'success' ? 'password' : step

  return (
    <AuthLayout progress={PROGRESS[step]}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col flex-1"
        >
          {activeStep === 'role'     && <RoleStep     {...stepProps} error={errors.role} />}
          {activeStep === 'phone'    && <PhoneStep    {...stepProps} error={errors.phone} />}
          {activeStep === 'otp'      && <OTPStep      {...stepProps} error={errors.otp} />}
          {activeStep === 'name'     && <NameStep     {...stepProps} />}
          {activeStep === 'password' && <PasswordStep {...stepProps} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {step === 'success' && <SuccessModal data={data} />}
      </AnimatePresence>
    </AuthLayout>
  )
}

export default SignupPage
