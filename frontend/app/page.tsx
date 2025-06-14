export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans text-white overflow-hidden">
      {/* Background image absolutely positioned */}
      <img
        src="/estate2.avif"
        alt="Luxury estate"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ filter: "blur(2px)" }}
      />

      {/* The dimming overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>

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

          <form className="space-y-4" noValidate>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="w-full px-4 py-3 text-sm border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#d6b86b] transition"
            />
            <button
              type="submit"
              className="w-full py-3 px-6 bg-white text-black rounded-md hover:bg-neutral-200 transition text-sm font-medium tracking-wide"
            >
              Request Private Access
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
