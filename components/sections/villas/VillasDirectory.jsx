'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const allVillas = [
  {
    id: 1,
    title: 'The Glasshouse, Goa',
    location: 'Candolim, North Goa',
    destination: 'Goa',
    bedrooms: 5,
    maxGuests: 12,
    specs: '5 BHK • Private Pool • Dedicated Chef • Caretaker',
    priceNumeric: 45000,
    price: '₹45,000',
    period: '/night',
    rating: '4.95',
    reviewsCount: 48,
    tag: 'Beachfront & Chef',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Casa de Sol, Alibaug',
    location: 'Awas Beach, Alibaug',
    destination: 'Alibaug',
    bedrooms: 4,
    maxGuests: 10,
    specs: '4 BHK • Beachfront • Private Jacuzzi • Butler Team',
    priceNumeric: 38000,
    price: '₹38,000',
    period: '/night',
    rating: '4.92',
    reviewsCount: 36,
    tag: 'Direct Beach Access',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'The Cloud Retreat, Lonavla',
    location: 'Tiger Point, Lonavla',
    destination: 'Lonavla',
    bedrooms: 5,
    maxGuests: 14,
    specs: '5 BHK • Heated Infinity Pool • In-House Chef',
    priceNumeric: 55000,
    price: '₹55,000',
    period: '/night',
    rating: '5.0',
    reviewsCount: 52,
    tag: 'Cliffside Infinity Pool',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Marigold Estate, Udaipur',
    location: 'Lake Pichola, Udaipur',
    destination: 'Udaipur',
    bedrooms: 6,
    maxGuests: 16,
    specs: '6 BHK • Lake View • Palace Courtyards • Butler',
    priceNumeric: 68000,
    price: '₹68,000',
    period: '/night',
    rating: '4.98',
    reviewsCount: 41,
    tag: 'Royal Heritage Grounds',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Heritage Estate, Karjat',
    location: 'Foothills, Karjat',
    destination: 'Karjat',
    bedrooms: 6,
    maxGuests: 15,
    specs: '6 BHK • Private Lake • Volcanic Rock Architecture',
    priceNumeric: 62000,
    price: '₹62,000',
    period: '/night',
    rating: '4.94',
    reviewsCount: 39,
    tag: '10-Acre Private Compound',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Highland Retreat, Kasauli',
    location: 'Upper Mall, Kasauli',
    destination: 'Kasauli',
    bedrooms: 3,
    maxGuests: 8,
    specs: '3 BHK • Mountain Ridge View • Stone Fireplace',
    priceNumeric: 32000,
    price: '₹32,000',
    period: '/night',
    rating: '4.89',
    reviewsCount: 28,
    tag: 'Himalayan Sanctuary',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Azure Whisper, Goa',
    location: 'Anjuna, North Goa',
    destination: 'Goa',
    bedrooms: 4,
    maxGuests: 10,
    specs: '4 BHK • Private Pool • Sunset Terrace • Mixologist',
    priceNumeric: 48000,
    price: '₹48,000',
    period: '/night',
    rating: '4.91',
    reviewsCount: 34,
    tag: 'Tropical Seclusion',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Pawna Cliffside Villa',
    location: 'Pawna Lake, Lonavla',
    destination: 'Lonavla',
    bedrooms: 4,
    maxGuests: 12,
    specs: '4 BHK • Lakefront Infinity Pool • BBQ Lawn',
    priceNumeric: 42000,
    price: '₹42,000',
    period: '/night',
    rating: '4.96',
    reviewsCount: 45,
    tag: 'Lakeside Sunset Deck',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'The Royal Haveli, Jaipur',
    location: 'Amer Road, Jaipur',
    destination: 'Jaipur',
    bedrooms: 7,
    maxGuests: 18,
    specs: '7 BHK • Heritage Palace • Mughal Courtyard',
    priceNumeric: 75000,
    price: '₹75,000',
    period: '/night',
    rating: '4.97',
    reviewsCount: 31,
    tag: 'Princely Architecture',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
  },
];

const destinationsList = [
  'All Destinations',
  'Goa',
  'Alibaug',
  'Lonavla',
  'Karjat',
  'Udaipur',
  'Kasauli',
];

export default function VillasDirectory() {
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter & Sort Logic
  const filteredVillas = useMemo(() => {
    return allVillas
      .filter((villa) => {
        const matchesDest =
          selectedDestination === 'All Destinations' ||
          villa.destination.toLowerCase() === selectedDestination.toLowerCase();

        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          villa.title.toLowerCase().includes(query) ||
          villa.location.toLowerCase().includes(query) ||
          villa.specs.toLowerCase().includes(query);

        return matchesDest && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
        if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
        if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
        return a.id - b.id; // recommended default
      });
  }, [selectedDestination, searchQuery, sortBy]);

  return (
    <div>
      {/* ─── INTERACTIVE FILTER & SEARCH BAR ──────────────────────────────── */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-border-luxury shadow-sm mb-12">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">

          {/* Destination Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {destinationsList.map((dest) => {
              const isActive = selectedDestination === dest;
              return (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-foreground text-white shadow-md'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-gold-main hover:bg-brand-cream hover:text-gold-dark'
                    }`}
                >
                  {dest}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search villa or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-gold-main focus:bg-white transition-colors"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-foreground font-medium focus:outline-none focus:border-gold-main cursor-pointer"
            >
              <option value="recommended">Featured Estates</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Guest Rating</option>
            </select>
          </div>

        </div>

        {/* Results Counter / Filter status */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500">
          <span>
            Showing <strong className="text-foreground font-semibold">{filteredVillas.length}</strong> of{' '}
            {allVillas.length} Handpicked Estates
          </span>
          {(selectedDestination !== 'All Destinations' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedDestination('All Destinations');
                setSearchQuery('');
              }}
              className="text-gold-dark hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ─── VILLA CARDS GRID (ENHANCED LUXURY CARDS) ──────────────────────── */}
      {filteredVillas.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-border-luxury p-10">
          <p className="font-serif text-2xl font-bold text-foreground mb-2">No Estates Match Your Criteria</p>
          <p className="font-sans text-sm text-gray-600 mb-6 font-light">
            Try adjusting your search terms or view all destinations.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDestination('All Destinations');
              setSearchQuery('');
            }}
            className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold"
          >
            View All Estates
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVillas.map((villa) => {
            const isLiked = wishlist[villa.id];
            return (
              <div
                key={villa.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative border border-border-luxury"
              >
                {/* Image Container with Badges */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Left Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/65 text-white backdrop-blur-md border border-white/15 tracking-wide">
                      {villa.tag}
                    </span>
                  </div>

                  {/* Top Right: Wishlist & Rating */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    {/* Rating Pill */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 text-black text-xs font-bold shadow-md backdrop-blur-md">
                      <span className="text-gold-main">★</span>
                      <span>{villa.rating}</span>
                      <span className="text-[10px] text-gray-500 font-normal">({villa.reviewsCount})</span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(villa.id)}
                      aria-label="Save to Wishlist"
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${isLiked
                          ? 'bg-rose-500 text-white'
                          : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  {/* Inner Ambient Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Subtitle / Region */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-sans text-gold-dark font-semibold uppercase tracking-wider">
                        {villa.location}
                      </span>
                      <span className="text-xs text-gray-500 font-sans">
                        Up to {villa.maxGuests} Guests
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-gold-dark transition-colors leading-snug">
                      <Link href={`/villas/${villa.id}`}>
                        {villa.title}
                      </Link>
                    </h3>

                    {/* Prominent 5-Star Rating Row */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-gold-main text-sm tracking-tight font-serif">
                        ★★★★★
                      </div>
                      <span className="text-xs font-bold text-foreground font-sans">{villa.rating}</span>
                      <span className="text-xs text-gray-500 font-light font-sans">({villa.reviewsCount} verified reviews)</span>
                    </div>

                    {/* Specs / Features with Gold Dot */}
                    <p className="text-xs sm:text-sm text-gray-700 font-sans mt-3 flex items-center gap-2 font-medium leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-main flex-shrink-0" />
                      <span>{villa.specs}</span>
                    </p>
                  </div>

                  {/* Bottom Row: Price & CTA */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-foreground font-serif">
                        {villa.price}
                      </span>
                      <span className="text-xs text-gray-500 font-sans ml-1">
                        {villa.period}
                      </span>
                    </div>

                    <Link
                      href={`/villas/${villa.id}`}
                      className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all"
                    >
                      <span>Explore Estate</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom 4px Signature Gold Gradient Border */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-gold-light via-gold-main to-gold-dark" />
              </div>
            );
          })}
        </div>
      )}

      {/* ─── CONCIERGE ASSISTANCE CALLOUT BANNER ──────────────────────────── */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-brand-cream-warm border border-border-luxury shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-1">
            Bespoke Estate Sourcing
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
            Seeking an Unlisted Estate for a Private Occasion?
          </h3>
          <p className="font-sans text-sm text-gray-700 font-light leading-relaxed">
            Our lifestyle curators hold access to confidential luxury compounds across Alibaug, Lonavla, and Goa that are not displayed publicly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <Link
            href="/contact"
            className="btn-primary px-7 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            Speak with a Curator
          </Link>
          <a
            href="tel:+9198++++++++"
            className="text-xs sm:text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors flex items-center gap-1.5"
          >
            <span>Hotline: +91 98200 92837</span>
          </a>
        </div>
      </div>
    </div>
  );
}
