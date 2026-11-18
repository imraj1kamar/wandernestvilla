'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function SearchSection() {
  // Search parameters state
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('2026-12-18');
  const [checkOut, setCheckOut] = useState('2026-12-21');
  const [guests, setGuests] = useState('4 Guests');

  // Popover modal toggles
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Click outside detection refs
  const datePickerRef = useRef(null);
  const guestsPickerRef = useRef(null);

  // Dynamic night calculation
  const nights = useMemo(() => {
    try {
      if (!checkIn || !checkOut) return 0;
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch {
      return 0;
    }
  }, [checkIn, checkOut]);

  // Formatted date string for display
  const formattedDates = useMemo(() => {
    if (!checkIn && !checkOut) return 'Add dates';
    try {
      if (checkIn && !checkOut) {
        const d = new Date(checkIn);
        return `From ${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`;
      }
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const f1 = d1.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const f2 = d2.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return `${f1} — ${f2} ${nights > 0 ? `(${nights} night${nights > 1 ? 's' : ''})` : ''}`;
    } catch {
      return `${checkIn} to ${checkOut}`;
    }
  }, [checkIn, checkOut, nights]);

  // Close popovers when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
      if (guestsPickerRef.current && !guestsPickerRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick date presets
  const handlePreset = (type) => {
    const today = new Date();
    if (type === 'this-weekend') {
      const friday = new Date(today);
      friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
      const sunday = new Date(friday);
      sunday.setDate(friday.getDate() + 2);
      setCheckIn(friday.toISOString().split('T')[0]);
      setCheckOut(sunday.toISOString().split('T')[0]);
    } else if (type === 'next-weekend') {
      const friday = new Date(today);
      friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7) + 7);
      const sunday = new Date(friday);
      sunday.setDate(friday.getDate() + 2);
      setCheckIn(friday.toISOString().split('T')[0]);
      setCheckOut(sunday.toISOString().split('T')[0]);
    } else if (type === 'new-year') {
      setCheckIn('2026-12-30');
      setCheckOut('2027-01-02');
    }
    setIsDatePickerOpen(false);
  };

  return (
    <div className="w-[95%] max-w-5xl mx-auto px-2 relative z-30">
      <div className="bg-brand-dark rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 shadow-2xl border border-gold-main/50 relative">

        {/* ─── SECTION 1: DESTINATIONS ─────────────────────────────────────── */}
        <div className="flex-[1.4] px-5 py-2 md:border-r border-gold-main/20">
          <label className="block text-gold-main text-sm font-medium mb-1 font-sans">
            Destinations
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Goa, Alibaug, Lonavla, Karjat"
            className="w-full bg-transparent text-white text-base placeholder-white/50 outline-none font-sans"
          />
        </div>

        {/* ─── SECTION 2: DATES (INTERACTIVE POPUP & SELECT DATE) ─────────── */}
        <div 
          ref={datePickerRef}
          className="flex-[1.4] px-5 py-2 md:border-r border-gold-main/20 cursor-pointer group relative"
        >
          <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
            <label className="block text-gold-main text-sm font-medium mb-1 font-sans flex items-center justify-between cursor-pointer">
              <span>Dates</span>
              {nights > 0 && (
                <span className="text-[11px] text-gold-light font-normal uppercase tracking-wider">
                  {nights} Nights
                </span>
              )}
            </label>
            <div className="flex items-center gap-2 text-white group-hover:text-gold-light transition-colors">
              <svg className="w-4 h-4 text-gold-main flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-sm md:text-base font-medium truncate">
                {formattedDates}
              </span>
            </div>
          </div>

          {/* Luxury Dropdown Calendar Popover */}
          {isDatePickerOpen && (
            <div className="absolute top-full mt-3 left-0 sm:left-auto sm:right-0 md:left-1/2 md:-translate-x-1/2 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-brand-dark border border-gold-main/60 shadow-2xl z-50 backdrop-blur-2xl text-white">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-serif text-sm font-bold text-gold-light tracking-wide">
                  Select Stay Dates
                </span>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className="text-white/60 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              </div>

              {/* Dual Date Pickers */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold-main mb-1.5 font-sans">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white/10 border border-gold-main/30 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:border-gold-main outline-none [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold-main mb-1.5 font-sans">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white/10 border border-gold-main/30 text-white rounded-xl px-3 py-2 text-xs sm:text-sm focus:border-gold-main outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="border-t border-white/10 pt-3 mb-4">
                <span className="block text-[11px] text-white/50 uppercase tracking-wider font-semibold mb-2">
                  Quick Select
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreset('this-weekend')}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white/80 border border-white/10 transition-colors"
                  >
                    This Weekend
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset('next-weekend')}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white/80 border border-white/10 transition-colors"
                  >
                    Next Weekend
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset('new-year')}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-gold-light border border-gold-main/30 transition-colors"
                  >
                    New Year&apos;s Eve
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs text-white/70">
                  {nights > 0 ? `${nights} nights selected` : 'Select check-out date'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className="bg-gradient-to-r from-gold-light via-gold-main to-gold-dark text-black text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  Apply Dates
                </button>
              </div>

            </div>
          )}
        </div>

        {/* ─── SECTION 3: GUESTS (INTERACTIVE DROPDOWN) ───────────────────── */}
        <div 
          ref={guestsPickerRef}
          className="flex-1 px-5 py-2 cursor-pointer group relative"
        >
          <div onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
            <label className="block text-gold-main text-sm font-medium mb-1 font-sans cursor-pointer">
              Guests
            </label>
            <div className="flex items-center gap-2 text-white group-hover:text-gold-light transition-colors">
              <svg className="w-4 h-4 text-gold-main flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-base font-medium flex-1 truncate">
                {guests}
              </span>
            </div>
          </div>

          {/* Guests Selection Dropdown */}
          {isGuestsOpen && (
            <div className="absolute top-full mt-3 left-0 sm:left-auto sm:right-0 w-64 p-4 rounded-2xl bg-brand-dark border border-gold-main/60 shadow-2xl z-50 backdrop-blur-2xl text-white">
              <span className="font-serif text-sm font-bold text-gold-light block mb-3 border-b border-white/10 pb-2">
                Number of Guests
              </span>
              <div className="space-y-1">
                {[
                  { label: '2 Guests', desc: 'Couple / Romantic getaway' },
                  { label: '4 Guests', desc: 'Small family / Friends' },
                  { label: '6-8 Guests', desc: 'Full private villa' },
                  { label: '10-16 Guests', desc: 'Grand estate celebration' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setGuests(item.label);
                      setIsGuestsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-colors flex flex-col ${
                      guests === item.label
                        ? 'bg-gold-main/20 border border-gold-main/40 text-gold-light'
                        : 'hover:bg-white/5 text-white/80'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                    <span className="text-[10px] text-white/50">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── SEARCH BUTTON ──────────────────────────────────────────────── */}
        <div className="px-2 md:px-3 mt-3 md:mt-0">
          <Link
            href={`/villas?destination=${encodeURIComponent(destination || 'all')}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${encodeURIComponent(guests)}`}
            className="btn-primary w-full md:w-auto inline-flex items-center justify-center px-10 py-3.5 rounded-xl text-base md:text-lg font-bold shadow-lg text-center"
          >
            Search
          </Link>
        </div>

      </div>
    </div>
  );
}
