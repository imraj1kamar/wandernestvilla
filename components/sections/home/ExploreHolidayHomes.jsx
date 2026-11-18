import React from 'react';
import Link from 'next/link';

export const popularHolidayHomeTags = [
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

/**
 * ExploreHolidayHomes Component
 * Animated Marquee Tag Cloud for regional holiday homes & private villa search shortcuts.
 * Positioned on the homepage right above BrandStory.
 */
export default function ExploreHolidayHomes() {
  return (
    <section className="w-full bg-brand-light py-6 sm:py-8 md:py-9 border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-5 h-[1px] bg-gold-main" />
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block">
                Explore by Region &bull; Holiday Homes &amp; Private Villas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              Direct links to handpicked luxury villas with private pools and gourmet culinary service.
            </p>
          </div>
          <span className="text-xs text-gray-500 font-medium hidden md:inline-block flex-shrink-0">
            200+ Verified Private Properties
          </span>
        </div>

        {/* ─── ANIMATED TAG CLOUD (Marquee) ─── */}
        <div className="relative w-full overflow-hidden pb-2 group/tags">
          
          {/* Subtle gradient fades on edges for luxury presentation */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

          {/* Marquee Track: slides at 45s, pauses on hover */}
          <div className="flex gap-2.5 sm:gap-3 w-max animate-marquee [animation-duration:45s] group-hover/tags:[animation-play-state:paused]">
            
            {/* Duplicated array for seamless infinite looping */}
            {[...popularHolidayHomeTags, ...popularHolidayHomeTags].map((tag, index) => (
              <Link
                key={`${tag.title}-${index}`}
                href={tag.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-border-luxury hover:border-gold-main hover:bg-brand-cream text-xs sm:text-sm text-foreground hover:text-gold-dark transition-all duration-200 shadow-2xs group flex-shrink-0"
              >
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
                
                <span className="font-medium whitespace-nowrap">{tag.title}</span>
                
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
