import React from 'react';
import Hero from '@/components/sections/home/Hero';
import BrandStory from '@/components/sections/home/BrandStory';
import FeaturedDestinations from '@/components/sections/home/FeaturedDestinations';
import BrowseByVibe from '@/components/sections/home/BrowseByVibe';
import SignatureCollection from '@/components/sections/home/SignatureCollection';
import ConciergeServices from '@/components/sections/home/ConciergeServices';
import TravelJournal from '@/components/sections/home/TravelJournal';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import InnerCircleCTA from '@/components/sections/home/InnerCircleCTA';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

// ─── COMPREHENSIVE SEO METADATA ────────────────────────────────────────────────
export const metadata = {
  title: "Wandernest Villas: Premium Private Pool Villas in Mumbai & Lonavla",
  description:
    "Discover Maharashtra's finest luxury private pool villas in Lonavla, Alibaug beachfront estates, and Karjat royal retreats with in-house private chefs and 5-star concierge hospitality.",
  keywords: [
    "Wandernest Villas",
    "luxury private pool villas in Lonavla",
    "Alibaug beachfront estates",
    "in-house chefs",
    "weekend getaways near Mumbai",
    "luxury villa rentals Maharashtra",
    "private villas Karjat",
    "Lonavla luxury stays"
  ],
  openGraph: {
    title: "Wandernest Villas | Luxury Private Pool Villas in Mumbai, Lonavla & Alibaug",
    description:
      "Curated private estates, temperature-controlled pools, dedicated in-house chefs, and bespoke 5-star concierge hospitality.",
    type: "website",
    locale: "en_IN",
    siteName: "Wandernest Villas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wandernest Villas | Premium Private Pool Villas in Mumbai & Lonavla",
    description:
      "Luxury private pool villas in Lonavla, beachfront estates in Alibaug, and weekend getaways near Mumbai.",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-brand-light text-[#171717] overflow-hidden">

      {/* 1. Hero Section (with Embedded Glassmorphic Search - loads smoothly at top) */}
      <Hero />

      {/* 2. The Wandernest Story (Brand Philosophy & SEO Keyword Block) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <BrandStory />
      </RevealOnScroll>

      {/* 3. Popular Destinations to Rent a Holiday Home in India (Cards + SEO Tag Cloud) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <FeaturedDestinations />
      </RevealOnScroll>

      {/* 4. Browse by Vibe (Curated Collections Carousel) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <BrowseByVibe />
      </RevealOnScroll>

      {/* 4. Wandernest Signature Collection (Property Spotlight) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <SignatureCollection />
      </RevealOnScroll>

      {/* 5. Signature Concierge Services (Interactive Layout) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <ConciergeServices />
      </RevealOnScroll>

      {/* 6. The Travel Journal (Editorial / SEO Articles - The Luxe Digest) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <TravelJournal />
      </RevealOnScroll>

      {/* 7. Testimonials & Trust (Press & Verified Patron Reviews) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <TestimonialsSection />
      </RevealOnScroll>

      {/* 8. Inner Circle (Lead Generation / Exclusive Membership CTA) */}
      <RevealOnScroll yOffset={30} duration={1200}>
        <InnerCircleCTA />
      </RevealOnScroll>

    </div>
  );
}
