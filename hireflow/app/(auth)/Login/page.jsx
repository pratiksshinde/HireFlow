"use client";

import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from "next/link";
import { getProfile, login } from '../../../services/authService';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    const response = await login(email, password);
    if (response.success) {
      console.log('Login successful:', response);
      await delayUntilRuntimeStage(2000);
      if(response.user.data.isResume){
        router.push('/Portfolio/'+response.user.data.userName);
      } else {
        router.push('/upload');
      }
    } else {
      console.error('Login failed:', response.message);
      // Optionally, show error message to user
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orb 1 - Top Left */}
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        {/* Gradient Orb 2 - Top Right */}
        <div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        {/* Gradient Orb 3 - Bottom */}
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />

        {/* Mesh Grid Overlay */}
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

      {/* Login Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}>

        <div 
          className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8"
        >
          <div className="relative">
            <div className={`text-center mb-8 transition-all duration-700 delay-200
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
              `}>

              <h1 className="text-3xl cursor-default font-bold text-[var(--color-foreground)] mb-2">Welcome Back</h1>
              <p className="text-[var(--color-foreground)]/60 cursor-default text-sm">Enter your credentials to continue</p>
            </div>

            <div className="space-y-5">
              <div className={`space-y-2 transition-all duration-700 delay-300
                  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
                `}>

                <label className="text-sm font-medium text-[var(--color-foreground)] block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. pratik@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gray)]/50 focus:border-[var(--color-gray)]/50 transition-all"
                />
              </div>
              <div className={`space-y-2 transition-all duration-700 delay-400
                  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
                `}>
                <label className="text-sm font-medium text-[var(--color-foreground)] block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={visibility ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] 
                                text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:outline-none 
                                focus:ring-2 focus:ring-[var(--color-gray)]/50 focus:border-[var(--color-gray)]/50 transition-all"
                  />

                  {visibility ? (
                    <VisibilityOffIcon
                      onClick={() => setVisibility(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--color-foreground)]/70"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setVisibility(true)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--color-foreground)]/70"
                    />
                  )}
                </div>
                </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-[var(--color-foreground)]/70 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded border-[var(--color-border)]" />
                  Remember me
                </label>
                <button className="text-[var(--color-gray)] cursor-pointer  hover:text-[var(--color-gray)]/80 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button onClick={handleSubmit}
              className={`w-full py-3 rounded-xl transition-all bg-gray duration-600 delay-600
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}>
                Sign In
              </button>
            </div>

            <div className={`mt-6 text-center transition-all duration-700 delay-700
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}>
              <p className="text-[var(--color-foreground)]/60 text-sm">
                Don't have an account?{' '}
               <Link href="/register" 
                    className="text-[var(--color-gray)] font-semibold hover:text-[var(--color-gray)]/80 transition-colors cursor-pointer"
                  >
                    Sign up
                  </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;