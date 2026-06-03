import React from 'react'
import ProgressBar from './ui/ProgressBar'

interface AuthLayoutProps {
  children: React.ReactNode
  progress?: number
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, progress }) => {
  return (
    <div className="min-h-screen w-full flex bg-bg-page font-rubik">

      <div className="hidden lg:flex flex-col justify-between w-[45%] min-h-screen px-12 pt-14 pb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="font-rubik font-light text-2xl text-navy mb-2 tracking-wide">
            Let's get started
          </p>
          <h1 className="font-rubik font-bold text-5xl text-navy leading-tight">
            Create your<br />account
          </h1>
          <p className="font-rubik font-normal text-base text-navy/70 mt-4">
            Follow the steps to create your account
          </p>
        </div>

        <div className="relative z-10 mt-auto">
          <img
            src="/assets/illustration.svg"
            alt="Account setup illustration"
            className="w-full max-w-[420px] object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 lg:py-0">
        <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-sm overflow-hidden">
          {progress !== undefined && <ProgressBar progress={progress} />}
          <div className="px-10 py-10">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthLayout
