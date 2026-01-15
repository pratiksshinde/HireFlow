import React from 'react'
import Navbar from '../../components/common/navbar'

function Applications() {
  return (
     <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />

        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-gray) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-gray) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
         <Navbar  userId="5"/>
         </div>
      </div>
  )
}

export default Applications