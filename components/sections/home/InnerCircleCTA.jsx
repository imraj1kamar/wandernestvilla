import React from 'react';

export default function InnerCircleCTA() {
  return (
    <section className="relative w-full bg-brand-dark text-white py-24 md:py-32 overflow-hidden border-t border-white/10">
      
      {/* Decorative luxury radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-main/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Exclusive Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold-light text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-main" />
          The Wandernest Inner Circle
        </div>

        {/* Large Gold Serif Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-5 drop-shadow-md">
          Unlock Secret Escapes &amp; Member-Only Pricing
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 font-sans text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Receive confidential notifications for unlisted private estates, member-only weekend rates, and priority holiday reservations across Maharashtra.
        </p>

        {/* Minimalist Luxury Styled Single Email Input with Gold Arrow Button */}
        <form className="max-w-md sm:max-w-lg mx-auto relative flex items-center">
          <input
            type="email"
            required
            placeholder="Enter your personal email address"
            className="w-full bg-white/5 border border-white/20 focus:border-gold-main rounded-full pl-6 pr-16 py-4 text-white text-sm sm:text-base placeholder-white/40 outline-none backdrop-blur-md transition-all duration-300 shadow-inner"
          />
          <button
            type="submit"
            aria-label="Request Membership"
            className="absolute right-2 w-11 h-11 rounded-full bg-gradient-to-r from-gold-light via-gold-main to-gold-dark text-black font-bold flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </form>

        {/* Privacy Note */}
        <p className="font-sans text-xs text-white/50 font-light mt-4">
          Strictly confidential. No spam, advertisements, or public distribution.
        </p>

      </div>
    </section>
  );
}
