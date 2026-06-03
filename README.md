# Onboarding Flow — React + TypeScript

A pixel-perfect implementation of a 6-step account onboarding flow built from a Figma design.

## Live Demo

> Deploy URL will appear here after deployment.

## Tech Stack

- **React 18** + **TypeScript** — component logic and type safety
- **Vite** — fast dev server and build tooling
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **Framer Motion** — step transitions and success modal spring animation
- **React Router v6** — single catch-all route (`/*`) with all steps managed in state

## Features

- 6-step onboarding: Role → Phone → OTP → Name → Password → Success
- Shared `AuthLayout` keeps the left illustration panel mounted — zero re-renders between steps
- Direction-aware slide transitions (forward = slide left, back = slide right) via `AnimatePresence`
- Success modal overlays the password step with a spring-in animation and dimmed backdrop
- Per-step client-side validation without any form library
- `useCountdown` hook drives the 30-second OTP resend timer
- All icons are SVG files in `public/assets/` — no inline SVGs, no icon library
- Accessible role cards with `aria-pressed` and animated checkmark hidden from screen readers

## Project Structure

```
src/
├── components/
│   ├── AuthLayout.tsx        # Shared left-panel + right-card shell
│   └── ui/
│       ├── Button.tsx        # Primary / secondary variants, loading spinner
│       ├── Input.tsx         # Text input with label, hint, error states
│       ├── PasswordInput.tsx # Input + show/hide toggle
│       ├── PhoneInput.tsx    # Country code prefix + tel input
│       ├── OTPInput.tsx      # 4-box OTP with auto-advance, backspace nav, paste
│       ├── ProgressBar.tsx   # Animated fill bar (hidden on role step)
│       └── RoleCard.tsx      # Selectable card with animated check mark
├── steps/
│   ├── RoleStep.tsx          # Account type selection
│   ├── PhoneStep.tsx         # Mobile number entry
│   ├── OTPStep.tsx           # OTP verification + resend countdown
│   ├── NameStep.tsx          # First / last name
│   ├── PasswordStep.tsx      # Password + confirm with hint text
│   └── SuccessModal.tsx      # Fixed overlay with account summary
├── pages/
│   └── SignupPage.tsx        # Orchestrates steps, validation, transitions
├── hooks/
│   └── useCountdown.ts       # Generic countdown hook used by OTPStep
└── types/
    └── index.ts              # OnboardingStep, AccountRole, OnboardingData
```

## Design Decisions

**Single-route step machine** — all 6 steps live inside `SignupPage` state rather than separate routes. This avoids URL-based navigation concerns and keeps the shared left panel perfectly stable across transitions.

**No form library / no validation library** — validation is a plain `switch` in `SignupPage.validate()`, one case per step. For a flow this size the overhead of `react-hook-form` + `zod` is unnecessary.

**Two SVG files per icon** (e.g. `person.svg` / `person-blue.svg`) — because `<img>` tags can't inherit CSS `currentColor`, each icon ships a gray and a blue variant. The correct one is swapped in via a ternary on the `selected` prop.

**Success modal as overlay** — the Figma design shows the password step dimmed behind the success card. Achieved by keeping `step === 'success'` rendering `activeStep = 'password'` so PasswordStep stays mounted, while `SuccessModal` renders in a separate `AnimatePresence` as a `fixed` overlay.

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # production build → dist/
```
