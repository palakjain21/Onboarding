import React, { useState } from 'react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}) => {
  const [show, setShow] = useState(false)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="font-rubik font-normal"
          style={{ fontSize: '18px', color: 'rgba(130,146,161,1)' }}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={inputId}
          type={show ? 'text' : 'password'}
          className={`
            w-full h-14 pl-4 pr-12
            font-rubik font-normal text-base text-[#132C4A]
            bg-white border rounded-xl
            placeholder:text-[#D9E0E6] placeholder:font-normal
            transition-all duration-150 outline-none
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-blue-light focus:border-blue focus:ring-2 focus:ring-blue/10'
            }
            ${className}
          `}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70 focus:outline-none"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <img
            src={show ? '/assets/eye-off.svg' : '/assets/eye.svg'}
            alt={show ? 'Hide' : 'Show'}
            width={20}
            height={20}
          />
        </button>
      </div>

      {hint && !error && (
        <p className="font-rubik mt-0.5" style={{ fontSize: '16px', color: 'rgba(130, 146, 161, 1)', fontWeight: 400 }}>{hint}</p>
      )}
      {error && (
        <p className="text-xs font-rubik text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default PasswordInput
