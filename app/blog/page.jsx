import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const metadata = {
  title: 'The Luxe Journal | Wandernest Villas — Luxury Travel & Villa Editorial',
  description:
    'Explore The Luxe Journal by Wandernest Villas: insider guides to private pool villas, culinary stories with personal chefs, and architectural spotlights across Maharashtra and India.',
  keywords: [
    'luxury villa blog India',
    'private pool villa Lonavla guide',
    'villas with private chefs Mumbai',
    'Alibaug coastal travel guide',
    'Karjat architectural retreats',
    'The Luxe Journal Wandernest',
  ],
  openGraph: {
    title: 'The Luxe Journal | Wandernest Villas Editorial',
    description:
      'Curated travel guides, private chef degustations, and architectural spotlights across Maharashtra.',
    url: 'https://www.wandernestvillas.com/blog',
  },
};

const articles = [
  {
    id: 1,
    title: 'Top 5 Villas with Private Chefs near Mumbai for Gourmet Feasts',
    category: 'Epicurean Journeys',
    readTime: '6 min read',
    date: 'Nov 14, 2026',
    excerpt:
      'Inside our in-house master chefs’ philosophy: bridging ancient Konkani claypot recipes with Michelin-calibre seafood degustations on candlelit pool decks.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
  {
    id: 2,
    title: 'A Weekend in Lonavla’s Royal Mansions: Heritage Above the Clouds',
    category: 'Architecture Spotlight',
    readTime: '5 min read',
    date: 'Nov 10, 2026',
    excerpt:
      'Explore how colonial basalt masonry and contemporary infinity glass create a dramatic architectural retreat amid the Sahyadri mist and cascading monsoons.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
  {
    id: 3,
    title: 'The Alibaug Private Villa Guide: Secluded Shores & Secret Jetties',
    category: 'Coastal Living',
    readTime: '4 min read',
    date: 'Nov 06, 2026',
    excerpt:
      'From private speedboats at Gateway of India to secluded beachfront coconut groves, here is how to master the art of the coastal weekend getaway in complete seclusion.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
  {
    id: 4,
    title: 'Monsoon Getaways: Best Temperature-Controlled Infinity Pools in the Western Ghats',
    category: 'Travel Guide',
    readTime: '7 min read',
    date: 'Oct 30, 2026',
    excerpt:
      'When torrential Sahyadri clouds engulf the cliffs, there is no greater privilege than floating in a heated private infinity pool overlooking 1,000-foot waterfalls.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
  {
    id: 5,
    title: 'The Architecture of Seclusion: Inside Karjat’s Raw Basalt Mansions',
    category: 'Architecture Spotlight',
    readTime: '5 min read',
    date: 'Oct 24, 2026',
    excerpt:
      'Discover private 10-acre compounds carved from native volcanic rock, expansive courtyards, and floor-to-ceiling glass pavilions that frame private lakes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
  {
    id: 6,
    title: 'Udaipur Unveiled: Renting Private Heritage Palaces for Family Celebrations',
    category: 'Regal Escapes',
    readTime: '8 min read',
    date: 'Oct 18, 2026',
    excerpt:
      'Step beyond conventional heritage hotels. Experience royal jharokhas, personal sitar musicians, and private fireworks displays reflected in the serene waters of Lake Pichola.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    href: '#',
  },
];

const categories = [
  'All Stories',
  'Epicurean Journeys',
  'Architecture Spotlight',
  'Coastal Living',
  'Travel Guides',
];

export default function BlogHubPage() {
  return (
    <div className="w-full bg-brand-light text-foreground pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── EDITORIAL HEADER ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold-main" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
              The Luxe Journal &bull; Editorial Hub
            </span>
            <span className="w-8 h-[1px] bg-gold-main" />
          </div>

          <h1 className="heading-xl text-foreground tracking-tight mb-4">
            The Luxe Journal
          </h1>

          <p className="font-sans text-base sm:text-lg text-gray-700 font-light leading-relaxed">
            Curated architectural explorations, private chef culinary notes, and insider guides to India’s most breathtaking private pool retreats.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 font-medium cursor-pointer ${
                  idx === 0
                    ? 'bg-foreground text-white shadow-sm'
                    : 'bg-white border border-border-luxury text-gray-700 hover:border-gold-main hover:text-gold-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ─── 3-COLUMN EDITORIAL ARTICLE CARDS GRID ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <RevealOnScroll key={article.id} yOffset={30} duration={1000}>
              <article className="group flex flex-col bg-transparent">
                
                {/* Immersive Large Cover Image */}
                <Link
                  href={article.href}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl mb-5 block border border-black/5"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle inner overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </Link>

                {/* Article Meta: Category & Date */}
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-2.5">
                  <span className="text-gold-dark font-semibold">{article.category}</span>
                  <span>&bull;</span>
                  <span>{article.date}</span>
                  <span>&bull;</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Article Serif Title */}
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-snug group-hover:text-gold-dark transition-colors mb-3">
                  <Link href={article.href}>
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="font-sans text-sm text-gray-700 leading-relaxed font-light mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Dummy Link: Read Article -> */}
                <div className="mt-auto pt-2">
                  <Link
                    href={article.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark group-hover:text-gold-main uppercase tracking-wider transition-colors"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform group-hover:translate-x-1.5">&rarr;</span>
                  </Link>
                </div>

              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* ─── BOTTOM EDITORIAL NEWSLETTER CTA ─────────────────────────────── */}
        <RevealOnScroll yOffset={30} duration={1000}>
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-brand-cream-warm border border-border-luxury text-center max-w-3xl mx-auto shadow-sm">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-2">
              The Weekly Digest
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
              Stories from Maharashtra’s Most Secluded Estates
            </h3>
            <p className="font-sans text-sm text-gray-700 font-light max-w-xl mx-auto mb-6">
              Subscribe to receive confidential invitations to new villa unveilings, private chef recipes, and insider weekend itineraries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your personal email"
                className="w-full px-5 py-3 rounded-xl bg-white border border-border-luxury text-foreground placeholder-gray-400 text-sm focus:outline-none focus:border-gold-main"
              />
              <button
                type="button"
                className="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
