import React from 'react';
import ContactForm from '@/components/sections/contact/ContactForm';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const metadata = {
  title: 'Contact Us | Wandernest Villas — Private Villa Concierge Mumbai',
  description:
    'Contact the Wandernest Villas concierge desk in BKC Mumbai. Direct telephone, email, and private villa reservation inquiries for Lonavla, Alibaug, Karjat & Goa estates.',
  keywords: [
    'Wandernest Villas contact',
    'luxury villa booking Mumbai',
    'BKC luxury concierge',
    'Lonavla villa booking telephone',
    'Alibaug private estate office',
    'private pool villa rental enquiry',
  ],
  openGraph: {
    title: 'Contact Us | Wandernest Villas Concierge',
    description:
      'Connect with our private villa curators. 24/7 reservation desk for Mumbai, Lonavla, Alibaug, and Goa.',
    url: 'https://www.wandernestvillas.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="w-full bg-brand-dark text-white pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── 2-COLUMN LUXURY CONTACT LAYOUT ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Local SEO Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-light">
                Direct Private Access
              </span>
            </div>

            {/* Serif Heading */}
            <h1 className="heading-xl text-white tracking-tight mb-5">
              Connect with Our <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-main to-gold-dark">
                Concierge Desk
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10">
              Whether curating an intimate anniversary getaway in Lonavla, a beachfront family gathering in Alibaug, or a corporate leadership retreat, our dedicated private curators are at your service 24/7.
            </p>

            {/* Contact Details List */}
            <div className="space-y-8 border-t border-white/10 pt-8">

              {/* 1. Mumbai Headquarters (Local SEO) */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-main">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    Mumbai Headquarters
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    Level 14, Platina Tower, C-59, G Block,<br />
                    Bandra Kurla Complex (BKC), Bandra East,<br />
                    Mumbai, Maharashtra 400051
                  </p>
                </div>
              </div>

              {/* 2. Direct Telephones & 24/7 Hotline */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-main">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    Telephone &amp; Hotline
                  </h3>
                  <p className="text-sm text-gold-light font-medium">
                    +91 (022) 6890 4500 <span className="text-white/40 font-light">&bull; BKC Office</span>
                  </p>
                  <p className="text-sm text-gold-light font-medium mt-0.5">
                    +91 98200 92837 <span className="text-white/40 font-light">&bull; 24/7 Butler &amp; Reservations</span>
                  </p>
                </div>
              </div>

              {/* 3. Direct Emails */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-main">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    Confidential Correspondence
                  </h3>
                  <p className="text-sm text-white/80 font-light">
                    concierge@wandernestvillas.com
                  </p>
                  <p className="text-sm text-white/80 font-light mt-0.5">
                    reservations@wandernestvillas.com
                  </p>
                </div>
              </div>

              {/* 4. Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-main">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    Availability &amp; Butler Dispatch
                  </h3>
                  <p className="text-sm text-white/70 font-light">
                    24 Hours / 7 Days a Week &bull; Round-the-clock bespoke operations across Maharashtra.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Sleek Dark Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll yOffset={30} duration={1000}>
              <ContactForm />
            </RevealOnScroll>
          </div>

        </div>

      </div>
    </div>
  );
}
