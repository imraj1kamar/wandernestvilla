'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
  setUser,
} from '@/redux/slices/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Restore session from localStorage if present
  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      const stored = localStorage.getItem('wandernest_auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          dispatch(setUser(parsed));
        } catch {
          // ignore corrupted data
        }
      }
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wandernest_auth');
    }
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand-dark/80 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl font-bold text-gold-main tracking-widest uppercase flex items-center gap-2"
        >
          <span>WANDERNEST</span>
          <span className="hidden sm:inline-block text-[10px] tracking-widest text-white/50 border-l border-white/20 pl-2 font-sans font-medium">
            VILLAS
          </span>
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

        {/* RIGHT: Auth + Book Now */}
        <div className="flex gap-4 sm:gap-5 items-center">
          {isAuthenticated && user ? (
            /* ─── AUTHENTICATED USER MENU ────────────────────────────── */
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 hover:border-gold-main/50 transition-all cursor-pointer group"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold-main/60 flex-shrink-0">
                  <Image
                    src={
                      user.avatar ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={user.name || 'User'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white group-hover:text-gold-light transition-colors line-clamp-1 max-w-[100px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gold-main leading-none">
                    {user.role === 'admin' ? 'Admin' : 'Patron'}
                  </span>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#161a29] border border-gold-main/40 shadow-2xl py-2 z-50 text-xs font-sans animate-fade-in-up">
                  <div className="px-4 py-2 border-b border-white/5">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-gold-main/20 text-gold-light text-[10px] font-bold uppercase">
                      {user.type || user.role}
                    </span>
                  </div>

                  {/* Role Specific Navigation */}
                  <div className="py-1">
                    {user.role === 'admin' ? (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gold-light hover:bg-white/5 font-semibold transition-colors"
                      >
                        <span>🛡️</span>
                        <span>Open Admin Dashboard</span>
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/villas"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 transition-colors"
                        >
                          <span>🏨</span>
                          <span>My Villa Reservations</span>
                        </Link>
                        <Link
                          href="/villas"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 transition-colors"
                        >
                          <span>⭐</span>
                          <span>Saved Wishlist</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ─── UNAUTHENTICATED LOGIN BUTTON ───────────────────────── */
            <Link
              href="/login"
              className="hidden md:inline-block text-sm text-white/80 hover:text-gold-main transition-colors font-medium"
            >
              Login
            </Link>
          )}

          {/* Book Now Button */}
          <Link
            href="/villas"
            className="btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg font-semibold flex items-center justify-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
