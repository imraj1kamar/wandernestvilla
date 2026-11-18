'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";
import FloatingActions from "@/components/ui/FloatingActions";

/**
 * PublicLayoutContent
 * Internal component that consumes `usePathname()`.
 * Must be wrapped in `<Suspense>` to satisfy Next.js 16+ Turbopack / Partial Prerendering rules.
 */
function PublicLayoutContent({ children }) {
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

/**
 * PublicLayoutWrapper
 * Root layout wrapper that provides a `<Suspense>` boundary around client-side navigation hooks.
 */
export default function PublicLayoutWrapper({ children }) {
  return (
    <Suspense fallback={<main className="flex-grow">{children}</main>}>
      <PublicLayoutContent>
        {children}
      </PublicLayoutContent>
    </Suspense>
  );
}
