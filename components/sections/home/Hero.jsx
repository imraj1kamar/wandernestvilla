"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchSection from './SearchSection';

// SEO Optimized Slide Data
const heroSlides = [
  {
    id: 1,
    image: "/assets/images/home/hero.png",
    titleMain: "Wandernest Villas:",
    titleHighlight: "Premium Private Pool Villas",
    titleSuffix: "in Mumbai & Lonavla",
    subtitle: "Handcrafted private estates, temperature-controlled pools & 5-star personalized hospitality across Maharashtra's most breathtaking landscapes."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    titleMain: "Coastal Escapes:",
    titleHighlight: "Exclusive Beachfront Mansions",
    titleSuffix: "in Alibaug",
    subtitle: "Wake up to the sound of ocean waves. Signature coastal properties featuring discrete in-house chefs and panoramic views."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85",
    titleMain: "Hilltop Sanctuaries:",
    titleHighlight: "Heated Infinity Pools",
    titleSuffix: "in Khandala",
    subtitle: "High-altitude luxury retreats designed for absolute privacy, premium wellness, and uninterrupted valley vistas."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slideshow logic (Changes every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[92vh] flex flex-col justify-center overflow-visible bg-brand-dark">
      
      {/* ─── BACKGROUND IMAGES & SLOW ZOOM ANIMATION ─── */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-brand-dark">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.titleHighlight}
                fill
                sizes="100vw"
                priority={index === 0} // SEO/LCP Guard: Only preload the first image
                className={`object-cover object-center transition-transform ease-out ${
                  isActive ? "scale-110 duration-[10000ms]" : "scale-100 duration-1000"
                }`}
              />
            </div>
          );
        })}

        {/* Global Overlays (Rendered once on top of all images for consistency) */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent z-20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent z-20" />
      </div>

      {/* ─── DYNAMIC TEXT CONTENT ─── */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 sm:pt-36 md:pt-10 pb-36 md:pb-44">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-light text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-main animate-pulse" />
          The Quintessential Private Stay
        </div>

        {/* Text Crossfade Container */}
        <div className="relative min-h-[180px] sm:min-h-[160px] md:min-h-[180px]">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            
            return (
              <div
                key={`text-${slide.id}`}
                className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                  isActive 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                {/* H1 SEO Guard: Kept as H1 across slides so Google reads the structure correctly */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.1] tracking-wide mb-6 max-w-4xl drop-shadow-2xl">
                  {slide.titleMain} <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-gold-light">
                    {slide.titleHighlight}
                  </span>{" "}
                  {slide.titleSuffix}
                </h1>

                <p className="text-white/85 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

     
      
    </section>
  );
}