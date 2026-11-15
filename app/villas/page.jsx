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
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <path d="M2 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <path d="M2 7c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
      </svg>
    ),
    title: '100% Private Pools',
    desc: 'No shared water amenities',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),
    title: 'Personal In-House Chef',
    desc: 'Custom farm-to-table menus',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4V2" />
        <path d="M10 4h4" />
        <path d="M4 15c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
        <path d="M2 19h20" />
      </svg>
    ),
    title: 'Dedicated Butler Team',
    desc: '24/7 on-site hospitality',
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Uncompromised Seclusion',
    desc: 'Gated private compounds',
  },
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
              <div
                key={p.title}
                className="group p-4 rounded-2xl bg-white border border-border-luxury shadow-2xs hover:border-gold-main/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-main/10 border border-gold-main/20 flex items-center justify-center text-gold-dark mb-3 group-hover:bg-gold-main group-hover:text-black group-hover:border-gold-main transition-all duration-300">
                  {p.icon}
                </div>
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
