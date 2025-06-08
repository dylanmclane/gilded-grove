export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-neutral-900">
      <img
        src="estate2.avif"
        alt="Luxury estate"
        className="absolute inset-0 h-full w-full object-cover opacity-100 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-neutral-900/70 z-10" />
      <div className="relative z-20 flex flex-col items-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-serif font-extralight text-center mb-6 tracking-wide">
          Gilded Grove
        </h1>
        <p className="text-gray-200 text-2xl md:text-3xl text-center mb-12 font-light max-w-2xl">
          Discreet, intelligent estate management—tailored for those who value privacy, order, and time.
        </p>
        <div className="w-full max-w-xl bg-neutral-900/95 border border-gray-200/30 rounded-2xl px-10 py-10 flex flex-col items-center">
          <p className="text-gray-100 text-lg text-center font-light mb-6">
            Early access is available by invitation only.
          </p>
          <form className="flex w-full">
            <input
              type="email"
              required
              placeholder="Request a private invitation"
              className="flex-1 bg-transparent border-b border-gray-400/40 text-xl text-gray-100 placeholder-gray-400 px-2 py-3 focus:outline-none focus:border-platinum transition-all"
            />
            <button
              type="submit"
              className="ml-4 px-8 py-3 bg-gradient-to-r from-gray-300 to-gray-100 text-neutral-900 font-medium rounded-full shadow-none hover:from-gray-200 hover:to-gray-100 transition-all"
            >
              Request Access
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
