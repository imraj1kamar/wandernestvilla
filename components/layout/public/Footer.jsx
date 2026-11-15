import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Footer() {
  return (
    <footer className="bg-black text-brand-light">
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
            <p className="font-sans text-xs text-gray-500">Copyright © 2026 Wandernest Villas, Inc. LTD. All rights reserved.</p>
            <div className="flex items-center gap-2.5">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/wandernestvillas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wandernest Villas on Instagram"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-main hover:border-gold-main/40 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/wandernestvillas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wandernest Villas on Facebook"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-main hover:border-gold-main/40 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/wandernestvillas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wandernest Villas on LinkedIn"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-main hover:border-gold-main/40 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/wandernestvilla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wandernest Villas on X (Twitter)"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-main hover:border-gold-main/40 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/9198++++++++?text=Hello%20Wandernest%20Villas%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20villa%20bookings."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Wandernest Concierge on WhatsApp"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-whatsapp hover:border-whatsapp/40 hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29" />
                </svg>
              </a>

            </div>
          </div>

        </div>
      </RevealOnScroll>
    </footer>
  );
}
