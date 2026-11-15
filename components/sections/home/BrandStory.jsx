import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="w-full bg-brand-light pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cinematic Tall Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/5 group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Wandernest Luxury Architecture"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-brand-card/90 backdrop-blur-md border border-white/20 shadow-lg">
                <p className="font-serif text-sm font-semibold text-foreground">
                  The Wandernest Standard
                </p>
                <p className="font-sans text-xs text-muted mt-0.5">
                  100% Verified Private Estates &bull; Uncompromised Seclusion
                </p>
              </div>
            </div>

            {/* Decorative Gold Accent Element */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-main/40 rounded-tl-3xl -z-10" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-main/40 rounded-br-3xl -z-10" />
          </div>

          {/* Right Column: Generous White Space & Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Category Subtitle */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                The Wandernest Philosophy
              </span>
            </div>

            {/* Heading */}
            <h2 className="heading-lg text-[#171717] mb-6 leading-tight">
              Curating Maharashtra&apos;s Most Coveted Private Havens
            </h2>

            {/* Organic SEO Rich Prose */}
            <div className="space-y-5 text-gray-800 text-base md:text-lg leading-relaxed font-light">
              <p>
                At Wandernest, we believe true luxury is rooted in uninterrupted silence, architectural grace, and seamless intimacy. Created for discerning families and private groups, our hand-selected portfolio redefines <strong className="font-semibold text-[#171717]">weekend getaways near Mumbai</strong> into transformative escapes.
              </p>
              <p>
                Whether you seek the tranquil heights of our <strong className="font-semibold text-[#171717]">luxury private pool villas in Lonavla</strong> embraced by cascading monsoon clouds, or the sun-bleached serenity of our private <strong className="font-semibold text-[#171717]">Alibaug beachfront estates</strong> just minutes from the Arabian sea, every address is entirely your own.
              </p>
              <p>
                Every estate is fully serviced by dedicated, discreet <strong className="font-semibold text-[#171717]">in-house chefs</strong> crafting farm-to-table coastal feasts and multi-course royal dinners, paired with personalized butler service to ensure you never have to lift a finger.
              </p>
            </div>

            {/* Stats / Value Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-gray-300">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#171717]">50+</p>
                <p className="font-sans text-xs text-gray-600 uppercase tracking-wider mt-1 font-medium">Private Estates</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#171717]">100%</p>
                <p className="font-sans text-xs text-gray-600 uppercase tracking-wider mt-1 font-medium">Private Pools</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#171717]">5★</p>
                <p className="font-sans text-xs text-gray-600 uppercase tracking-wider mt-1 font-medium">Dedicated Chefs</p>
              </div>
            </div>

            {/* Action Link */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors group"
              >
                <span>Read the complete Wandernest Story</span>
                <span className="transition-transform group-hover:translate-x-1.5">&rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
