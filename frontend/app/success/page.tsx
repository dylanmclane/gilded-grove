import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 z-0" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <section className="bg-[rgba(0,0,0,0.7)] backdrop-blur-sm rounded-xl shadow-lg w-full max-w-[420px] p-6 sm:p-8 border border-white/10 space-y-6 text-center">
          <div className="space-y-4">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <header className="space-y-2">
              <h1 className="text-2xl font-serif font-medium text-white tracking-tight">
                Access Requested
              </h1>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Thank you for your interest in Gilded Grove. We've received your request and will be in touch soon with private access details.
              </p>
            </header>

            <div className="pt-4 space-y-3">
              <p className="text-xs text-neutral-400">
                You'll receive an email confirmation shortly.
              </p>
              
              <Link 
                href="/"
                className="inline-block py-3 px-6 bg-white text-black rounded-md hover:bg-neutral-200 transition text-sm font-medium tracking-wide"
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 