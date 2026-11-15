import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-brand-light">
      <RevealOnScroll yOffset={30} duration={1200}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 border-b border-gray-800 pb-12 mb-8">

          {/* Column 1 — Custom */}
          <div>
            <h3 className="font-serif text-gold-main text-base font-semibold mb-5">Custom</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Custom navigation</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Reet Villas</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Privacy Policy</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">SOW compliant billing</Link></li>
            </ul>
          </div>

          {/* Column 2 — Our Villas */}
          <div>
            <h3 className="font-serif text-gold-main text-base font-semibold mb-5">Our Villas</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Our Villas</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Destinations</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Privacy Policy</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Offerings</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">List with Us</Link></li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="font-serif text-gold-main text-base font-semibold mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">About Us</Link></li>
              <li><Link href="/blog" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">The Luxe Journal</Link></li>
              <li><Link href="/contact" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Contact Concierge</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-gold-main transition-colors leading-relaxed">Careers</Link></li>
            </ul>
          </div>

          {/* Column 4 — SOW compliant billing */}
          <div>
            <h3 className="font-serif text-white text-base font-semibold mb-5">SOW compliant billing</h3>
            <p className="text-xs text-gray-500 mb-5 font-sans leading-relaxed">Comprehensive estate reservations</p>
            <button
              type="button"
              suppressHydrationWarning
              className="btn-primary w-full py-3 rounded-xl text-sm font-bold"
            >
              Exclusive membership
            </button>
            <p className="text-[10px] text-gray-600 text-center mt-2 italic font-sans">our exclusive membership links</p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-gray-600">Copyright © 2026 Wandernest Villas, Inc. LTD. All rights reserved.</p>
          <div className="flex items-center gap-4">

            {/* Facebook */}
            <span className="text-gray-500 hover:text-gold-main cursor-pointer transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </span>

            {/* X / Twitter */}
            <span className="text-gray-500 hover:text-gold-main cursor-pointer transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </span>

            {/* Instagram */}
            <span className="text-gray-500 hover:text-gold-main cursor-pointer transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </span>

          </div>
        </div>

      </div>
    </RevealOnScroll>
  </footer>
  );
}
