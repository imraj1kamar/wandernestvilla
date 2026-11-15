'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Lonavla',
    guests: '4-6 Guests',
    dates: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API reservation dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Lonavla',
        guests: '4-6 Guests',
        dates: '',
        message: '',
      });
    }, 700);
  };

  return (
    <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
      {/* Top Gold Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-main to-transparent" />

      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-gold-light font-bold block mb-1">
          Confidential Enquiry
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Request a Private Stay
        </h3>
        <p className="text-sm text-white/70 font-light mt-1">
          Our private villa curators will respond with tailored options within 2 hours.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-white/5 border border-gold-main/40 text-center animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-gold-main/20 border border-gold-main text-gold-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h4 className="font-serif text-2xl font-bold text-white mb-2">Enquiry Received</h4>
          <p className="font-sans text-sm text-white/80 font-light leading-relaxed mb-6">
            Thank you for reaching out. A dedicated lifestyle curator has been assigned to your reservation request and will contact you directly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-outline text-xs px-6 py-2.5 rounded-xl font-semibold"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vikramaditya Singhania"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-main focus:bg-white/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Personal Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vikram@singhania.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-main focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Contact Number & Preferred Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Contact Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98200 00000"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-main focus:bg-white/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Preferred Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#1e2235] border border-white/15 text-white text-sm focus:outline-none focus:border-gold-main transition-colors"
              >
                <option value="Lonavla">Lonavla &amp; Khandala</option>
                <option value="Alibaug">Alibaug Beachfront</option>
                <option value="Karjat">Karjat &amp; Pawna Lake</option>
                <option value="Goa">Goa Coastal Estates</option>
                <option value="Udaipur">Udaipur Royal Mansions</option>
                <option value="Kasauli">Kasauli Hill Retreats</option>
              </select>
            </div>
          </div>

          {/* Row 3: Estimated Dates & Number of Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Estimated Travel Dates
              </label>
              <input
                type="text"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                placeholder="e.g. 18 Dec - 21 Dec, 2026"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-main focus:bg-white/10 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
                Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#1e2235] border border-white/15 text-white text-sm focus:outline-none focus:border-gold-main transition-colors"
              >
                <option value="2-4 Guests">2–4 Guests (Intimate Stay)</option>
                <option value="5-8 Guests">5–8 Guests (Family Holiday)</option>
                <option value="9-15 Guests">9–15 Guests (Celebration)</option>
                <option value="16+ Guests">16+ Guests (Grand Gathering)</option>
              </select>
            </div>
          </div>

          {/* Message / Special Requests */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gold-light mb-1.5">
              Special Requests &amp; Dietary Preferences
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about private chef preferences, heated pool requirements, speedboat transfers, or event celebration plans..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-main focus:bg-white/10 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching to Concierge...</span>
                </>
              ) : (
                <>
                  <span>Send Private Enquiry</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
            <p className="font-sans text-[11px] text-white/50 text-center mt-3 font-light">
              All communications are protected under strict non-disclosure and privacy protocols.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
