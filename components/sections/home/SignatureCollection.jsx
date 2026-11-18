import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const signatureVillas = [
  {
    id: 1,
    title: 'The Cloud Retreat, Lonavla',
    specs: '5 BHK • Infinity Pool • Dedicated Chef',
    location: 'Tiger Point, Lonavla',
    price: '₹55,000',
    period: '/night',
    rating: '5.0',
    reviews: '48 reviews',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    tag: 'Cliffside Infinity Pool',
    href: '/villas/the-cloud-retreat-lonavla',
  },
  {
    id: 2,
    title: 'Oceanic Whisper, Alibaug',
    specs: '4 BHK • Beachfront • Private Jacuzzi',
    location: 'Awas Beach, Alibaug',
    price: '₹42,000',
    period: '/night',
    rating: '4.9',
    reviews: '62 reviews',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
    tag: 'Direct Beach Access',
    href: '/villas/oceanic-whisper-alibaug',
  },
  {
    id: 3,
    title: 'Heritage Estate, Karjat',
    specs: '6 BHK • Palace Architecture • Private Lake',
    location: 'Foothills, Karjat',
    price: '₹68,000',
    period: '/night',
    rating: '5.0',
    reviews: '39 reviews',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    tag: 'Royal Heritage Grounds',
    href: '/villas/heritage-estate-karjat',
  },
];

export default function SignatureCollection() {
  return (
    <section className="w-full bg-brand-light py-12 md:py-16 lg:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Property Spotlight
              </span>
            </div>
            <h2 className="heading-lg text-foreground tracking-tight">
              Wandernest Signature Collection
            </h2>
            <p className="text-gray-700 text-sm md:text-base mt-1 font-light">
              Most booked luxury villas in Maharashtra
            </p>
          </div>

          <Link
            href="/villas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors"
          >
            <span>View All Maharashtra Estates</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* 3 Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureVillas.map((villa) => (
            <div
              key={villa.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative border border-black/5"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md border border-white/10">
                    {villa.tag}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-black text-xs font-bold shadow-md">
                  <span className="text-gold-main">★</span>
                  <span>{villa.rating}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between pb-8">
                <div>
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-1 font-medium">
                    {villa.location}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-gold-dark transition-colors">
                    {villa.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-sans mt-2.5 flex items-center gap-1.5 font-medium">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-main" />
                    {villa.specs}
                  </p>
                </div>

                {/* Bottom Row: Price & CTA */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                  <div>
                    <span className="text-lg md:text-xl font-bold text-foreground">
                      {villa.price}
                    </span>
                    <span className="text-xs text-gray-500 font-normal ml-0.5">
                      {villa.period}
                    </span>
                  </div>

                  <Link
                    href={villa.href}
                    className="text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors font-sans underline underline-offset-4 flex items-center gap-1 group/btn"
                  >
                    <span>Explore Villa</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* CRITICAL: 4px High Gold Gradient Border at very bottom edge */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-gold-light via-gold-main to-gold-dark" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
