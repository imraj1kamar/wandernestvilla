import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'Architecture Spotlight',
    readTime: '5 min read',
    date: 'Nov 12, 2026',
    title: "A Weekend in Lonavla's Royal Mansions: Heritage Above the Clouds",
    excerpt:
      'Explore how colonial basalt masonry and contemporary infinity glass create a dramatic architectural retreat amid the Sahyadri peaks.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    href: '/journal/weekend-in-lonavlas-royal-mansions',
  },
  {
    id: 2,
    category: 'Coastal Living',
    readTime: '4 min read',
    date: 'Nov 04, 2026',
    title: 'The Alibaug Private Villa Guide: Secluded Shores & Secret Jetties',
    excerpt:
      'From private speedboats at Gateway of India to secluded beachfront coconut groves, here is how to master the art of the coastal weekend getaway.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    href: '/journal/alibaug-private-villa-guide',
  },
  {
    id: 3,
    category: 'Epicurean Journeys',
    readTime: '6 min read',
    date: 'Oct 28, 2026',
    title: 'Feasts by the Pool: Inside Wandernest’s Private Chef Philosophy',
    excerpt:
      'How our in-house culinary artisans bridge ancient Konkani claypot recipes with Michelin-calibre presentation on your private terrace.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    href: '/journal/feasts-by-the-pool-chef-philosophy',
  },
];

export default function TravelJournal() {
  return (
    <section className="w-full bg-brand-light py-16 md:py-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                The Travel Journal
              </span>
            </div>
            <h2 className="heading-lg text-[#171717] tracking-tight">
              The Luxe Digest
            </h2>
            <p className="text-gray-700 text-sm md:text-base mt-1 font-light">
              Architectural explorations, epicurean guides, and insider weekend escapes.
            </p>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-gold-main transition-colors"
          >
            <span>View All Stories</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* 3 Editorial Magazine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer flex flex-col bg-transparent"
            >
              {/* Borderless Large High Quality Image */}
              <Link href={article.href} className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm mb-5 block">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </Link>

              {/* Meta Tag: Date & Category */}
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-2.5">
                <span className="text-gold-dark font-semibold">{article.category}</span>
                <span>&bull;</span>
                <span>{article.date}</span>
                <span>&bull;</span>
                <span>{article.readTime}</span>
              </div>

              {/* Serif Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] leading-snug group-hover:text-gold-dark transition-colors mb-3">
                <Link href={article.href}>
                  {article.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-700 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              {/* Read Story Link with Gold Underline on Hover */}
              <div className="mt-auto pt-2">
                <Link
                  href={article.href}
                  className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] uppercase tracking-wider group/link pb-1"
                >
                  <span className="group-hover:text-gold-dark transition-colors">Read Story</span>
                  <span className="transition-transform group-hover:translate-x-1.5 text-gold-main">&rarr;</span>
                  
                  {/* Gold Underline that appears on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-main transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
