import React, { useState } from 'react'
import { InputProps } from '../../types'

const PasswordInput: React.FC<Omit<InputProps, 'type'>> = ({ label, error, ...props }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {label && <label>{label}</label>}
      <div>
        <input type={show ? 'text' : 'password'} {...props} />
        <button type="button" onClick={() => setShow(prev => !prev)}>
        </button>
      </div>
      {error && <span>{error}</span>}
    </div>
  )
}

export default PasswordInput
