import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const destinations = [
  {
    name: 'Goa',
    tagline: 'Beachfront Stays',
    count: '64 Villas',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/goa',
  },
  {
    name: 'Alibaug',
    tagline: 'Coastal Mansions',
    count: '38 Villas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/alibaug',
  },
  {
    name: 'Lonavla',
    tagline: 'Cloud-Kissed Pools',
    count: '52 Villas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/lonavla',
  },
  {
    name: 'Udaipur',
    tagline: 'Regal Palaces',
    count: '16 Estates',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/udaipur',
  },
  {
    name: 'Karjat',
    tagline: 'Riverside Retreats',
    count: '28 Villas',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/karjat',
  },
  {
    name: 'Kasauli',
    tagline: 'Himalayan Heights',
    count: '18 Estates',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/kasauli',
  },
  {
    name: 'Pawna',
    tagline: 'Lakeside Bliss',
    count: '17 Villas',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    href: '/destinations/pawna',
  },
];

const popularHolidayHomeTags = [
  { title: 'Luxury Villas in Lonavla', count: '52 Stays', href: '/destinations/lonavla' },
  { title: 'Beachfront Homes in Alibaug', count: '38 Stays', href: '/destinations/alibaug' },
  { title: 'Private Pool Villas in Goa', count: '64 Stays', href: '/destinations/goa' },
  { title: 'Heritage Palaces in Udaipur', count: '16 Stays', href: '/destinations/udaipur' },
  { title: 'Lakeside Villas in Karjat', count: '28 Stays', href: '/destinations/karjat' },
  { title: 'Hilltop Estates in Kasauli', count: '18 Stays', href: '/destinations/kasauli' },
  { title: 'Weekend Stays in Khandala', count: '24 Stays', href: '/destinations/khandala' },
  { title: 'Private Chef Villas in Pawna', count: '17 Stays', href: '/destinations/pawna' },
  { title: 'Vineyard Estates in Igatpuri', count: '15 Stays', href: '/destinations/igatpuri' },
  { title: 'Orchard Mansions in Mahabaleshwar', count: '19 Stays', href: '/destinations/mahabaleshwar' },
  { title: 'Celebration Compounds in Mumbai', count: '32 Stays', href: '/destinations/mumbai' },
  { title: 'Backwater Sanctuaries in Kerala', count: '9 Stays', href: '/destinations/kerala' },
];

export default function FeaturedDestinations() {
  return (
    <section className="w-full bg-brand-light py-16 md:py-24 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── SECTION HEADER WITH LUXURY TAG ──────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Top Getaways &bull; Holiday Homes in India
              </span>
            </div>
            <h2 className="heading-lg text-[#171717] tracking-tight">
              Popular Destinations to Rent a Holiday Home in India
            </h2>
            <p className="text-gray-700 text-sm md:text-base font-light mt-1.5 max-w-3xl leading-relaxed">
              Curated private estates, heated infinity pools, and discrete in-house chefs across India&apos;s most breathtaking weekend escapes.
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors flex-shrink-0"
          >
            <span>Explore All 200+ Estates</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* ─── SCROLLABLE HORIZONTAL DESTINATION PILL CARDS ─────────────────── */}
        <div className="flex overflow-x-auto gap-4 md:gap-5 pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              href={dest.href}
              className="group relative flex-none w-[200px] sm:w-[240px] md:w-[270px] h-[100px] md:h-[115px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 snap-start block border border-black/5"
            >
              <Image
                src={dest.image}
                alt={`${dest.name} Holiday Home Rentals`}
                fill
                sizes="(max-width: 768px) 200px, 270px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300" />

              {/* Card Text Information */}
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                <span className="text-[10px] md:text-xs text-gold-light uppercase tracking-wider font-semibold">
                  {dest.tagline}
                </span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <h3 className="font-serif text-white text-lg md:text-xl font-bold tracking-wide group-hover:text-gold-light transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-[10px] md:text-[11px] text-white/80 font-sans">
                    {dest.count}
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Gold Accent Line */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-main to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* ─── OPTION 2: CLICKABLE SEO QUICK-LINKS TAG CLOUD ──────────────── */}
        <div className="pt-12 mt-12 border-t border-black/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-1">
                Explore by Region &bull; Holiday Homes &amp; Private Villas
              </span>
              <p className="text-xs text-gray-600 font-light">
                Direct links to handpicked luxury villas with private pools and gourmet culinary service.
              </p>
            </div>
            <span className="text-xs text-gray-500 font-medium hidden md:inline-block">
              200+ Verified Private Properties
            </span>
          </div>

          {/* Interactive Tag Chips */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {popularHolidayHomeTags.map((tag) => (
              <Link
                key={tag.title}
                href={tag.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#ede1ce] hover:border-gold-main hover:bg-[#fbf7f0] text-xs sm:text-sm text-[#171717] hover:text-gold-dark transition-all duration-200 shadow-2xs group"
              >
                {/* Location Icon */}
                <svg
                  className="w-3.5 h-3.5 text-gold-main group-hover:scale-110 transition-transform flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <span className="font-medium">{tag.title}</span>

                {/* Stays Count Badge */}
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 group-hover:bg-gold-main/15 text-gray-600 group-hover:text-gold-dark font-semibold transition-colors">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
