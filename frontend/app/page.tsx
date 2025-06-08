export default function Home() {
  return (
    <main className="relative min-h-screen w-full font-sans text-neutral-900 overflow-hidden">
      {/* Background image rendered via <img> */}
      <img
        src="/estate2.avif"
        alt="Estate"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Opaque black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Welcome to Gilded Grove
          </h1>
          <p className="text-center text-gray-700 mb-6 leading-relaxed">
            A modern estate inventory system for families, advisors, and households
            with too much to track — and too much to lose.
          </p>
          <form className="flex flex-col items-center space-y-4">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-11/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="w-11/12 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Request Early Access
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
