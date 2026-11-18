'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';

/**
 * Website Guest / Patron Booking Login (app/login/page.jsx)
 * Exclusively for website visitors reserving luxury villas, viewing itineraries & wishlist.
 */
export default function WebsiteLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // Quick fill helper for patron testing
  const handleAutoFill = () => {
    setEmail('guest@wandernestvillas.com');
    setPassword('patron2026');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const guestUser = {
        name: 'Arjun Mehta',
        email: email || 'guest@wandernestvillas.com',
        role: 'guest',
        type: 'Booking Patron',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        activeBookings: 2,
        wishlistCount: 4,
      };

      dispatch(setUser(guestUser));
      if (typeof window !== 'undefined') {
        localStorage.setItem('wandernest_auth', JSON.stringify(guestUser));
      }

      setLoading(false);
      setShowToast({
        title: 'Welcome Back, Patron!',
        message: 'Signed in successfully. Redirecting to your luxury villas sanctuary...',
      });

      setTimeout(() => {
        router.push('/villas');
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col justify-center items-center px-4 py-24 sm:py-28 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-main/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Success Toast */}
      {showToast && (
        <div className="fixed top-24 z-50 px-6 py-4 rounded-2xl bg-[#161a29] border border-gold-main/60 shadow-2xl flex items-center gap-3 animate-fade-in-up max-w-md">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <div>
            <h4 className="font-serif text-sm font-bold text-gold-light">{showToast.title}</h4>
            <p className="text-xs text-gray-300 font-sans mt-0.5">{showToast.message}</p>
          </div>
        </div>
      )}

      {/* ─── MAIN LOGIN CARD ─────────────────────────────────────────────── */}
      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Top Brand Header */}
        <div className="text-center space-y-1">
          <Link href="/" className="inline-block group mb-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-main tracking-widest uppercase block group-hover:brightness-110 transition-all">
              WANDERNEST VILLAS
            </span>
            <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-sans font-medium block mt-0.5">
              PRIVATE ESTATE RESERVATIONS
            </span>
          </Link>

          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            Patron &amp; Guest Sign In
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-400 font-light max-w-xs mx-auto leading-relaxed">
            Access your private pool villa reservations, bespoke master chef menus, and personalized itineraries.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#161a29] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 font-sans">
                Email Address or Mobile Number
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@wandernestvillas.com"
                className="w-full bg-[#1e2337] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-main/70 transition-all font-sans"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 font-sans">
                  Password / Access Key
                </label>
                <Link
                  href="#"
                  className="text-[11px] text-gold-light hover:underline font-sans"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1e2337] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-main/70 transition-all font-sans"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-sans">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-[#1e2337] border-white/20 text-gold-main focus:ring-0 cursor-pointer"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Signing In to Bookings...</span>
                </>
              ) : (
                <>
                  <span>Sign In &amp; Access Bookings</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>

            {/* Quick Demo Fill */}
            <div className="pt-2 text-center border-t border-white/5">
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-xs text-gold-light/80 hover:text-gold-light underline underline-offset-4 cursor-pointer font-sans"
              >
                ⚡ Auto-fill Guest Demo (guest@wandernestvillas.com)
              </button>
            </div>
          </form>

          {/* New Patron Link */}
          <div className="text-center pt-1 border-t border-white/5">
            <p className="text-xs text-gray-400 font-sans">
              Haven&apos;t reserved a villa yet?{' '}
              <Link href="/villas" className="text-gold-main font-semibold hover:underline">
                Explore Signature Villas &rarr;
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Separate Link to Dashboard Login */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500 font-sans">
            Are you a Super Admin, Estate Owner, or Staff Member?
          </p>
          <Link
            href="/user/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold-main/40 text-xs font-semibold text-gold-light hover:text-white transition-all shadow-md"
          >
            <span>🛡️</span>
            <span>Switch to Dashboard &amp; Management Login (/user/login) &rarr;</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
