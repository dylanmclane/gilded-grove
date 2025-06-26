'use client';

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
    <main className="min-h-screen bg-base-100 overflow-hidden">
      {/* Animated gradient background */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0" 
             style={{ 
               animation: 'gradientLoop 15s linear infinite',
               background: `
                 radial-gradient(circle at 20% 50%, rgba(87,96,111,0.6) 0%, rgba(87,96,111,0.6) 30%, transparent 60%),
                 radial-gradient(circle at 80% 20%, #4a4a4a 0%, #4a4a4a 25%, transparent 55%),
                 radial-gradient(circle at 40% 80%, #5a6c7d 0%, #5a6c7d 35%, transparent 65%),
                 radial-gradient(circle at 60% 40%, #b8860b 0%, #b8860b 20%, transparent 40%),
                 radial-gradient(ellipse at center, #1a1a1a 0%, #2a2a2a 20%, #3a3a3a 40%, transparent 80%)
               `,
               backgroundSize: '200% 200%, 200% 200%, 220% 220%, 250% 250%, 350% 350%'
             }} />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 z-5 opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6b86b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
        
        {/* Subtle floating particles */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/20 rounded-full" 
               style={{ 
                 animation: 'float 8s ease-in-out infinite',
                 animationDelay: '0s'
               }}></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary/30 rounded-full" 
               style={{ 
                 animation: 'float 10s ease-in-out infinite',
                 animationDelay: '2s'
               }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/15 rounded-full" 
               style={{ 
                 animation: 'float 9s ease-in-out infinite',
                 animationDelay: '4s'
               }}></div>
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-primary/25 rounded-full" 
               style={{ 
                 animation: 'float 11s ease-in-out infinite',
                 animationDelay: '6s'
               }}></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-primary/20 rounded-full" 
               style={{ 
                 animation: 'float 12s ease-in-out infinite',
                 animationDelay: '3s'
               }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
          <div className="card bg-base-300/95 backdrop-blur-sm shadow-2xl w-full max-w-md border border-base-300/50 relative" 
               style={{ 
                 animation: 'gentleFloat 6s ease-in-out infinite',
                 transform: 'translateY(0px)'
               }}>
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
            <div className="card-body p-8 relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-semibold mb-3 tracking-wide" 
                    style={{ 
                      animation: 'breathing 4s ease-in-out infinite',
                      color: '#6b7c93'
                    }}>
                  Gilded Grove
                </h1>
                <div className="w-16 h-px mx-auto mb-4" 
                     style={{ 
                       animation: 'fadeInOut 3s ease-in-out infinite',
                       backgroundColor: '#57606f',
                       opacity: 0.6
                     }}></div>
                <p className="text-base-content/80 text-sm leading-relaxed">
                  Streamlined estate inventory for sophisticated families managing complex, multi-generational assets.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content/70 font-medium">First Name</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      required
                      disabled={isLoading}
                      className="input input-bordered input-primary bg-base-300/50 border-base-300 focus:border-primary transition-all duration-500 hover:bg-base-300/70"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content/70 font-medium">Last Name</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      required
                      disabled={isLoading}
                      className="input input-bordered input-primary bg-base-300/50 border-base-300 focus:border-primary transition-all duration-500 hover:bg-base-300/70"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content/70 font-medium">Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      disabled={isLoading}
                      className="input input-bordered input-primary bg-base-300/50 border-base-300 focus:border-primary transition-all duration-500 hover:bg-base-300/70"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content/70 font-medium">
                        Phone Number
                        <span className="text-base-content/50 ml-1 font-normal">(Optional)</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                      className="input input-bordered input-primary bg-base-300/50 border-base-300 focus:border-primary transition-all duration-500 hover:bg-base-300/70"
                    />
                  </div>
                </div>

                {error && (
                  <div className="alert alert-error bg-error/20 border-error/30 text-error-content" 
                       style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="form-control pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || !firstName || !lastName || !email}
                    className="btn btn-primary w-full h-12 text-base font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:shadow-xl hover:brightness-110"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Processing...
                      </>
                    ) : (
                      'Request Private Access'
                    )}
                  </button>
                </div>
              </form>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-base-300/30">
                <div className="flex items-center justify-center space-x-8 text-xs text-base-content/60">
                  <div className="flex items-center space-x-2" 
                       style={{ animation: 'gentleGlow 6s ease-in-out infinite' }}>
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-2" 
                       style={{ animation: 'gentleGlow 6s ease-in-out infinite', animationDelay: '3s' }}>
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Family-Owned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for sophisticated animations */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes breathing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.4; }
          50% { transform: translateY(-5px) translateX(-3px); opacity: 0.3; }
          75% { transform: translateY(-15px) translateX(2px); opacity: 0.5; }
        }
        
        @keyframes gentleGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes gradientLoop {
          0% { 
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          }
          50% { 
            background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%;
          }
          100% { 
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </main>
  );
}
