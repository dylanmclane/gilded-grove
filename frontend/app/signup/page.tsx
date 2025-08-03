'use client';

import { useState } from "react";

// CrestIcon with subtle gold sparkle
const CrestIcon = () => (
  <div className="relative mb-8">
    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke="#d4af37" strokeWidth="2.5" fill="rgba(36,37,56,0.7)" />
      <path d="M24 14 L28 24 L24 34 L20 24 Z" fill="#d4af37" opacity="0.8" />
      <circle cx="24" cy="24" r="4" fill="#d4af37" opacity="0.9" />
    </svg>
    <span className="absolute top-2 right-2 animate-pulse">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" fill="#ffe066" opacity="0.7"/></svg>
    </span>
  </div>
);

const Confetti = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
      <circle cx="20" cy="20" r="3" fill="#ffe066"/>
      <circle cx="60" cy="10" r="2" fill="#d4af37"/>
      <circle cx="100" cy="30" r="2.5" fill="#fffbe6"/>
      <circle cx="40" cy="50" r="2" fill="#bfa14a"/>
      <circle cx="80" cy="40" r="2.5" fill="#e0c97f"/>
    </svg>
  </div>
);

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    if (!email) {
      setError('Email is required.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #181b2c 0%, #23243a 100%)' }}>
      <div className="w-full max-w-sm flex flex-col items-center justify-center flex-grow">
        <CrestIcon />
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 tracking-tight whitespace-nowrap" style={{ fontFamily: 'serif', color: '#d4af37', letterSpacing: '-0.01em' }}>
          Request Private Invitation
        </h1>
        <div className="w-full bg-[#181b2c] rounded-2xl p-8 shadow-2xl border border-[#d4af37]/60 relative overflow-hidden" style={{ boxShadow: '0 0 32px 0 #d4af3722' }}>
          {submitted && <Confetti />}
          {submitted ? (
            <div className="text-center py-10 relative z-10">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: '#d4af37', fontFamily: 'serif' }}>Thank you for your interest!</h2>
              <p className="text-gray-300">We will be in touch if your application is selected.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 relative z-10">
              {/* First Name Field */}
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 text-sm text-[#d4af37] font-semibold" style={{ fontFamily: 'serif' }}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  className="h-14 px-5 rounded-xl border-2 border-[#d4af37]/40 bg-[#23243a] text-gray-100 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 transition text-lg placeholder:text-gray-400"
                  style={{ fontFamily: 'serif', letterSpacing: '0.01em' }}
                  autoComplete="given-name"
                  aria-label="First Name"
                  placeholder="First Name"
                />
              </div>
              {/* Email Field */}
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-sm text-[#d4af37] font-semibold" style={{ fontFamily: 'serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-14 px-5 rounded-xl border-2 border-[#d4af37]/40 bg-[#23243a] text-gray-100 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 transition text-lg placeholder:text-gray-400"
                  style={{ fontFamily: 'serif', letterSpacing: '0.01em' }}
                  autoComplete="email"
                  aria-label="Email Address"
                  placeholder="Email Address"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-left pl-1">{error}</div>
              )}
              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-lg font-semibold text-lg shadow transition disabled:opacity-60 relative overflow-hidden group"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #bfa14a 100%)', color: '#23243a', fontFamily: 'serif', letterSpacing: '0.03em' }}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading && (
                    <svg className="animate-spin mr-2 h-5 w-5 text-[#bfa14a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#23243a" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#bfa14a" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  )}
                  {isLoading ? 'Submitting...' : 'Request Private Invitation'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#ffe066]/30 via-[#d4af37]/40 to-[#ffe066]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </button>
            </form>
          )}
          <div className="mt-6 text-xs text-center text-gray-400" style={{ fontFamily: 'serif' }}>
            Your privacy is our priority. Invitation requests are reviewed discreetly.
          </div>
        </div>
      </div>
    </main>
  );
} 