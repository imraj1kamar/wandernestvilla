'use client';

import React from 'react';

/**
 * AdminFooter Component
 * Sleek bottom footer for the LuxeEstate Admin Dashboard.
 */
export default function AdminFooter() {
  return (
    <footer className="w-full bg-[#0f121d] border-t border-white/5 py-4 px-6 text-xs text-gray-500 font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>
        © 2026 <span className="text-gold-main font-serif font-bold">LUXEESTATE</span> Admin System. All rights reserved.
      </p>

      <div className="flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-400 font-medium">Platform 100% Operational</span>
        </div>
        <span className="text-white/20">|</span>
        <span className="text-gray-400">v2.4.0-Enterprise</span>
      </div>
    </footer>
  );
}
