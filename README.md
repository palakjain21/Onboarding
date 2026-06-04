# Onboarding Flow

A 6-step account onboarding flow built with React and TypeScript.

### Live Demo

**https://onboarding-flow-lake.vercel.app**

---

## Tech Stack

* React 18 + TypeScript
* Vite
* Tailwind CSS v3
* Framer Motion
* React Router v6

---

## Overview

This project uses a single-page onboarding flow where all steps are managed through component state instead of route changes.

The experience includes:

* Account type selection
* Phone number entry
* OTP verification
* Name collection
* Password creation
* Success confirmation modal

---

## Architecture

### Single Route Flow

All onboarding steps are controlled inside `SignupPage` using local state. Navigation is handled by updating the active step rather than changing URLs.

### Shared State

A single `OnboardingData` object stores all form data throughout the flow. Each step receives only the fields and update handlers it needs.

### Error Handling

Validation errors are stored in a parallel error object and cleared individually when a user updates a field.

### Layout Structure

The onboarding card uses a consistent flex layout across all steps:

* Form content stays aligned to the top
* Action buttons stay pinned to the bottom
* No `margin-top: auto` workarounds

### Progress Bar

The progress indicator sits above the card, matching the Figma design. It's hidden on the account type selection step.

### Success Modal

The success screen appears as a fixed overlay while keeping the password step mounted underneath, allowing smooth modal animations without affecting the page layout.

---

## Project Structure

```text
src/
├── components/
│   ├── AuthLayout.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── PasswordInput.tsx
│       ├── PhoneInput.tsx
│       ├── CountrySelect.tsx
│       ├── OTPInput.tsx
│       ├── ProgressBar.tsx
│       └── RoleCard.tsx
├── steps/
│   ├── RoleStep.tsx
│   ├── PhoneStep.tsx
│   ├── OTPStep.tsx
│   ├── NameStep.tsx
│   ├── PasswordStep.tsx
│   └── SuccessModal.tsx
├── pages/
│   └── SignupPage.tsx
├── hooks/
│   ├── useCountdown.ts
│   └── useCountries.ts
└── types/
    └── index.ts
```

---

## Animations

Framer Motion powers the onboarding experience:

* Smooth step transitions
* Animated progress bar updates
* Success modal entrance animations
* Staggered content reveals

### Step Transitions

Each step is wrapped in `AnimatePresence` and `motion.div`.

Features:

* Forward navigation slides left
* Back navigation slides right
* Exit animation completes before the next step enters
* Smooth 220ms transitions

### Progress Bar

The fill width animates automatically whenever progress changes.

### Success Modal

The modal uses spring animations for:

* Backdrop fade-in
* Modal entrance
* Checkmark pop-in effect
* Staggered summary rows

---

## Notable Features

* Direction-aware step transitions
* OTP auto-advance
* OTP backspace navigation
* OTP paste support
* 30-second resend countdown
* Per-country phone validation
* Loading states on submission
* Email masking in the success modal
* Searchable country selector
* Portal-based dropdown rendering

---

## Design Decisions

### No Form Library

Validation is handled with simple step-based logic inside `SignupPage`. For a small onboarding flow, introducing a form library would add unnecessary complexity.

### Portal-Based Country Dropdown

The country selector renders through a React Portal to avoid clipping issues caused by the card's rounded corners and overflow settings.

### Stable Layout

The left illustration panel remains mounted throughout the flow, preventing flickers and unnecessary re-renders during navigation.

### Custom Brand Colors

Brand colors are applied using explicit hex values to ensure consistency across components and avoid Tailwind configuration edge cases.

---

## Getting Started

```bash
npm install

npm run dev
# http://localhost:5174

npm run build
# production build -> dist/
```
