'use client';

import React, { useState, useEffect } from 'react';

/**
 * FloatingActions Component
 * 
 * Features:
 * 1. Scroll-to-Top Button:
 *    - Dynamically appears only when the user scrolls past the hero section (scrollY > 400).
 *    - Smoothly scrolls the window back to the top.
 * 2. WhatsApp Concierge Floating Button:
 *    - Direct link to official Wandernest Concierge WhatsApp hotline (+91 98200 92837).
 *    - Includes live pulsating 24/7 status indicator and luxury hover badge.
 */
export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button after scrolling past hero section (400px)
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappNumber = '9198++++++++';
  const whatsappMessage = encodeURIComponent(
    'Hello Wandernest Villas Concierge, I would like to inquire about reserving a luxury private villa.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <aside
      aria-label="Floating quick actions"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none"
    >
      {/* ─── 1. SCROLL-TO-TOP BUTTON ────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ease-out transform ${showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-dark/95 border border-gold-main/40 text-gold-light shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-gold-main hover:text-black hover:border-gold-light hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
        >
          {/* Tooltip on Desktop */}
          <span className="absolute right-14 whitespace-nowrap px-3 py-1.5 rounded-lg bg-brand-dark/95 border border-gold-main/30 text-gold-light text-xs font-sans font-medium shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
            Back to Top
          </span>

          {/* Upward Chevron Icon */}
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ─── 2. WHATSAPP CONCIERGE BUTTON ───────────────────────────────── */}
      <div className="pointer-events-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Concierge Chat (+91 98200 92837)"
          className="group relative flex items-center gap-3 px-3.5 py-3 rounded-full bg-gradient-to-r from-brand-dark to-brand-card border border-gold-main/50 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-whatsapp hover:shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95"
        >
          {/* Pulse Indicator dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-whatsapp" />
          </span>

          {/* Label for desktop & tablets */}
          <span className="hidden sm:inline-flex flex-col text-left pr-1">
            <span className="font-serif text-[11px] font-bold text-white tracking-wide leading-tight group-hover:text-whatsapp transition-colors">
              WhatsApp Concierge
            </span>
            <span className="font-sans text-[9px] font-medium text-gold-light/90 leading-tight">
              Instant 24/7 Response
            </span>
          </span>

          {/* WhatsApp Icon Circle */}
          <div className="w-9 h-9 rounded-full bg-whatsapp flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:brightness-110 transition-all">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29" />
            </svg>
          </div>
        </a>
      </div>
    </aside>
  );
}
