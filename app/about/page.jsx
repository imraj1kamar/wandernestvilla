import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const metadata = {
  title: 'About Us | Wandernest Villas — Redefining Private Luxury',
  description:
    'Learn about Wandernest Villas: handcrafted private pool estates, dedicated in-house master chefs, and uncompromised privacy across Maharashtra and India.',
  openGraph: {
    title: 'About Us | Wandernest Villas',
    description:
      'Discover our heritage, philosophy, and unwavering commitment to bespoke 5-star private villa hospitality.',
    url: 'https://www.wandernestvillas.com/about',
  },
};

const brandValues = [
  {
    id: 1,
    title: 'Curated Estates',
    description:
      'We reject 94% of properties evaluated. Every villa in our portfolio meets rigorous architectural standards, expansive private land parcels, and immaculate climate-controlled pools.',
    icon: (
      <svg className="w-6 h-6 text-gold-main" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Bespoke Hospitality',
    description:
      'Every stay includes a dedicated in-house culinary chef crafting bespoke farm-to-table coastal and royal menus, paired with intuitive butlers who anticipate every nuance of your stay.',
    icon: (
      <svg className="w-6 h-6 text-gold-main" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Utmost Privacy',
    description:
      'Gated compounds, private shorelines, unlisted mountain ridges, and strict confidentiality protocols guarantee absolute seclusion for family celebrations and private high-profile gatherings.',
    icon: (
      <svg className="w-6 h-6 text-gold-main" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

const milestones = [
  { value: '50+', label: 'Handcrafted Private Estates' },
  { value: '100%', label: 'Private Temperature-Controlled Pools' },
  { value: '5★', label: 'Dedicated In-House Culinary Masters' },
  { value: '4.98', label: 'Patron Satisfaction Rating' },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-brand-light text-foreground pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── 1. 50/50 HERO SPLIT LAYOUT ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 md:mb-32">
          
          {/* Left Column: Tall Elegant Villa Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/5 group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Wandernest Luxury Architecture"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* Inner ambient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-border-luxury shadow-lg">
                <p className="font-sans text-sm font-semibold text-foreground">
                  The Wandernest Benchmark
                </p>
                <p className="font-sans text-xs text-gray-600 mt-0.5">
                  Private Gated Compounds &bull; Zero Shared Amenities
                </p>
              </div>
            </div>

            {/* Decorative Gold Corner Accents */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-main/40 rounded-tl-3xl -z-10" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-main/40 rounded-br-3xl -z-10" />
          </div>

          {/* Right Column: Editorial Serif Heading & Brand Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Category Subtitle */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Our Heritage &amp; Philosophy
              </span>
            </div>

            {/* Serif Heading */}
            <h1 className="heading-xl text-foreground tracking-tight mb-6">
              Redefining <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-gold-dark">
                Private Luxury
              </span> in India
            </h1>

            {/* 2-Paragraph Brand Story */}
            <div className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed font-light space-y-5">
              <p>
                Wandernest Villas was founded on a singular conviction: genuine luxury cannot exist without absolute privacy. In a hospitality landscape cluttered by shared hotel lobbies, packed swimming pools, and standardized resort buffets, we established a collection where the entire estate—every lawn, heated pool, courtyard, and view—belongs solely to you and your companions.
              </p>
              <p>
                From the misty cloudlines of Tiger Point in Lonavla to the serene, sun-bleached shores of Awas Beach in Alibaug, our handpicked private estates combine architectural grandeur with deeply personalized, five-star hospitality. Serviced by master chefs crafting bespoke menus from locally sourced ingredients and discreet butlers who anticipate every wish, Wandernest is your quintessential private sanctuary.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-8 mt-4">
              <Link
                href="/villas"
                className="btn-primary text-sm px-7 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
              >
                Explore Curated Villas
              </Link>
              <Link
                href="/contact"
                className="btn-outline text-sm px-6 py-3.5 rounded-xl font-semibold hover:border-gold-dark transition-all"
              >
                Speak with a Curator
              </Link>
            </div>

          </div>

        </div>

        {/* ─── 2. MILESTONE NUMBERS STRIP ───────────────────────────────────── */}
        <RevealOnScroll yOffset={30} duration={1000}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-12 rounded-3xl bg-brand-cream-warm border border-border-luxury shadow-sm mb-24 md:mb-32">
            {milestones.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  {m.value}
                </p>
                <p className="font-sans text-xs sm:text-sm text-gray-700 uppercase tracking-wider mt-2 font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* ─── 3. THREE-COLUMN CORE VALUES ──────────────────────────────────── */}
        <RevealOnScroll yOffset={30} duration={1000}>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-2">
              The Three Pillars
            </span>
            <h2 className="heading-lg text-foreground tracking-tight">
              Values That Define Every Stay
            </h2>
            <p className="text-gray-700 text-sm font-light mt-2">
              Our uncompromising benchmarks ensure that every Wandernest reservation exceeds the standards of traditional five-star luxury hotels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandValues.map((val) => (
              <div
                key={val.id}
                className="p-8 rounded-3xl bg-white border border-border-luxury shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
              >
                {/* Top Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-brand-cream-warm border border-border-luxury flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-main transition-transform">
                  {val.icon}
                </div>

                <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-gold-dark transition-colors">
                  {val.title}
                </h3>

                <p className="font-sans text-sm text-gray-700 leading-relaxed font-light">
                  {val.description}
                </p>

                {/* Bottom Gold Line Accent on Hover */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-gold-light via-gold-main to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
