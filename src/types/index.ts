import React from 'react'

export type OnboardingStep = 'role' | 'phone' | 'otp' | 'name' | 'password' | 'success'

export type AccountRole = 'personal' | 'business'

export interface OnboardingData {
  role: AccountRole | null
  phone: string
  otp: string[]
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  children: React.ReactNode
}
