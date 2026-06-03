import React from 'react'
import ProgressBar from './ui/ProgressBar'

interface AuthLayoutProps {
  children: React.ReactNode
  progress?: number
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, progress }) => {
  return (
    <div className="min-h-screen w-full flex bg-bg-page font-rubik">

      {/* Left panel — 50% width matching Figma's ~732/1440 split */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 min-h-screen px-14 pt-14 pb-10 relative overflow-hidden">
        <div>
          <p className="font-rubik font-light text-2xl text-navy mb-2">
            Let's get started
          </p>
          <h1 className="font-rubik font-bold text-[48px] text-navy leading-tight">
            Create your<br />account
          </h1>
          <p className="font-rubik font-normal text-base text-navy/70 mt-4">
            Follow the steps to create your account
          </p>
        </div>

        <div className="mt-auto">
          <img
            src="/assets/illustration.svg"
            alt="Account setup illustration"
            className="w-full max-w-[460px] object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Right panel — card matches Figma's 708px card width */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 lg:py-8">
        <div className="w-full max-w-[660px] bg-white rounded-2xl shadow-sm overflow-hidden">
          {progress !== undefined && <ProgressBar progress={progress} />}
          <div className="px-12 py-10">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthLayout
