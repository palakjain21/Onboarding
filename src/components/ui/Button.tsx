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
    'inline-flex items-center justify-center font-rubik font-medium text-base rounded-full px-10 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none'

  const variants = {
    primary:
      'bg-blue text-white focus:ring-blue hover:bg-blue/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed',
    secondary:
      'bg-white text-navy border border-border-default focus:ring-blue hover:border-blue-light hover:text-blue active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed',
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
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
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
