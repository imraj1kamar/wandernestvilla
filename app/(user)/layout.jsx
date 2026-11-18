'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/layout/Sidebar';
import AdminHeader from '@/components/dashboard/layout/Header';
import AdminFooter from '@/components/dashboard/layout/Footer';

/**
 * Admin Root Layout (app/(admin)/layout.jsx)
 * Provides Sidebar, Header, Content Area, and Footer for admin pages.
 * Excludes Sidebar, Header, and Footer when on login routes (e.g. /admin/login).
 */
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on admin login page, render clean full-screen page WITHOUT sidebar, header, or footer
  const isLoginPage = pathname?.includes('/login');

  if (isLoginPage) {
    return <main className="min-h-screen bg-[#0f121d]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#0f121d] text-white flex">
      {/* ─── SIDEBAR ──────────────────────────────────────────────────────── */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* ─── MAIN CONTENT WRAPPER ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
