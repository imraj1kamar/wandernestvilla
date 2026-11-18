import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const destinations = [
  { name: 'Goa', tagline: 'Beachfront Stays', count: '64 Villas', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', href: '/destinations/goa' },
  { name: 'Alibaug', tagline: 'Coastal Mansions', count: '38 Villas', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', href: '/destinations/alibaug' },
  { name: 'Lonavla', tagline: 'Cloud-Kissed Pools', count: '52 Villas', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', href: '/destinations/lonavla' },
  { name: 'Udaipur', tagline: 'Regal Palaces', count: '16 Estates', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80', href: '/destinations/udaipur' },
  { name: 'Karjat', tagline: 'Riverside Retreats', count: '28 Villas', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80', href: '/destinations/karjat' },
  { name: 'Kasauli', tagline: 'Himalayan Heights', count: '18 Estates', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', href: '/destinations/kasauli' },
  { name: 'Pawna', tagline: 'Lakeside Bliss', count: '17 Villas', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80', href: '/destinations/pawna' },
];

export default function FeaturedDestinations() {
  // Duplicated array for seamless non-stop loop
  const duplicatedDestinations = [...destinations, ...destinations];

  return (
    <section className="w-full bg-brand-light py-12 md:py-16 lg:py-20 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Top Getaways &bull; Holiday Homes in India
              </span>
            </div>
            <h2 className="heading-lg text-foreground tracking-tight">
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

        {/* Outer container with 'group' class to pause animation on hover */}
        <div className="relative w-full overflow-hidden pb-4 group">
          
          {/* Moving track pauses entirely when hovered */}
          <div className="flex gap-4 md:gap-5 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {duplicatedDestinations.map((dest, index) => (
              <Link
                key={`${dest.name}-${index}`}
                href={dest.href}
                className="relative flex-none w-[200px] sm:w-[240px] md:w-[270px] h-[100px] md:h-[115px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block border border-black/5 group/card"
              >
                <Image
                  src={dest.image}
                  alt={`${dest.name} Holiday Home Rentals`}
                  fill
                  sizes="(max-width: 768px) 200px, 270px"
                  className="object-cover object-center group-hover/card:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover/card:from-black/90 transition-all duration-300" />

                <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                  <span className="text-[10px] md:text-xs text-gold-light uppercase tracking-wider font-semibold">
                    {dest.tagline}
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <h3 className="font-serif text-white text-lg md:text-xl font-bold tracking-wide group-hover/card:text-gold-light transition-colors">
                      {dest.name}
                    </h3>
                    <span className="text-[10px] md:text-[11px] text-white/80 font-sans">
                      {dest.count}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-main to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}