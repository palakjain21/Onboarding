import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Country } from '../../types'
import useCountries from '../../hooks/useCountries'

interface CountrySelectProps {
  value: Country | null
  onChange: (country: Country) => void
  hasError?: boolean
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, hasError }) => {
  const { countries, isLoading, defaultCountry } = useCountries()
  const [open, setOpen]               = useState(false)
  const [search, setSearch]           = useState('')
  const [highlightIdx, setHighlightIdx] = useState(0)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })

  const triggerRef   = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef  = useRef<HTMLDivElement>(null)
  const searchRef    = useRef<HTMLInputElement>(null)
  const listRef      = useRef<HTMLUListElement>(null)

  // Set default once countries are loaded
  useEffect(() => {
    if (!value && defaultCountry) onChange(defaultCountry)
  }, [defaultCountry, value, onChange])

  // Close on outside click — must check both trigger container and portal dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        !containerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => searchRef.current?.focus(), 50)
      setHighlightIdx(0)
      return () => clearTimeout(timer)
    }
  }, [open])

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[highlightIdx]) {
      e.preventDefault()
      select(filtered[highlightIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setSearch('')
    }
  }

  // Scroll highlighted item into view
  useEffect(() => {
    const el = listRef.current?.children[highlightIdx] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIdx])

  const select = (c: Country) => {
    onChange(c)
    setOpen(false)
    setSearch('')
  }

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 6, left: rect.left })
    }
    setOpen(v => !v)
  }

  const display = value ?? defaultCountry

  // Widen trigger by 60px when dial code has 3 digits (e.g. +971, +880, +966)
  const dialDigits = (display?.dialCode?.length ?? 3) - 1 // subtract the leading '+'
  const triggerWidth = dialDigits >= 3 ? 153 : 93

  // Dropdown rendered via portal to escape card's overflow-hidden
  const dropdownPortal = open ? ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: 256,
            zIndex: 9999,
            transformOrigin: 'top',
          }}
          className="bg-white rounded-xl shadow-xl border border-border-default overflow-hidden"
        >
          {/* Search */}
          <div className="px-3 pt-2.5 pb-2 border-b border-border-default">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country…"
              value={search}
              onChange={e => { setSearch(e.target.value); setHighlightIdx(0) }}
              onKeyDown={handleKeyDown}
              className="w-full text-sm font-rubik text-[#132C4A] placeholder:text-text-muted outline-none bg-transparent"
            />
          </div>

          {/* List */}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-48 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-sm text-text-muted font-rubik">No results</li>
            )}
            {filtered.map((c, i) => (
              <li
                key={c.cca2 + c.dialCode}
                role="option"
                aria-selected={value?.cca2 === c.cca2}
                onClick={() => select(c)}
                className={`
                  flex items-center gap-3 px-3 py-2 cursor-pointer text-sm font-rubik
                  transition-colors duration-100
                  ${i === highlightIdx ? 'bg-blue/8 text-blue' : 'text-[#132C4A] hover:bg-bg-page'}
                  ${value?.cca2 === c.cca2 ? 'font-medium' : 'font-normal'}
                `}
              >
                <img
                  src={c.flagUrl}
                  alt=""
                  width={20}
                  height={14}
                  className="rounded-[2px] object-cover flex-shrink-0"
                />
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-text-muted">{c.dialCode}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 bg-white rounded-xl select-none transition-all duration-150 focus:outline-none"
        style={{
          width: `${triggerWidth}px`,
          height: '76px',
          border: hasError
            ? '1px solid #f87171'
            : open
              ? '1px solid #0054FD'
              : '1px solid #729CF0',
          boxShadow: open ? '0 0 0 3px rgba(0,84,253,0.10)' : undefined,
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {isLoading ? (
          <span className="w-5 h-3 bg-border-default rounded animate-pulse" />
        ) : (
          display && (
            <img
              src={display.flagUrl}
              alt={display.name}
              width={20}
              height={14}
              className="rounded-[2px] object-cover flex-shrink-0"
            />
          )
        )}
        <span className="font-rubik text-sm font-medium text-[#132C4A]">
          {display?.dialCode ?? '—'}
        </span>
        <motion.img
          src="/assets/chevron-down.svg"
          alt=""
          width={12}
          height={12}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {dropdownPortal}
    </div>
  )
}

export default CountrySelect
