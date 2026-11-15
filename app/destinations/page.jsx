import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Explore Luxury Villas by Destination | Wandernest Villas",
  description: "Browse our handpicked collection of private pool villas in Lonavla, Alibaug, Karjat, Goa, and Indore.",
};

// SEO Links Data
const locations = [
  { name: 'Lonavla', count: '12 Villas', link: '/villas?location=lonavla' },
  { name: 'Alibaug', count: '8 Villas', link: '/villas?location=alibaug' },
  { name: 'Karjat', count: '5 Villas', link: '/villas?location=karjat' },
  { name: 'Khandala', count: '6 Villas', link: '/villas?location=khandala' },
  { name: 'Goa', count: '15 Villas', link: '/villas?location=goa' },
  { name: 'Indore', count: '4 Villas', link: '/villas?location=indore' },
];

const categories = [
  { name: 'Beachfront Estates', link: '/villas?category=beachfront' },
  { name: 'Mountain Retreats', link: '/villas?category=mountain' },
  { name: 'Heritage & Palaces', link: '/villas?category=heritage' },
  { name: 'Villas with Private Chef', link: '/villas?category=chef' },
  { name: 'Pet-Friendly Homes', link: '/villas?category=pet-friendly' },
  { name: 'Large Event Villas', link: '/villas?category=events' },
];

export default function DestinationsHub() {
  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-main" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Explore Destinations
            </span>
            <span className="w-8 h-[1px] bg-gold-main" />
          </div>
          <h1 className="heading-xl text-foreground mb-4">Discover Your Next Escape</h1>
          <p className="text-muted font-light leading-relaxed">
            Explore our curated selection of premium private estates across India&apos;s most coveted weekend getaways.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Locations Grid (Left Side - 8 cols) */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-2xl text-foreground mb-6 border-b border-gray-200 pb-4">
              Browse by Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc, i) => (
                <Link 
                  key={i} 
                  href={loc.link}
                  className="group flex items-center justify-between p-5 bg-white border border-[#ede1ce] rounded-xl hover:shadow-md hover:border-gold-main transition-all duration-200"
                >
                  <span className="font-sans font-semibold text-lg text-foreground group-hover:text-gold-dark transition-colors">
                    Villas in {loc.name}
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-50 border border-gray-100 group-hover:border-gold-main/30 group-hover:bg-gold-main/10 group-hover:text-gold-dark px-3 py-1 rounded-full font-medium transition-colors">
                    {loc.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Sidebar (Right Side - 4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ede1ce] sticky top-32">
              <h2 className="font-serif text-xl text-foreground mb-6 pb-3 border-b border-gray-100">
                Curated Collections
              </h2>
              <ul className="space-y-4">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <Link 
                      href={cat.link}
                      className="group flex items-center text-gray-700 hover:text-gold-dark transition-colors font-medium text-sm"
                    >
                      <span className="text-gold-main mr-3 group-hover:translate-x-1 transition-transform">→</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="font-sans font-bold text-xs text-foreground mb-2 uppercase tracking-wider">
                  Need Assistance?
                </h3>
                <p className="text-sm text-muted mb-4 font-light leading-relaxed">
                  Our private concierge team is available 24/7 to help you reserve the perfect estate.
                </p>
                <Link href="/contact" className="text-gold-main text-sm font-semibold hover:underline inline-flex items-center gap-1">
                  <span>Contact Concierge</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
