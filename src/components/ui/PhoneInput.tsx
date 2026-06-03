import React from 'react'

interface PhoneInputProps {
  value: string
  onChange: (val: string) => void
  error?: string
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-rubik text-text-muted">
        Mobile Number<span className="text-red-400">*</span>
      </label>

      <div className="flex gap-3">
        <div
          className={`
            flex items-center gap-2 px-3 h-14 min-w-[90px]
            bg-white border rounded-xl select-none
            transition-all duration-150
            ${error ? 'border-red-400' : 'border-blue-light'}
          `}
        >
          <span className="text-base leading-none">🇺🇸</span>
          <span className="font-rubik text-base text-text-muted">+1</span>
          <img src="/assets/chevron-down.svg" alt="" width={12} height={12} />
        </div>

        <input
          type="tel"
          inputMode="numeric"
          placeholder="Enter mobile number"
          value={value}
          onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
          className={`
            flex-1 h-14 px-4
            font-rubik font-normal text-base text-navy
            bg-white border rounded-xl
            placeholder:text-text-muted
            outline-none transition-all duration-150
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-blue-light focus:border-blue focus:ring-2 focus:ring-blue/10'
            }
          `}
        />
      </div>

      {error && (
        <p className="text-xs font-rubik text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default PhoneInput
