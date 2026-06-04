import React from 'react'
import CountrySelect from './CountrySelect'
import { Country } from '../../types'
import { getExpectedDigits } from '../../hooks/useCountries'

interface PhoneInputProps {
  value: string
  onChange: (val: string) => void
  country: Country | null
  onCountryChange: (country: Country) => void
  error?: string
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  country,
  onCountryChange,
  error,
}) => {
  const maxLength = getExpectedDigits(country?.dialCode ?? '+91')

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-rubik font-normal" style={{ color: '#8292A1' }}>
        Mobile Number<span style={{ color: '#FF7C52' }}>*</span>
      </label>

      <div className="flex gap-3">
        <CountrySelect
          value={country}
          onChange={onCountryChange}
          hasError={!!error}
        />

        <input
          type="tel"
          inputMode="numeric"
          placeholder="Enter mobile number"
          value={value}
          onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, maxLength))}
          maxLength={maxLength}
          className="flex-1 px-4 font-rubik font-normal text-base rounded-xl outline-none transition-all duration-150"
          style={{
            height: '76px',
            color: value ? '#132C4A' : '#8292A1',
            border: error
              ? '1px solid #f87171'
              : '1px solid #729CF0',
          }}
          onFocus={e => {
            if (!error) e.currentTarget.style.borderColor = '#0054FD'
          }}
          onBlur={e => {
            if (!error) e.currentTarget.style.borderColor = '#729CF0'
          }}
        />
      </div>

      {error && (
        <p className="text-xs font-rubik text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default PhoneInput
