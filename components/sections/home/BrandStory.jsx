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
                <p className="font-sans text-sm font-semibold text-foreground">
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
            <h2 className="heading-lg text-foreground mb-6 leading-tight">
              Where Unrivaled Seclusion Meets Bespoke Hospitality
            </h2>

            {/* Organic SEO Rich Prose */}
            <div className="space-y-5 text-gray-800 text-base md:text-lg leading-relaxed font-light">
              <p>
                At Wandernest Villas, we believe true luxury lies in undisturbed stillness. Our collection of <strong className="font-semibold text-foreground">private pool villas near Mumbai</strong> and <strong className="font-semibold text-foreground">Alibaug beachfront estates</strong> is curated for those who demand the complete privacy of a personal home paired with the uncompromising standards of a 5-star boutique resort.
              </p>
              <p>
                Every estate is fully serviced by <strong className="font-semibold text-foreground">dedicated in-house chefs</strong> crafting farm-to-table coastal feasts and bespoke multi-course menus. Whether you seek an escape under monsoonal skies or sun-drenched mornings, experience premier <strong className="font-semibold text-foreground">5-star hospitality in Lonavla</strong>, Karjat, and beyond.
              </p>
            </div>

            {/* Stats / Value Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-gray-300">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-foreground">50+</p>
                <p className="font-sans text-xs text-gray-600 uppercase tracking-wider mt-1 font-medium">Private Estates</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-foreground">100%</p>
                <p className="font-sans text-xs text-gray-600 uppercase tracking-wider mt-1 font-medium">Private Pools</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-bold text-foreground">5★</p>
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
