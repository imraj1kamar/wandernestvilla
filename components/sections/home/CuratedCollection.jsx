import Image from 'next/image';
import Link from 'next/link';

const villas = [
  {
    id: 1,
    title: 'The Glasshouse, Goa',
    // 4 gold stars, 1 gray star to match the exact image
    stars: (
      <>
        <span className="text-gold-main">★★★★</span>
        <span className="text-gray-300">★</span>
      </>
    ),
    specs: '5 BHK • Pool, Caretaker, Chef',
    price: '₹45,000',
    period: '/night',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Casa de Sol, Alibaug',
    stars: null,
    specs: '4 BHK • Beachfront, Jacuzzi',
    price: '₹38,000',
    period: '/night',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Marigold Estate, Udaipur',
    stars: null,
    specs: '6 BHK • Lake view, Palace Architecture',
    price: '₹55,000',
    period: '/night',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CuratedCollection() {
  return (
    <section className="w-full bg-brand-light py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-1 tracking-tight">
            Curated Collection
          </h2>
          <p className="text-sm text-muted font-sans">Handpicked for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {villas.map((villa, index) => (
            <div
              key={villa.id}
              className={`group bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative pb-1.5 animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="relative h-48 md:h-52 w-full overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-base font-bold text-foreground leading-snug">
                    {villa.title}
                  </h3>
                  {villa.stars && (
                    <div className="flex text-xs translate-y-[1px]">
                      {villa.stars}
                    </div>
                  )}
                </div>

                <p className="text-[13px] text-muted font-sans mb-5">
                  • {villa.specs}
                </p>

                <div className="flex-grow" />

                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-foreground text-base">
                    {villa.price}
                    <span className="font-normal text-[13px] text-muted">{villa.period}</span>
                  </span>
                  <Link
                    href={`/villas/${villa.id}`}
                    className="text-[13px] font-medium text-gold-dark hover:text-gold-main transition-colors font-sans underline underline-offset-4 decoration-gold-dark/40 hover:decoration-gold-main"
                  >
                    Explore Villa
                  </Link>
                </div>
              </div>

              {/* Absolute positioned gradient border at the very bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-light via-gold-main to-gold-dark" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}