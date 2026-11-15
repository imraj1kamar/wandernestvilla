'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// ══════════════════════════════════════════════════════════════════════════════
// LUXURY VILLAS MASTER DATABASE (Supports IDs 1 to 9 & Fallbacks)
// ══════════════════════════════════════════════════════════════════════════════
const villasDatabase = {
  '1': {
    id: 1,
    title: 'The Glasshouse, Goa',
    location: 'Candolim, North Goa - Private Pool & Luxury Estate',
    region: 'Goa',
    subLocation: 'Candolim',
    bedrooms: 5,
    maxGuests: 12,
    rating: '4.95',
    reviewsCount: 124,
    pricePerNight: 45000,
    specsSummary: '12 Guests • 5 Bedrooms • 6 Beds • 5 Baths',
    tag: 'Beachfront & Dedicated Chef',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Nestled within a secluded private compound in Candolim, The Glasshouse represents the pinnacle of contemporary tropical brutalist architecture. Soaring 14-foot floor-to-ceiling glass pavilions blur the boundaries between minimalist basalt interiors and lush, palm-canopied pool courtyards. Patrons enjoy an expansive 18-meter heated infinity pool, private sun terraces, and an open-air teak dining pavilion serviced by our resident culinary chef.',
    extendedDescription:
      'Whether savouring fresh coastal crab masala harvested from local waters or hosting an intimate sunset cocktail hour with our resident mixologist, this estate offers absolute exclusivity away from tourist corridors. The villa is equipped with acoustic Marshall sound architecture, acoustic double-glazed glass, and 100% discrete butler service.',
    bedroomsList: [
      { name: 'Master Suite 1', type: 'King Bed • Ensuite Jacuzzi Bath • Ocean-Facing Balcony' },
      { name: 'Presidential Suite 2', type: 'King Bed • Ensuite Rain Shower • Private Pool Access' },
      { name: 'Garden Suite 3', type: 'Queen Bed • Teak Daybed • Courtyard View' },
      { name: 'Guest Suite 4', type: 'Twin Beds (Converts to King) • Ensuite Marble Bath' },
      { name: 'Penthouse Suite 5', type: 'King Bed • Panoramic Stargazing Deck' },
    ],
    host: {
      name: 'Aaditya Singhania & Concierge Team',
      role: 'Superhost & Estate Curator',
      years: '6 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Aaditya is a connoisseur of coastal architecture and luxury hospitality. Along with his resident chef and discrete butler team, he ensures that every detail—from airport tarmac pick-ups to bespoke sunset seafood barbecues—is orchestrated flawlessly.',
    },
  },
  '2': {
    id: 2,
    title: 'Casa de Sol, Alibaug',
    location: 'Awas Beach, Alibaug - Direct Beach Access & Private Jacuzzi',
    region: 'Alibaug',
    subLocation: 'Awas Beach',
    bedrooms: 4,
    maxGuests: 10,
    rating: '4.92',
    reviewsCount: 86,
    pricePerNight: 38000,
    specsSummary: '10 Guests • 4 Bedrooms • 5 Beds • 4 Baths',
    tag: 'Direct Beach Access & Butler',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'A sun-kissed sanctuary just minutes from the Mandwa jetty, Casa de Sol captures Mediterranean coastal elegance with terracotta tile accents, swaying coconut palms, and private gated access straight onto the virgin sands of Awas Beach.',
    extendedDescription:
      'Features a temperature-regulated outdoor sunken jacuzzi, an alfresco wood-fired pizza oven, and a dedicated team of butlers trained to provide silent, intuitive hospitality throughout your coastal getaway.',
    bedroomsList: [
      { name: 'Ocean Pavilion Suite', type: 'King Bed • Direct Beach Pathway • Open Sky Shower' },
      { name: 'Courtyard Suite', type: 'King Bed • Private Verandah • Walk-in Wardrobe' },
      { name: 'Palms Guest Suite', type: 'Queen Bed • Ensuite Marble Bath' },
      { name: 'Loft Suite', type: '2 Queen Beds • Garden Overlook • Reading Nook' },
    ],
    host: {
      name: 'Radhika & Vikram Shroff',
      role: 'Superhosts & Heritage Curators',
      years: '4 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Vikram and Radhika are passionate about Alibaug maritime history. They curate farm-fresh Konkani meals and private speedboat transfers for guests.',
    },
  },
  '3': {
    id: 3,
    title: 'The Cloud Retreat, Lonavla',
    location: 'Tiger Point, Lonavla - Heated Infinity Pool & Valley Views',
    region: 'Lonavla',
    subLocation: 'Tiger Point',
    bedrooms: 5,
    maxGuests: 14,
    rating: '5.0',
    reviewsCount: 112,
    pricePerNight: 55000,
    specsSummary: '14 Guests • 5 Bedrooms • 7 Beds • 5 Baths',
    tag: 'Cliffside Infinity Pool & Chef',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Perched dramatically on the mist-draped edge of Tiger Point cliff, The Cloud Retreat offers 270-degree panoramic vistas of the Sahyadri valley. Watch monsoonal clouds roll beneath your cantilevered heated infinity pool.',
    extendedDescription:
      'Includes an indoor fireplace salon, high-ceiling cedarwood master suites, a temperature-controlled wine cellar, and a resident Mughlai and Maharashtrian chef renowned for charcoal barbecue dinners.',
    bedroomsList: [
      { name: 'Cliff Master Suite', type: 'King Bed • Glass Wall Valley View • Deep Soaking Tub' },
      { name: 'Mist Pavilion Suite', type: 'King Bed • Fireplace • Private Balcony' },
      { name: 'Sahyadri Suite 1', type: 'Queen Bed • Forest Overlook' },
      { name: 'Sahyadri Suite 2', type: 'Queen Bed • Teak Balcony' },
      { name: 'Family Loft', type: 'King Bed + 2 Single Beds • Panoramic Skylight' },
    ],
    host: {
      name: 'Captain Sameer Mehta (Retd.)',
      role: 'Superhost & Estate Caretaker',
      years: '7 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Retired naval officer Sameer curates every stay with military precision and warm, heartfelt mountain hospitality.',
    },
  },
  '4': {
    id: 4,
    title: 'Marigold Estate, Udaipur',
    location: 'Lake Pichola, Udaipur - Royal Heritage Palace & Butler',
    region: 'Udaipur',
    subLocation: 'Lake Pichola',
    bedrooms: 6,
    maxGuests: 16,
    rating: '4.98',
    reviewsCount: 94,
    pricePerNight: 68000,
    specsSummary: '16 Guests • 6 Bedrooms • 8 Beds • 6.5 Baths',
    tag: 'Royal Heritage Grounds',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'A restored 18th-century noble residence along the serene banks of Lake Pichola. Features hand-carved Jodhpur stone arches, Belgian glass chandeliers, and private courtyards with marigold fountains.',
    extendedDescription:
      'Guests enjoy bespoke Mewari royal dining with live sitar recitals upon request, private boat excursions to Jagmandir Island, and round-the-clock royal butler concierge.',
    bedroomsList: [
      { name: 'Maharana Suite', type: 'Grand Imperial Bed • Lake View Jharokha • Gold Accents' },
      { name: 'Pichola Pavilion', type: 'King Four-Poster Bed • Hand-painted Frescoes' },
      { name: 'Courtyard Suite', type: 'King Bed • Water Fountain View' },
      { name: 'Amber Suite', type: 'Queen Bed • Brass Fittings & Marble Tub' },
      { name: 'Royal Guest Suite 1', type: 'Queen Bed • Traditional Silk Linens' },
      { name: 'Royal Guest Suite 2', type: '2 Queen Beds • Family Suite' },
    ],
    host: {
      name: 'Rana Harshvardhan Singh',
      role: 'Heritage Custodian & Superhost',
      years: '5 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Direct descendant of Mewar royalty, Harshvardhan opens his private familial retreat to discerning travelers seeking authentic Rajputana heritage.',
    },
  },
  '5': {
    id: 5,
    title: 'Heritage Estate, Karjat',
    location: 'Foothills, Karjat - 10-Acre Private Lake & Volcanic Rock',
    region: 'Karjat',
    subLocation: 'Karjat Foothills',
    bedrooms: 6,
    maxGuests: 15,
    rating: '4.94',
    reviewsCount: 78,
    pricePerNight: 62000,
    specsSummary: '15 Guests • 6 Bedrooms • 8 Beds • 6 Baths',
    tag: '10-Acre Private Compound',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Spanning 10 pristine acres of lush Karjat foothills with a natural spring-fed lake and organic mango orchards. Crafted with native volcanic basalt rock and recycled Burma teak.',
    extendedDescription:
      'Features equestrian stables, a private cricket ground, natural outdoor fire-pit, and a master farm-to-table chef serving organic produce harvested right from the estate grounds.',
    bedroomsList: [
      { name: 'Estate Master Wing', type: 'King Bed • Private Plunge Pool • Orchard View' },
      { name: 'Lakeview Pavilion', type: 'King Bed • Glass Deck Overlooking Water' },
      { name: 'Basalt Cottage 1', type: 'Queen Bed • Stone Bathtub' },
      { name: 'Basalt Cottage 2', type: 'Queen Bed • Private Herb Patio' },
      { name: 'Orchard Suite', type: '2 Queen Beds • Ideal for Families' },
      { name: 'Meadow Guest Suite', type: 'King Bed • En-suite Dressing Room' },
    ],
    host: {
      name: 'Devraj & Maya Deshmukh',
      role: 'Superhost & Agronomist',
      years: '5 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Devraj and Maya created this eco-luxury farm sanctuary for city dwellers seeking silence, pristine air, and organic luxury dining.',
    },
  },
  'default': {
    id: 1,
    title: 'The Glasshouse, Goa',
    location: 'Candolim, North Goa - Private Pool & Luxury Estate',
    region: 'Goa',
    subLocation: 'Candolim',
    bedrooms: 5,
    maxGuests: 12,
    rating: '4.95',
    reviewsCount: 124,
    pricePerNight: 45000,
    specsSummary: '12 Guests • 5 Bedrooms • 6 Beds • 5 Baths',
    tag: 'Beachfront & Dedicated Chef',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Nestled within a secluded private compound in Candolim, The Glasshouse represents the pinnacle of contemporary tropical brutalist architecture. Soaring 14-foot floor-to-ceiling glass pavilions blur the boundaries between minimalist basalt interiors and lush, palm-canopied pool courtyards.',
    extendedDescription:
      'Whether savouring fresh coastal crab masala harvested from local waters or hosting an intimate sunset cocktail hour with our resident mixologist, this estate offers absolute exclusivity away from tourist corridors.',
    bedroomsList: [
      { name: 'Master Suite 1', type: 'King Bed • Ensuite Jacuzzi Bath • Ocean-Facing Balcony' },
      { name: 'Presidential Suite 2', type: 'King Bed • Ensuite Rain Shower • Private Pool Access' },
      { name: 'Garden Suite 3', type: 'Queen Bed • Teak Daybed • Courtyard View' },
      { name: 'Guest Suite 4', type: 'Twin Beds (Converts to King) • Ensuite Marble Bath' },
      { name: 'Penthouse Suite 5', type: 'King Bed • Panoramic Stargazing Deck' },
    ],
    host: {
      name: 'Aaditya Singhania & Concierge Team',
      role: 'Superhost & Estate Curator',
      years: '6 years hosting on Wandernest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Aaditya is a connoisseur of coastal architecture and luxury hospitality. Along with his resident chef and discrete butler team, he ensures that every detail—from airport tarmac pick-ups to bespoke sunset seafood barbecues—is orchestrated flawlessly.',
    },
  },
};

// Aliases for SEO slugs
villasDatabase['the-cloud-retreat-lonavla'] = villasDatabase['3'];
villasDatabase['oceanic-whisper-alibaug'] = villasDatabase['2'];
villasDatabase['heritage-estate-karjat'] = villasDatabase['5'];
villasDatabase['marigold-estate-udaipur'] = villasDatabase['4'];
villasDatabase['the-glasshouse-goa'] = villasDatabase['1'];

// ══════════════════════════════════════════════════════════════════════════════
// EXCLUSIVE AMENITIES
// ══════════════════════════════════════════════════════════════════════════════
const amenitiesList = [
  { 
    name: 'Private Heated Infinity Pool', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0s3.5 2 5 0M2 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0s3.5 2 5 0" />
      </svg>
    ) 
  },
  { 
    name: 'Dedicated In-House Master Chef', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ) 
  },
  { 
    name: '24/7 Discrete Butler Service', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 15a6 6 0 0 1 12 0H6z" />
        <path d="M2 17h20v2H2z" />
        <path d="M12 9v-2" />
        <path d="M10 5h4" />
      </svg>
    ) 
  },
  { 
    name: 'High-Speed Fiber WiFi (1 Gbps)', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ) 
  },
  { 
    name: 'Central Climate Control AC', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2v20M12 2l3 3M12 2L9 5M12 22l3-3M12 22l-3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3M22 12l-3-3" />
      </svg>
    ) 
  },
  { 
    name: 'Direct Waterfront / Valley Access', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12l-10-8-10 8M12 22V12" />
        <path d="M2 20c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0" />
      </svg>
    ) 
  },
  { 
    name: 'Alfresco Gourmet BBQ Lawn', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 14h18M6 14l-2 7M18 14l2 7M10 14v7M14 14v7M5 10c0-3 3-5 7-5s7 2 7 5H5z" />
        <path d="M12 2v3M9 2.5v2M15 2.5v2" />
      </svg>
    ) 
  },
  { 
    name: 'Acoustic Marshall Sound Audio', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ) 
  },
  { 
    name: '100% Uninterrupted Power Backup', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ) 
  },
  { 
    name: 'Secure Gated Valet Parking', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-5.16.86a1 1 0 00-.84.99V16h3" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ) 
  },
  { 
    name: 'Private Organic Herb Gardens', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M11 20A7 7 0 0 1 4 13V4h9a7 7 0 0 1 7 7v9h-9Z" />
        <path d="M11 20V10" />
      </svg>
    ) 
  },
  { 
    name: 'Egyptian Cotton Linens & Robes', 
    icon: (
      <svg className="w-5 h-5 text-[#aa8623]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 20h-4v-4H8v4H4" />
        <path d="M4 16V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
        <path d="M12 4v8M8 12h8" />
      </svg>
    ) 
  },
];


// ══════════════════════════════════════════════════════════════════════════════
// ESTATE GUIDELINES
// ══════════════════════════════════════════════════════════════════════════════
const masterRules = [
  { title: 'Check-In & Check-Out', detail: 'Check-in: 2:00 PM • Check-out: 11:00 AM (Early luggage drop available)' },
  { title: 'Smoking Policy', detail: 'Strictly prohibited inside bedrooms; permitted on open terraces and pool decks' },
  { title: 'Pet Policy', detail: 'Well-behaved pets warmly welcomed upon prior concierge registration' },
  { title: 'Quiet Hours', detail: 'Outdoor decibel levels lowered past 10:00 PM to honor local tranquility' },
  { title: 'Government Identification', detail: 'Valid government photo ID required for all staying patrons upon arrival' },
  { title: 'Private Celebrations', detail: 'Intimate gatherings permitted up to 25 guests with prior concierge clearance' },
];

function VillaDetailsContent() {
  const params = useParams();
  const villaId = params?.id ? String(params.id) : '1';
  const villa = villasDatabase[villaId] || villasDatabase['default'];

  // State management
  const [checkIn, setCheckIn] = useState('2026-12-18');
  const [checkOut, setCheckOut] = useState('2026-12-21');
  const [guestsCount, setGuestsCount] = useState(`${villa.maxGuests} Guests`);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(null); // Fullscreen gallery modal
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Dynamic night calculation based on dates
  const nights = useMemo(() => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 3;
    } catch {
      return 3;
    }
  }, [checkIn, checkOut]);

  // Financial calculations
  const basePrice = villa.pricePerNight * nights;
  const offSeasonDiscount = 10000;
  const serviceFee = 8400;
  const gstTaxes = Math.round((basePrice - offSeasonDiscount + serviceFee) * 0.18);
  const damageDeposit = 20000;
  const totalAmount = basePrice - offSeasonDiscount + serviceFee + gstTaxes + damageDeposit;

  const handleBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      alert(`Reservation request for "${villa.title}" received! Your dedicated private concierge will contact you within 15 minutes with bespoke dining menus and transfer arrangements.`);
    }, 1200);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#f8f7f2] text-[#171717] min-h-screen">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. TOP SECTION (Dark Navy Theme - bg-[#12151e])
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#12151e] text-white pt-28 md:pt-36 pb-12 md:pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Breadcrumbs & Badges Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            
            {/* Left: Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/60 font-sans">
              <Link href="/" className="hover:text-gold-main transition-colors">Home</Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/villas" className="hover:text-gold-main transition-colors">Our Villas</Link>
              <span className="text-white/30">&gt;</span>
              <Link href="/destinations" className="hover:text-gold-main transition-colors">{villa.region}</Link>
              <span className="text-white/30">&gt;</span>
              <span className="text-gold-light font-medium">{villa.subLocation}</span>
            </nav>

            {/* Right: Badges & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Rating Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white backdrop-blur-md">
                <span className="text-gold-main font-serif">★</span>
                <span>{villa.rating}</span>
                <span className="text-white/60 font-normal">({villa.reviewsCount} reviews)</span>
              </div>

              {/* Superhost Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/20 text-xs font-medium text-white/90">
                <span className="text-gold-main">★</span>
                <span>Superhost</span>
              </div>

              {/* Managed by WANDERNEST Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-main/15 border border-gold-main/40 text-xs font-semibold text-gold-light tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-main animate-pulse" />
                <span>Managed by Wandernest</span>
              </div>

              {/* Share & Save Action Buttons */}
              <div className="flex items-center gap-2 ml-auto md:ml-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="relative p-2 rounded-full bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Share Villa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  {copyFeedback && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gold-main text-black text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full border transition-colors ${
                    isSaved
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white/5 border-white/15 text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Title & Location Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="text-xs uppercase tracking-widest text-gold-light font-semibold">
                {villa.tag}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
              {villa.title}
            </h1>
            <div className="flex items-center gap-2 text-sm md:text-base text-white/80 font-light">
              <svg className="w-4 h-4 text-gold-main flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{villa.location}</span>
            </div>
          </div>

          {/* ─── IMAGE GALLERY (5-IMAGE MOSAIC GRID) ────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            
            {/* Left Main Hero Image (Spanning 2 columns and 2 rows) */}
            <div 
              onClick={() => setActiveModalImage(0)}
              className="md:col-span-2 md:row-span-2 relative h-full w-full group overflow-hidden bg-gray-900 cursor-pointer"
            >
              <Image
                src={villa.images[0]}
                alt={`${villa.title} Master Estate Pool`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                Main Estate Courtyard
              </span>
            </div>

            {/* Right Top-Left Image */}
            <div 
              onClick={() => setActiveModalImage(1)}
              className="hidden md:block md:col-span-1 md:row-span-1 relative h-full w-full group overflow-hidden bg-gray-900 cursor-pointer"
            >
              <Image
                src={villa.images[1]}
                alt={`${villa.title} Master Suite`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Top-Right Image */}
            <div 
              onClick={() => setActiveModalImage(2)}
              className="hidden md:block md:col-span-1 md:row-span-1 relative h-full w-full group overflow-hidden bg-gray-900 cursor-pointer"
            >
              <Image
                src={villa.images[2]}
                alt={`${villa.title} Oceanfront Living Room`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Bottom-Left Image */}
            <div 
              onClick={() => setActiveModalImage(3)}
              className="hidden md:block md:col-span-1 md:row-span-1 relative h-full w-full group overflow-hidden bg-gray-900 cursor-pointer"
            >
              <Image
                src={villa.images[3]}
                alt={`${villa.title} Dining & Chef Pavilion`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Bottom-Right Image with Overlay & "Show all photos (32)" Button */}
            <div className="hidden md:block md:col-span-1 md:row-span-1 relative h-full w-full group overflow-hidden bg-gray-900">
              <Image
                src={villa.images[4]}
                alt={`${villa.title} Sunset Terrace`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Show All Photos Button */}
              <button
                type="button"
                onClick={() => setActiveModalImage(0)}
                className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-xl bg-black/85 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 text-gold-main" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>Show all photos (32)</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. BOTTOM SECTION (Light Cream Theme - bg-[#f8f7f2])
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#f8f7f2] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* ────────────────────────────────────────────────────────────────
                3. LEFT COLUMN (Main Details - ~68% width)
               ──────────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-8 flex flex-col space-y-12">

              {/* Quick Info Bar */}
              <div className="p-6 rounded-2xl bg-white border border-[#ede1ce] shadow-2xs">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base font-semibold text-[#171717] font-sans">
                  <span>{villa.specsSummary}</span>
                  <span className="text-gold-main">&bull;</span>
                  <span className="text-gold-dark font-medium">Temperature-Controlled Pool</span>
                  <span className="text-gold-main">&bull;</span>
                  <span className="text-gold-dark font-medium">Dedicated Master Chef</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="border-b border-[#ede1ce] pb-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-6 h-[1px] bg-gold-main" />
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-bold font-sans">
                    Estate Architecture &amp; Ambiance
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-4">
                  The Experience
                </h2>
                <div className="font-sans text-base text-gray-700 leading-relaxed font-light space-y-4">
                  <p>{villa.description}</p>
                  <p className={showFullDesc ? 'block' : 'line-clamp-2'}>
                    {villa.extendedDescription}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-gold-main underline underline-offset-4 cursor-pointer pt-1 inline-block"
                  >
                    {showFullDesc ? 'Show less' : 'Read full architectural story...'}
                  </button>
                </div>
              </div>

              {/* Exclusive Amenities Grid */}
              <div className="border-b border-[#ede1ce] pb-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-6 h-[1px] bg-gold-main" />
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-bold font-sans">
                    Curated Inclusions
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
                  Signature Estate Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {amenitiesList.map((item) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-2xl bg-white border border-[#ede1ce] shadow-2xs hover:border-gold-main hover:shadow-sm transition-all"
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-[#171717] leading-snug">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleeping Suites Breakdown */}
              <div className="border-b border-[#ede1ce] pb-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-6 h-[1px] bg-gold-main" />
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-bold font-sans">
                    Accommodations
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
                  Sleeping Suites &amp; Arrangements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {villa.bedroomsList?.map((suite, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-[#ede1ce]">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-lg">🛏️</span>
                        <h4 className="font-serif text-base font-bold text-[#171717]">
                          {suite.name}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 font-light leading-relaxed">
                        {suite.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-House Culinary & Dining Staff */}
              <div className="border-b border-[#ede1ce] pb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">👨‍🍳</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                    In-House Culinary &amp; Butler Team
                  </h2>
                </div>
                <div className="bg-[#f8eedf] p-6 sm:p-8 rounded-3xl border border-[#ede1ce]">
                  <p className="font-sans text-base text-gray-800 leading-relaxed font-light mb-4">
                    Your reservation includes a professionally trained private chef and discrete butlers who attend exclusively to your group. Every breakfast is freshly prepared complimentary, and bespoke lunch and dinner menus (coastal seafood degustations, traditional claypot curries, or continental grills) can be tailored to your dietary wishes.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-gold-dark uppercase tracking-wider">
                    <span>&bull; Farm-to-Table Fresh Produce</span>
                    <span>&bull; Sommelier Service</span>
                    <span>&bull; 24/7 Housekeeping</span>
                  </div>
                </div>
              </div>

              {/* Master Rules */}
              <div className="border-b border-[#ede1ce] pb-10">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
                  Estate Guidelines &amp; House Rules
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {masterRules.map((rule) => (
                    <div key={rule.title} className="p-4 rounded-2xl bg-white border border-[#ede1ce]">
                      <h4 className="font-serif text-base font-bold text-[#171717] mb-1">
                        {rule.title}
                      </h4>
                      <p className="font-sans text-xs text-gray-600 font-light leading-relaxed">
                        {rule.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meet the Owner & Host */}
              <div className="border-b border-[#ede1ce] pb-10">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
                  Meet Your Host &amp; Curator
                </h2>
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ede1ce] shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold-main shadow-md">
                    <Image
                      src={villa.host.avatar}
                      alt={villa.host.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">
                        {villa.host.name}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-main/20 text-gold-dark font-semibold">
                        Superhost
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-sans mb-3">
                      {villa.host.role} &bull; {villa.host.years}
                    </p>
                    <p className="font-sans text-sm text-gray-700 font-light leading-relaxed">
                      {villa.host.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Patron Ratings & Reviews */}
              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                    Patron Testimonials
                  </h2>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#171717]">
                    <span className="text-gold-main font-serif text-base">★</span>
                    <span>{villa.rating}</span>
                    <span className="text-gray-500 font-light">({villa.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                {/* Star rating breakdown grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-5 rounded-2xl bg-white border border-[#ede1ce]">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Cleanliness</span>
                    <span className="font-bold text-[#171717]">5.0</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-bold text-[#171717]">4.9</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Communication</span>
                    <span className="font-bold text-[#171717]">5.0</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Location</span>
                    <span className="font-bold text-[#171717]">4.9</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Hospitality &amp; Chef</span>
                    <span className="font-bold text-[#171717]">5.0</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-gray-600">Overall Value</span>
                    <span className="font-bold text-[#171717]">4.9</span>
                  </div>
                </div>

                {/* 2 Featured Testimonials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#ede1ce]">
                    <div className="flex items-center gap-2 mb-2 text-gold-main font-serif text-xs">
                      ★★★★★
                    </div>
                    <p className="font-sans text-xs text-gray-700 italic leading-relaxed mb-3">
                      &quot;An extraordinary estate experience. The private chef prepared seafood that rivalled five-star restaurants in Mumbai. Absolute privacy, exquisite pool.&quot;
                    </p>
                    <span className="text-[11px] font-bold text-[#171717] block">Arjun &amp; Priya Nair</span>
                    <span className="text-[10px] text-gray-500 font-light">Stayed November 2026</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#ede1ce]">
                    <div className="flex items-center gap-2 mb-2 text-gold-main font-serif text-xs">
                      ★★★★★
                    </div>
                    <p className="font-sans text-xs text-gray-700 italic leading-relaxed mb-3">
                      &quot;The architectural details blew our family away. Check-in was effortless, and having a dedicated butler made our weekend completely carefree.&quot;
                    </p>
                    <span className="text-[11px] font-bold text-[#171717] block">Kavita Singhal</span>
                    <span className="text-[10px] text-gray-500 font-light">Stayed October 2026</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ────────────────────────────────────────────────────────────────
                4. RIGHT COLUMN (Sticky Booking Sidebar - ~32% width)
               ──────────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-4 sticky top-28 z-20">
              <div className="bg-white rounded-3xl border border-[#ede1ce] shadow-2xl overflow-hidden">
                
                {/* Price Header */}
                <div className="p-6 sm:p-7 border-b border-gray-100 bg-[#fbf7f0]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                        ₹{villa.pricePerNight.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-600 font-sans ml-1">
                        / night (Excl. taxes)
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-gold-dark flex items-center gap-1">
                      <span className="text-gold-main font-serif">★</span>
                      <span>{villa.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-6">

                  {/* Date Picker Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 font-sans">
                        Checking In
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-gold-main bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 font-sans">
                        Checking Out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-gold-main bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Guests Dropdown */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 font-sans">
                      Number of Guests
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#171717] font-medium focus:outline-none focus:border-gold-main bg-gray-50/50 cursor-pointer"
                    >
                      <option value="2 Guests">2 Guests (Couple Retreat)</option>
                      <option value="4 Guests">4 Guests (2 Bedroom Suites)</option>
                      <option value="6 Guests">6 Guests (3 Bedroom Suites)</option>
                      <option value={`${villa.maxGuests} Guests`}>{villa.maxGuests} Guests (Full Estate Exclusive)</option>
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-gray-100 text-sm text-gray-600 font-sans">
                    <div className="flex justify-between items-center">
                      <span>₹{villa.pricePerNight.toLocaleString('en-IN')} x {nights} nights</span>
                      <span className="font-medium text-[#171717]">₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-700">
                      <span>Special Off-season Discount</span>
                      <span className="font-medium">-₹{offSeasonDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Luxury Butler &amp; Chef Service</span>
                      <span className="font-medium text-[#171717]">₹{serviceFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>GST &amp; Hospitality Taxes (18%)</span>
                      <span className="font-medium text-[#171717]">₹{gstTaxes.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Refundable Damage Deposit</span>
                      <span className="font-medium text-[#171717]">₹{damageDeposit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                </div>

                {/* Estimated Total Box (Dark Navy bg-[#12151e]) */}
                <div className="bg-[#12151e] p-6 text-white space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans">
                      Estimated Total
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-light">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Full Width Gold Gradient Button */}
                  <button
                    type="button"
                    onClick={handleBooking}
                    className="btn-primary w-full py-4 rounded-xl text-base font-bold shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                  >
                    {bookingConfirmed ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm &amp; Pay Now</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-white/50 text-center font-light">
                    You won&apos;t be charged until our concierge approves your dates.
                  </p>
                </div>

              </div>

              {/* Trust Highlights Below Card */}
              <div className="p-5 mt-4 rounded-2xl bg-white border border-[#ede1ce] space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Free Cancellation</strong> up to 14 days before check-in</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>100% Refundable</strong> Security Deposit included</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Instant Concierge Connect</strong> with resident chef</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. INTERACTIVE FULLSCREEN PHOTO GALLERY MODAL
         ══════════════════════════════════════════════════════════════════════ */}
      {activeModalImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <span className="font-serif text-lg text-gold-light">
              {villa.title} &bull; Photo {activeModalImage + 1} of {villa.images.length}
            </span>
            <button
              type="button"
              onClick={() => setActiveModalImage(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Gallery"
            >
              ✕
            </button>
          </div>

          <div className="relative w-full max-w-5xl h-[65vh] mx-auto my-auto">
            <Image
              src={villa.images[activeModalImage]}
              alt={`Villa View ${activeModalImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Bottom Thumbnails Navigation */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto max-w-3xl mx-auto w-full py-2">
            {villa.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveModalImage(i)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  activeModalImage === i ? 'border-gold-main scale-105' : 'border-white/20 opacity-60'
                }`}
              >
                <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function VillaDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#12151e] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gold-main border-t-transparent rounded-full animate-spin" />
            <span className="font-serif text-sm tracking-widest text-gold-light uppercase">
              Loading Wandernest Estate...
            </span>
          </div>
        </div>
      }
    >
      <VillaDetailsContent />
    </Suspense>
  );
}
