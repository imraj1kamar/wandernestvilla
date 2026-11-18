'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '@/redux/slices/authSlice';

/**
 * AdminHeader Component
 * Top bar matching the exact LuxeEstate Super Admin mockup with integrated auth controls.
 */
export default function AdminHeader({ onToggleSidebar }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wandernest_auth');
    }
    router.push('/user/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#12151e]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
      {/* LEFT: Mobile toggle & Welcome message */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}

        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>Welcome,</span>
            <span className="text-gold-main font-serif">
              {user?.adminRole || user?.name || 'Super Admin'}
            </span>
          </h2>
        </div>
      </div>

      {/* RIGHT: Global Search & Action Icons */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Global Search"
            className="w-full bg-[#1e2337] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-main/60 transition-all font-sans"
          />
        </div>

        {/* Portal / Return to Public Website */}
        <Link
          href="/"
          title="Return to Public Website"
          className="p-2.5 rounded-xl bg-[#1e2337] border border-white/10 text-gray-300 hover:text-gold-light hover:border-gold-main/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <span className="hidden xl:inline text-gray-400">Public Site</span>
        </Link>

        {/* Notification Bell with red pulse dot */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2.5 rounded-xl bg-[#1e2337] border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#1e2337]" />
        </button>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-gold-main/60 shadow-md group-hover:border-gold-main transition-colors">
              <Image
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                }
                alt="Super Admin Avatar"
                fill
                className="object-cover"
              />
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#161a29] border border-gold-main/40 shadow-2xl py-2 z-50 text-xs font-sans animate-fade-in-up">
              <div className="px-4 py-2 border-b border-white/5">
                <p className="font-semibold text-white truncate">{user?.name || 'Super Admin'}</p>
                <p className="text-[11px] text-gray-400 truncate">{user?.email || 'admin@luxeestate.com'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-gold-main/20 text-gold-light text-[10px] font-bold uppercase">
                  {user?.adminRole || 'Executive Admin'}
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/admin"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 transition-colors"
                >
                  <span>📊</span>
                  <span>Dashboard Overview</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gold-light hover:bg-white/5 transition-colors"
                >
                  <span>🔄</span>
                  <span>Switch Role / Portal</span>
                </Link>
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
                  <span>Sign Out of Admin</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
