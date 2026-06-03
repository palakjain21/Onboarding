import React, { useRef, KeyboardEvent, ClipboardEvent } from 'react'

interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, value, onChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const focus = (index: number) => {
    inputsRef.current[index]?.focus()
    inputsRef.current[index]?.select()
  }

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[index] = digit
    onChange(next)
    if (digit && index < length - 1) focus(index + 1)
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const next = [...value]
        next[index] = ''
        onChange(next)
      } else if (index > 0) {
        focus(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focus(index - 1)
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focus(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = [...value]
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    onChange(next)
    const lastFilled = Math.min(pasted.length, length - 1)
    focus(lastFilled)
  }

  return (
    <div className="flex gap-4">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { inputsRef.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={e => e.target.select()}
          className={`
            w-14 h-14 text-center
            font-rubik font-normal text-base text-navy
            bg-white border rounded-xl
            outline-none transition-all duration-150
            ${value[i]
              ? 'border-blue-light ring-2 ring-blue/10'
              : 'border-border-default focus:border-blue-light focus:ring-2 focus:ring-blue/10'
            }
          `}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default OTPInput
