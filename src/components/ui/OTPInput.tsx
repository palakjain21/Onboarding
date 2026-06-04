import React, { useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { motion } from 'framer-motion'

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
        const next = [...value]; next[index] = ''; onChange(next)
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
    const next = Array(length).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    onChange(next)
    focus(Math.min(pasted.length, length - 1))
  }

  return (
    <div className="flex gap-[57px]">
      {Array.from({ length }).map((_, i) => (
        <motion.div
          key={i}
          animate={value[i] ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 0.18 }}
        >
          <input
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
              w-[70px] h-[70px] text-center
              font-rubik 
              ${value[i] ? 'font-normal': 'font-semibold'}
              ${value[i] ? 'text-2xl' : 'text-xl'}
              ${value[i] ? 'rgba(19, 44, 74, 1)' : 'text-[#D9E0E6]'}

              bg-white border rounded-xl
              outline-none transition-all duration-150
              ${value[i]
                ? 'border-[#0054FD] ring-2 ring-[#0054FD]/10'
                : 'border-[#729CF0] focus:border-[#0054FD] focus:ring-2 focus:ring-[#0054FD]/10'
              }
            `}
            aria-label={`OTP digit ${i + 1}`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default OTPInput
