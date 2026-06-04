import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-rubik font-medium text-base ' +
    'rounded-full px-10 py-3.5 transition-all duration-150 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 select-none ' +
    'active:scale-[0.97]'

  const variants = {
    primary:
      'bg-[#0054FD] text-white ' +
      'hover:bg-[#0054FD]/90 hover:shadow-md hover:-translate-y-px ' +
      'active:bg-[#0054FD]/95 active:shadow-sm active:translate-y-0 ' +
      'focus:ring-[#0054FD] ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0',
    secondary:
      'bg-white text-[#0054FD] border-2 border-[#D9E0E6] ' +
      'hover:border-[#0054FD] hover:bg-[#0054FD]/[0.04] ' +
      'active:bg-[#0054FD]/[0.08] active:border-[#0054FD] ' +
      'focus:ring-[#0054FD] ' +
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#D9E0E6]',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
