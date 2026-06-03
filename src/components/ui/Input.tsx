import React from 'react'
import { InputProps } from '../../types'

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span>{error}</span>}
    </div>
  )
}

export default Input
