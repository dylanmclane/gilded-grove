'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const CrestIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
    <circle cx="24" cy="24" r="22" stroke="#2563eb" strokeWidth="2.5" fill="#fff" />
    <path d="M24 14 L28 24 L24 34 L20 24 Z" fill="#2563eb" opacity="0.8" />
    <circle cx="24" cy="24" r="4" fill="#d4af37" opacity="0.9" />
  </svg>
);

const DemoEstateMVP = dynamic(() => import('./demo/page').then(mod => mod.default), { ssr: false });

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white pt-16 lg:pt-0">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-16">
        {/* Hero Section */}
        <CrestIcon />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 tracking-tight" style={{ fontFamily: 'serif', color: '#223', letterSpacing: '-0.01em' }}>
          Inventory Management, Reimagined
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center mb-8 max-w-2xl px-4" style={{ color: '#444', fontFamily: 'serif' }}>
          The modern platform for tracking, valuing, and protecting your most important assets.
        </p>
        <Link href="/signup">
          <button className="mb-12 px-8 sm:px-10 py-4 rounded-lg font-semibold text-lg sm:text-xl shadow transition w-full sm:w-auto" style={{ background: 'linear-gradient(90deg, #2563eb 0%, #1746a0 100%)', color: '#fff', fontFamily: 'serif', letterSpacing: '0.03em' }}>
            Request Private Invitation
          </button>
        </Link>
      </div>
      {/* Interactive Product Preview */}
      <div className="w-full flex flex-col items-center justify-center mb-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 px-4" style={{ color: '#223', fontFamily: 'serif' }}>
          See Gilded Grove in Action
        </h2>
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#e5e7eb] bg-white">
          <DemoEstateMVP />
        </div>
      </div>
      {/* Features Section */}
      <div className="my-20 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4">
        <div className="flex flex-col items-center bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm">
          <span className="text-3xl mb-2" role="img" aria-label="shield">🛡️</span>
          <h3 className="text-lg font-semibold mb-1" style={{ color: '#2563eb', fontFamily: 'serif' }}>Bank-Grade Security</h3>
          <p className="text-sm text-center" style={{ color: '#223' }}>Your data is encrypted and protected with the highest standards.</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm">
          <span className="text-3xl mb-2" role="img" aria-label="bolt">⚡</span>
          <h3 className="text-lg font-semibold mb-1" style={{ color: '#2563eb', fontFamily: 'serif' }}>Instant Control</h3>
          <p className="text-sm text-center" style={{ color: '#223' }}>Move, update, and manage inventory in real time from anywhere.</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm">
          <span className="text-3xl mb-2" role="img" aria-label="family">👨‍👩‍👧‍👦</span>
          <h3 className="text-lg font-semibold mb-1" style={{ color: '#2563eb', fontFamily: 'serif' }}>Built for Families</h3>
          <p className="text-sm text-center" style={{ color: '#223' }}>Share access and collaborate securely with family and trusted advisors.</p>
        </div>
      </div>
      {/* Testimonial/Trust Section */}
      <div className="mb-4 w-full max-w-2xl bg-white rounded-lg p-6 sm:p-8 border border-[#e5e7eb] shadow-sm flex flex-col items-center mx-4">
        <p className="italic text-lg text-center mb-2" style={{ color: '#2563eb', fontFamily: 'serif' }}>
          &ldquo;Gilded Grove is the future of inventory management. Finally, a platform that feels as secure and modern as a Swiss vault.&rdquo;
        </p>
        <span className="text-sm text-gray-500">— Private Client, New York</span>
      </div>
    </div>
  );
}
