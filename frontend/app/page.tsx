'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic client-side validation
    if (!firstName || !lastName || !email) {
      setError('First name, last name, and email are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/success');
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
    <main className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Background image */}
      <Image
        src="/estate2.avif"
        alt="Luxury estate"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Simple dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <section className="bg-[rgba(0,0,0,0.7)] backdrop-blur-sm rounded-xl shadow-lg w-full max-w-[420px] p-6 sm:p-8 border border-white/10 space-y-6">
          <header className="text-center space-y-2">
            <h1 className="text-2xl font-serif font-medium text-white tracking-tight">
              Gilded Grove
            </h1>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Discreet estate inventory software for families, advisors, and professionals
              with too much to track — and too much to lose.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-3">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d6b86b] transition disabled:opacity-50"
              />
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d6b86b] transition disabled:opacity-50"
              />
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d6b86b] transition disabled:opacity-50"
              />
              <label htmlFor="phone" className="sr-only">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d6b86b] transition disabled:opacity-50"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading || !firstName || !lastName || !email}
              className="w-full py-3 px-6 bg-white text-black rounded-md hover:bg-neutral-200 transition text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Request Private Access'
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
