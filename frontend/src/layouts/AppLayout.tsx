import React from 'react'

type AppLayoutProps = {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-full w-full bg-gradient-to-br from-blue-600 to-cyan-300  justify-center items-center">
      {children}
    </div>
  )
}

export default AppLayout
