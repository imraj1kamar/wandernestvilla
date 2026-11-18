'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";
import FloatingActions from "@/components/ui/FloatingActions";

/**
 * PublicLayoutWrapper
 * Conditionally renders public Header, Footer, and FloatingActions
 * ONLY when on consumer public website pages.
 * Excludes admin, dashboard, and login routes.
 */
export default function PublicLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide public navigation, footer, and floating buttons on admin, dashboard, and auth pages
  const isExcluded =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/user') ||
    pathname === '/login';

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
