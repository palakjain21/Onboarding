import React from 'react'
import { ButtonProps } from '../../types'

const Button: React.FC<ButtonProps> = ({ variant = 'primary', isLoading = false, children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  )
}

export default Button
