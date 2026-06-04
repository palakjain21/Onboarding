import React from 'react'
import ProgressBar from './ui/ProgressBar'

interface AuthLayoutProps {
  children: React.ReactNode
  progress?: number   // 0–1
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, progress }) => {
  return (
    <div className="h-screen w-full flex bg-[#F6F7F9] font-rubik overflow-hidden">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 h-full px-14 pt-14 pb-10 relative overflow-hidden">
        <div>
          <p className="font-light text-2xl text-[#132C4A] mb-2">
            Let's get started
          </p>
          <h1 className="font-bold text-[48px] text-[#132C4A] leading-tight whitespace-nowrap">
            Create your account
          </h1>
          <p className="font-normal text-base text-[#132C4A]/70 mt-4">
            Follow the steps to create your account
          </p>
        </div>
        <div>
          <img
            src="/assets/illustration.svg"
            alt="Account setup illustration"
            className="w-full object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <div
          className="w-full max-w-[708px] flex flex-col"
          style={{ height: 'min(895px, calc(100vh - 64px))' }}
        >
          {progress !== undefined && (
            <div className="flex-shrink-0">
              <ProgressBar progress={progress} />
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm flex flex-col flex-1 min-h-0">
            <div className="p-[45px] flex flex-col flex-1 min-h-0">
              {children}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthLayout
