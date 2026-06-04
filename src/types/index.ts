export type OnboardingStep = 'role' | 'phone' | 'otp' | 'name' | 'password' | 'success'

export type AccountRole = 'personal' | 'business'

export interface Country {
  name: string
  cca2: string
  dialCode: string
  flagUrl: string
}

export interface OnboardingData {
  role: AccountRole | null
  phone: string
  country: Country | null
  otp: string[]
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

