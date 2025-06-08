// If you’re using Next.js 13+ with App Router, put this in /app/page.tsx
// If using Pages Router, put it in /pages/index.tsx

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black">
      {/* Background Image */}
      <img
        src="/estate.jpg" // Or use an external URL
        alt="Luxury estate"
        className="absolute inset-0 h-full w-full object-cover opacity-60 z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center drop-shadow-lg mb-6">
          Estate inventory management<br />
          made simple.
        </h1>
        <p className="text-white text-xl md:text-2xl text-center mb-8 font-light">
          Luxury estate software to effortlessly manage your assets
        </p>
        <form className="flex w-full max-w-md">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="rounded-l-md px-4 py-3 flex-1 text-lg outline-none"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-r-md text-lg transition-colors"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
