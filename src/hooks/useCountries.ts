import { useState, useEffect } from 'react'
import { Country } from '../types'

// Expected digits per dial code — used for phone validation
const DIGIT_COUNTS: Record<string, number> = {
  '+1': 10,    // US / CA
  '+91': 10,   // IN
  '+44': 10,   // UK
  '+61': 9,    // AU
  '+49': 11,   // DE
  '+33': 9,    // FR
  '+81': 11,   // JP
  '+86': 11,   // CN
  '+55': 11,   // BR
  '+7': 10,    // RU
  '+971': 9,   // UAE
  '+65': 8,    // SG
  '+60': 10,   // MY
  '+64': 9,    // NZ
  '+27': 9,    // ZA
  '+92': 10,   // PK
  '+880': 10,  // BD
  '+94': 9,    // LK
  '+977': 10,  // NP
}

export const getExpectedDigits = (dialCode: string): number => {
  return DIGIT_COUNTS[dialCode] ?? 10
}

// Default country — India (+91) matching Figma sample number
const DEFAULT_CCA2 = 'IN'

let cachedCountries: Country[] | null = null

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>(cachedCountries ?? [])
  const [isLoading, setIsLoading] = useState(!cachedCountries)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cachedCountries) return

    setIsLoading(true)
    fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data: Array<{
        name: { common: string }
        cca2: string
        idd: { root: string; suffixes?: string[] }
        flags: { svg: string; png: string }
      }>) => {
        const parsed: Country[] = data
          .filter(c => c.idd?.root && c.idd.root !== '')
          .map(c => {
            const suffix =
              c.idd.suffixes?.length === 1 ? c.idd.suffixes[0] : ''
            const dialCode = c.idd.root + suffix
            return {
              name: c.name.common,
              cca2: c.cca2,
              dialCode,
              flagUrl: `https://flagcdn.com/w20/${c.cca2.toLowerCase()}.png`,
            }
          })
          .filter(c => c.dialCode && c.dialCode !== '+')
          .sort((a, b) => a.name.localeCompare(b.name))

        cachedCountries = parsed
        setCountries(parsed)
        setIsLoading(false)
      })
      .catch(() => {
        // Fallback minimal list so the UI never breaks
        const fallback: Country[] = [
          { name: 'India', cca2: 'IN', dialCode: '+91', flagUrl: 'https://flagcdn.com/w20/in.png' },
          { name: 'United States', cca2: 'US', dialCode: '+1', flagUrl: 'https://flagcdn.com/w20/us.png' },
          { name: 'United Kingdom', cca2: 'GB', dialCode: '+44', flagUrl: 'https://flagcdn.com/w20/gb.png' },
          { name: 'Australia', cca2: 'AU', dialCode: '+61', flagUrl: 'https://flagcdn.com/w20/au.png' },
          { name: 'Canada', cca2: 'CA', dialCode: '+1', flagUrl: 'https://flagcdn.com/w20/ca.png' },
        ]
        cachedCountries = fallback
        setCountries(fallback)
        setIsLoading(false)
        setError('Could not load countries')
      })
  }, [])

  const defaultCountry =
    countries.find(c => c.cca2 === DEFAULT_CCA2) ?? countries[0] ?? null

  return { countries, isLoading, error, defaultCountry }
}

export default useCountries
