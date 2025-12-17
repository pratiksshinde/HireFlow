"use client";

import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { register } from '../../../services/authService';
import { useRouter } from 'next/navigation';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Call registration service here
    const response = await register(username, email, password);
    if (response.success) {
      console.log('Registration successful:', response.message);
      router.push('/Login');
    } else {
      console.error('Registration failed:', response.message);
      // Optionally, show error message to user
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orb 1 - Top Left */}
        <div 
          className={`absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        {/* Gradient Orb 2 - Top Right */}
        <div 
          className={`absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-1000 delay-200 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        {/* Gradient Orb 3 - Bottom */}
        <div 
          className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />

        {/* Mesh Grid Overlay */}
        <div 
          className={`absolute inset-0 opacity-5 transition-opacity duration-1000 delay-500 ${
            isVisible ? 'opacity-5' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(var(--color-gray) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-gray) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Signup Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div 
          className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8"
        >
          <div className="relative">
            <div className={`text-center mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
            }`}>
              <h1 className="text-3xl cursor-default font-bold text-[var(--color-foreground)] mb-2">Create Account</h1>
              <p className="text-[var(--color-foreground)]/60 cursor-default text-sm">Sign up to get started</p>
            </div>

            <div className="space-y-5">
              <div className={`space-y-2 transition-all duration-700 delay-300 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}>
                <label className="text-sm font-medium text-[var(--color-foreground)] block">UserName</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Pratik_Shinde"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gray)]/50 focus:border-[var(--color-gray)]/50 transition-all"
                />
              </div>

              <div className={`space-y-2 transition-all duration-700 delay-400 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}>
                <label className="text-sm font-medium text-[var(--color-foreground)] block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. pratik@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gray)]/50 focus:border-[var(--color-gray)]/50 transition-all"
                />
              </div>

              <div className={`space-y-2 transition-all duration-700 delay-500 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}>
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

              <div className={`space-y-2 transition-all duration-700 delay-600 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}>
                <label className="text-sm font-medium text-[var(--color-foreground)] block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={confirmVisibility ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] 
                                text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40 focus:outline-none 
                                focus:ring-2 focus:ring-[var(--color-gray)]/50 focus:border-[var(--color-gray)]/50 transition-all"
                  />
                  {confirmVisibility ? (
                    <VisibilityOffIcon
                      onClick={() => setConfirmVisibility(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--color-foreground)]/70"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setConfirmVisibility(true)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--color-foreground)]/70"
                    />
                  )}
                </div>
              </div>

              <div className={`flex items-start text-sm transition-all duration-700 delay-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}>
                <label className="flex items-start text-[var(--color-foreground)]/70 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mr-2 mt-1 rounded border-[var(--color-border)]" 
                  />
                  <span>I agree to the <button className="text-[var(--color-gray)] hover:text-[var(--color-gray)]/80 transition-colors">Terms & Conditions</button></span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-3 cursor-pointer rounded-xl font-semibold text-white bg-[var(--color-gray)] hover:opacity-90 transition-all duration-600 delay-800 active:scale-[0.98] ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className={`mt-6 text-center transition-all duration-700 delay-900 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <p className="text-[var(--color-foreground)]/60 text-sm">
                Already have an account?{' '}
                <Link href="/Login" className="text-[var(--color-gray)] cursor-pointer font-semibold hover:text-[var(--color-gray)]/80 transition-colors">
                  Sign in
                </Link> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;