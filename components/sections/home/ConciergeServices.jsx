'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const services = [
  {
    id: 'dining',
    title: 'Private Dining',
    tagline: 'Artisanal Gastronomy & Master Chefs',
    description:
      'From 7-course royal degustation menus on candlelit pool decks to traditional coastal Malvani barbecues, our certified personal chefs curate every meal bespoke to your dietary preferences with locally harvested ingredients.',
    highlight: 'Dedicated Sommelier & In-Villa Mixologist available',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wellness',
    title: 'Wellness & Spa',
    tagline: 'Sanctuary of Holistic Rejuvenation',
    description:
      'Transform your private courtyard into a tranquil retreat with master Ayurvedic therapists, sunrise Pranayama masters, and singing bowl sound healers designed to restore mind and body in complete seclusion.',
    highlight: 'Natural herbal oils & custom bath rituals',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'yacht',
    title: 'Yacht Charters',
    tagline: 'Gateway to Oceanfront Opulence',
    description:
      'Bypass traffic with private speedboat transfers from Gateway of India directly to Mandwa jetty, or charter a 50-foot luxury catamaran for sunset champagne cruises along the scenic Alibaug coastline.',
    highlight: 'VIP harbor clearance & on-board champagne service',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chauffeur',
    title: 'Chauffeur Services',
    tagline: 'Immaculate Fleet & Discreet Drivers',
    description:
      'Glide through the Western Ghats in our premium fleet of Mercedes Maybachs, Range Rovers, and executive luxury vans. Professional, defensively trained chauffeurs ensure flawless transfers from Mumbai & Pune.',
    highlight: 'Luggage concierge & airport tarmac meets',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function ConciergeServices() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section className="w-full bg-brand-light py-16 md:py-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gold-main" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Bespoke Hospitality
            </span>
          </div>
          <h2 className="heading-lg text-foreground tracking-tight">
            Signature Concierge Services
          </h2>
          <p className="text-gray-700 text-sm md:text-base mt-1 font-light max-w-2xl">
            Every Wandernest reservation includes a private lifestyle curator to orchestrate unforgettable moments.
          </p>
        </div>

        {/* Dynamic 2-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Vertical Large Text Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {services.map((service, index) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveTab(service.id)}
                  className={`text-left w-full p-5 md:p-6 rounded-2xl transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-xl border border-black/5'
                      : 'hover:bg-white/60 bg-transparent border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs ${isActive ? 'text-gold-dark font-bold' : 'text-gray-400'}`}>
                        0{index + 1}
                      </span>
                      <h3
                        className={`font-serif text-xl sm:text-2xl md:text-3xl transition-colors ${
                          isActive
                            ? 'text-foreground font-bold'
                            : 'text-gray-500 group-hover:text-foreground font-normal'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gold-main text-black rotate-0 scale-100'
                          : 'opacity-0 -rotate-45 scale-75 group-hover:opacity-60'
                      }`}
                    >
                      &rarr;
                    </span>
                  </div>

                  {isActive && (
                    <p className="font-sans text-xs text-gold-dark font-medium mt-2 pl-8 tracking-wide">
                      {service.tagline}
                    </p>
                  )}

                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <div className="absolute left-0 inset-y-3 w-1.5 bg-gradient-to-b from-gold-light via-gold-main to-gold-dark rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Res Corresponding Display Card */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/5 group">
              <Image
                key={activeService.id}
                src={activeService.image}
                alt={activeService.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 750px"
                className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Detail Content Box */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 text-white z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20 text-gold-light uppercase tracking-wider mb-3">
                  {activeService.tagline}
                </span>

                <h4 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                  {activeService.title}
                </h4>

                <p className="text-white/85 text-sm md:text-base font-light leading-relaxed max-w-xl mb-4">
                  {activeService.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-gold-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-main" />
                  <span>{activeService.highlight}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
