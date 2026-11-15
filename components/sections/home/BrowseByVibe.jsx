'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const vibes = [
  {
    title: 'Heritage Palaces',
    count: '12 Regal Estates',
    location: 'Karjat & Udaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/heritage-palaces',
  },
  {
    title: 'Beachfront Escapes',
    count: '18 Oceanfront Mansions',
    location: 'Alibaug & Goa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/beachfront-escapes',
  },
  {
    title: 'High-Altitude Retreats',
    count: '15 Mountain Sanctuaries',
    location: 'Lonavla & Kasauli',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/high-altitude-retreats',
  },
  {
    title: 'Party Villas',
    count: '20 Celebration Compounds',
    location: 'Pawna & Khandala',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/party-villas',
  },
  {
    title: 'Private Island Villas',
    count: '6 Exclusive Sanctuaries',
    location: 'Lakeside & Coastal',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/private-islands',
  },
  {
    title: 'Forest Sanctuaries',
    count: '9 Wilderness Estates',
    location: 'Igatpuri & Mahabaleshwar',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    href: '/vibe/forest-sanctuaries',
  },
];

export default function BrowseByVibe() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate active index based on scroll position
      const cardWidth = 280; // card + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), vibes.length - 1));
    }
  };

  useEffect(() => {
    checkScroll();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-brand-light py-16 md:py-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block with Title & Carousel Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Curated Collections
              </span>
            </div>
            <h2 className="heading-lg text-[#171717] tracking-tight">
              Browse by Vibe
            </h2>
            <p className="text-gray-700 text-sm md:text-base mt-1 font-light">
              Filter by architectural character, scenic vistas, and the mood of your celebration.
            </p>
          </div>

          {/* Interactive Carousel Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium mr-2 hidden sm:inline-block">
              {activeIndex + 1} / {vibes.length} Collections
            </span>

            {/* Previous Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll('prev')}
              disabled={!canScrollLeft}
              aria-label="Previous Slide"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-black/20 text-[#171717] hover:border-gold-main hover:bg-gold-main hover:text-black shadow-sm cursor-pointer'
                  : 'border-black/5 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll('next')}
              disabled={!canScrollRight}
              aria-label="Next Slide"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-black/20 text-[#171717] hover:border-gold-main hover:bg-gold-main hover:text-black shadow-sm cursor-pointer'
                  : 'border-black/5 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slider Horizontal Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-5 pb-6 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {vibes.map((vibe) => (
            <Link
              key={vibe.title}
              href={vibe.href}
              className="group relative flex-none w-[260px] h-[330px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 snap-start block"
            >
              {/* Background Image with hover scale */}
              <Image
                src={vibe.image}
                alt={vibe.title}
                fill
                sizes="260px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-all duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                {/* Top Location Pill */}
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-medium tracking-wider uppercase text-white/90 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                    {vibe.location}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold-main group-hover:text-black transition-all duration-300">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </div>

                {/* Bottom Category Info */}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide leading-tight group-hover:text-gold-light transition-colors">
                    {vibe.title}
                  </h3>
                  <p className="text-xs font-sans text-gold-main tracking-wider uppercase mt-1.5 font-medium">
                    {vibe.count}
                  </p>
                </div>
              </div>

              {/* Bottom Gold Line Accent on Hover */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-gold-light via-gold-main to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        {/* Carousel Slider Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {vibes.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              suppressHydrationWarning
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({
                    left: dotIdx * 280,
                    behavior: 'smooth',
                  });
                }
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? 'w-7 bg-gold-main'
                  : 'w-2 bg-black/15 hover:bg-black/30'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
