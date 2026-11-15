import React from 'react';

/**
 * LocalBusinessSchema Component
 * Injects Schema.org JSON-LD structured data for Googlebot, Gemini, Claude, and AI crawlers.
 * Defines "Wandernest Villas" as a premier LodgingBusiness / Luxury Real Estate entity.
 */
export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'RealEstateAgent'],
    '@id': 'https://www.wandernestvillas.com/#organization',
    name: 'Wandernest Villas',
    alternateName: 'Wandernest Luxury Villas & Private Pool Estates',
    description:
      'Curated luxury private pool villas for rent in Lonavla, Alibaug, Karjat, and Goa. Handpicked private estates featuring dedicated in-house master chefs, heated infinity pools, and 5-star concierge hospitality.',
    url: 'https://www.wandernestvillas.com',
    logo: 'https://www.wandernestvillas.com/logo.png',
    image: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    ],
    telephone: '+9198++++++++',
    email: 'concierge@wandernestvillas.com',
    priceRange: '₹₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Credit Card, Bank Wire, UPI',
    sameAs: [
      'https://www.instagram.com/wandernestvillas',
      'https://www.facebook.com/wandernestvillas',
      'https://www.linkedin.com/company/wandernestvillas',
      'https://x.com/wandernestvilla',
      'https://wa.me/9198++++++++',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 14, Platina Tower, C-59, G Block, Bandra Kurla Complex (BKC)',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0657,
      longitude: 72.8687,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Temperature-Controlled Pools',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Dedicated In-House Master Chef',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: '24/7 Discrete Butler Hospitality',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'High-Speed Fiber WiFi (1 Gbps)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Direct Beachfront & Valley Access',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Secure Gated Valet Parking',
        value: true,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Signature Private Villa Portfolio',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LodgingBusiness',
            name: 'The Glasshouse, Goa',
            description: '5 BHK beachfront luxury estate with private infinity pool and dedicated chef in Candolim.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LodgingBusiness',
            name: 'Casa de Sol, Alibaug',
            description: '4 BHK coastal villa with direct beach access, jacuzzi, and butler team at Awas Beach.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LodgingBusiness',
            name: 'The Cloud Retreat, Lonavla',
            description: '5 BHK cliffside estate with heated infinity pool overlooking Tiger Point cliff.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LodgingBusiness',
            name: 'Heritage Estate, Karjat',
            description: '6 BHK 10-acre private lake compound with volcanic basalt architecture.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
