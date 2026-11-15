import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#12151e]/50 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl font-bold text-gold-main tracking-widest uppercase flex items-center gap-2"
        >
          <span>WANDERNEST</span>
          <span className="hidden sm:inline-block text-[10px] tracking-widest text-white/50 border-l border-white/20 pl-2 font-sans font-medium">VILLAS</span>
        </Link>

        {/* CENTER: Nav — hidden on mobile */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/villas" className="text-white/90 hover:text-gold-main transition-colors duration-200">
            Our Villas
          </Link>
          <Link href="/destinations" className="text-white/90 hover:text-gold-main transition-colors duration-200">
            Destinations
          </Link>
          <Link href="/offerings" className="text-white/90 hover:text-gold-main transition-colors duration-200">
            Offerings
          </Link>
          <Link href="/list-with-us" className="text-white/90 hover:text-gold-main transition-colors duration-200">
            List with Us
          </Link>
        </nav>

        {/* RIGHT: Login + Book Now */}
        <div className="flex gap-5 items-center">
          {/* Login — hidden on mobile */}
          <Link
            href="/login"
            className="hidden md:inline-block text-sm text-white/80 hover:text-gold-main transition-colors"
          >
            Login
          </Link>

          {/* Book Now — always visible */}
          <button
            type="button"
            suppressHydrationWarning
            className="btn-primary text-sm px-5 py-2.5 rounded-lg font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}
