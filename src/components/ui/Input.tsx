import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, hint, error, id, className = '', ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-rubik font-normal text-text-muted"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`
          w-full h-14 px-4
          font-rubik font-normal text-base text-navy
          bg-white
          border rounded-xl
          placeholder:text-text-placeholder
          transition-all duration-150
          outline-none
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-blue-light focus:border-blue focus:ring-2 focus:ring-blue/10'
          }
          ${className}
        `}
        {...props}
      />

      {hint && !error && (
        <p className="text-xs font-rubik text-text-muted mt-0.5">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-rubik text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default Input
