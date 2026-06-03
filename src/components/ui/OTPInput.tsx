import React, { useRef } from 'react'

interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  return (
    <div>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { inputsRef.current[i] = el }}
          maxLength={1}
          value={value[i] ?? ''}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      ))}
    </div>
  )
}

export default OTPInput
