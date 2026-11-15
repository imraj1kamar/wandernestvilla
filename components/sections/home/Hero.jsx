import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[92vh] flex flex-col justify-center overflow-visible bg-brand-dark">
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          src="/assets/images/home/hero.png"
          alt="Wandernest Luxury Villas"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
          priority
        />

        {/* Top subtle dark gradient to enhance header readability */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-transparent" />

        {/* Heavy left-to-right dark gradient overlay matching design system */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent" />

        {/* Bottom subtle gradient fade to page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 sm:pt-36 md:pt-40 pb-36 md:pb-44">
        {/* Subtle Luxury Pre-Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-light text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-main animate-pulse" />
          The Quintessential Private Stay
        </div>

        {/* Main SEO H1 */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.1] tracking-wide mb-6 max-w-4xl drop-shadow-2xl animate-fade-in-up">
          Wandernest Villas: <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-gold-light">
            Premium Private Pool Villas
          </span> in Mumbai &amp; Lonavla
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
          Handcrafted private estates, temperature-controlled pools &amp; 5-star personalized hospitality across Maharashtra&apos;s most breathtaking landscapes.
        </p>
      </div>

      {/* Floating Search Bar (Absolute positioned at bottom center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-[95%] max-w-5xl px-2 animate-fade-in-up delay-300">
        <div className="glass-dark rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 shadow-2xl border border-white/15">

          {/* Section 1: Destinations */}
          <div className="flex-[1.4] px-5 py-2.5 md:border-r border-white/10">
            <label className="block text-gold-main text-xs font-semibold uppercase tracking-wider mb-1.5">
              Destinations
            </label>
            <input
              type="text"
              placeholder="Lonavla, Alibaug, Karjat, Goa"
              className="w-full bg-transparent text-white text-sm md:text-base placeholder-white/40 outline-none"
            />
          </div>

          {/* Section 2: Dates */}
          <div className="flex-1 px-5 py-2.5 md:border-r border-white/10 cursor-pointer group">
            <label className="text-gold-main text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gold-main" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Dates
            </label>
            <input
              type="text"
              placeholder="Check in — Check out"
              className="w-full bg-transparent text-white text-sm md:text-base placeholder-white/40 outline-none cursor-pointer"
            />
          </div>

          {/* Section 3: Guests */}
          <div className="flex-1 px-5 py-2.5 cursor-pointer group">
            <label className="text-gold-main text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gold-main" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Guests
            </label>
            <input
              type="text"
              placeholder="2 Guests, 1 Villa"
              className="w-full bg-transparent text-white text-sm md:text-base placeholder-white/40 outline-none cursor-pointer"
            />
          </div>

          {/* Search CTA */}
          <div className="px-2 md:pl-4">
            <button
              type="button"
              suppressHydrationWarning
              className="btn-primary w-full md:w-auto px-8 py-3.5 rounded-xl text-base font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
