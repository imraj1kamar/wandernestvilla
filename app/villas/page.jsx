import React from 'react';
import VillasDirectory from '@/components/sections/villas/VillasDirectory';

export const metadata = {
  title: "Our Luxury Villas & Private Pool Estates | Wandernest Villas",
  description:
    "Browse our handpicked collection of private pool villas with personal chefs and discrete butlers in Lonavla, Alibaug, Karjat, Goa, and Udaipur.",
  keywords: [
    "luxury private pool villas",
    "villas with chef in Lonavla",
    "Alibaug beachfront villa rental",
    "Karjat royal retreat",
    "Goa private estate pool",
    "Wandernest Villas portfolio",
  ],
  openGraph: {
    title: "Our Luxury Villas & Private Pool Estates | Wandernest Villas",
    description:
      "Handcrafted private estates, temperature-controlled pools, and 5-star hospitality across India's most coveted destinations.",
    url: "https://www.wandernestvillas.com/villas",
  },
};

const trustPillars = [
  { icon: '🏊‍♂️', title: '100% Private Pools', desc: 'No shared water amenities' },
  { icon: '👨‍🍳', title: 'Personal In-House Chef', desc: 'Custom farm-to-table menus' },
  { icon: '🛎️', title: 'Dedicated Butler Team', desc: '24/7 on-site hospitality' },
  { icon: '🔒', title: 'Uncompromised Seclusion', desc: 'Gated private compounds' },
];

export default function OurVillasPage() {
  return (
    <div className="bg-brand-light min-h-screen text-foreground pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* ─── PAGE HERO HEADER ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-main" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
              The Private Sanctuary Collection
            </span>
            <span className="w-8 h-[1px] bg-gold-main" />
          </div>

          <h1 className="heading-xl text-foreground tracking-tight mb-4">
            Our Signature <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-gold-dark">
              Private Villas
            </span> &amp; Estates
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Handcrafted architectural mansions, temperature-controlled pools, and 5-star personalized hospitality across Maharashtra and India&apos;s most coveted landscapes.
          </p>

          {/* 4 Trust Highlights Strip */}
          <h2 className="sr-only">Our Core Highlights and Villa Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-black/5 text-left">
            {trustPillars.map((p) => (
              <div key={p.title} className="p-3.5 rounded-2xl bg-white border border-border-luxury shadow-2xs">
                <div className="text-xl mb-1">{p.icon}</div>
                <h3 className="font-serif text-sm font-bold text-foreground">{p.title}</h3>
                <p className="font-sans text-xs text-muted font-light mt-0.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── INTERACTIVE VILLAS DIRECTORY (CLIENT COMPONENT) ──────────────── */}
        <VillasDirectory />

      </div>
    </div>
  );
}
