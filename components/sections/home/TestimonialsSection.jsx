'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const initialTestimonials = [
  {
    id: 1,
    type: 'review',
    rating: 5,
    quote:
      'Wandernest elevated our weekend in Lonavla to perfection. The infinity pool over Tiger Point and our private chef’s mutton biryani were world-class.',
    author: 'Ronid Niada',
    stay: 'Stayed at The Cloud Retreat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    type: 'press',
    subtitle: 'National Press Acclaim',
    title: 'Top Newspaper',
    quote:
      'Voted Maharashtra’s leading private pool villa collection for privacy, gourmet cuisine, and bespoke service.',
  },
  {
    id: 3,
    type: 'review',
    rating: 5,
    quote:
      'Direct beach access in Alibaug, prompt speedboat transfers, and absolute privacy. There is simply no other brand operating at this hospitality benchmark.',
    author: 'Ihaiu Shohan',
    stay: 'Stayed at Oceanic Whisper',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    type: 'review',
    rating: 5,
    quote:
      'The Karjat royal estate felt like our private fortress. 6 BHK with expansive lake views and a dedicated butler team that anticipated every wish.',
    author: 'Aaditya Singhania',
    stay: 'Stayed at Heritage Estate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
];

const pressBrands = [
  { name: 'Booldest', style: 'font-serif font-bold text-xl md:text-2xl text-foreground tracking-tight' },
  { name: 'News', style: 'font-serif italic font-medium text-xl md:text-2xl text-foreground' },
  { name: 'Sontawoon', style: 'font-sans font-bold text-base md:text-lg text-foreground tracking-wide' },
  { name: 'Dynamic search analytics', style: 'font-sans text-xs md:text-sm text-gray-700 font-medium tracking-tight' },
  { name: 'Architectural Digest', style: 'font-serif font-semibold text-lg md:text-xl text-foreground tracking-tight' },
];

export default function TestimonialsSection() {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Form states for inline user review & ratings
  const [formData, setFormData] = useState({
    author: '',
    stay: '',
    quote: '',
    rating: 5,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      return () => current.removeEventListener('scroll', checkScroll);
    }
  }, [testimonials]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!formData.author.trim() || !formData.quote.trim()) {
      setErrorMsg('Please provide your name and your review comments.');
      return;
    }

    const newReview = {
      id: Date.now(),
      type: 'review',
      rating: formData.rating,
      quote: formData.quote.trim(),
      author: formData.author.trim(),
      stay: formData.stay.trim() ? `Stayed at ${formData.stay.trim()}` : 'Verified Villa Patron',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };

    // Prepend new review to the slider list
    setTestimonials((prev) => [newReview, ...prev]);
    setIsSubmitted(true);
    setErrorMsg('');

    // Reset form
    setFormData({
      author: '',
      stay: '',
      quote: '',
      rating: 5,
    });

    // Auto scroll slider to the newly created review
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);

    // Auto hide success badge after 6 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  return (
    <section className="w-full bg-brand-light py-12 md:py-16 lg:py-20 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-gold-main" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Guest Endorsements
              </span>
            </div>
            <h2 className="heading-lg text-foreground tracking-tight">
              Testimonials / Trust
            </h2>
            <p className="text-gray-700 text-sm font-light mt-1">
              Unfiltered impressions from verified villa patrons.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll('prev')}
              disabled={!canScrollLeft}
              aria-label="Previous Testimonial"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-black/20 text-foreground hover:border-gold-main hover:bg-gold-main hover:text-black shadow-sm cursor-pointer'
                  : 'border-black/5 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scroll('next')}
              disabled={!canScrollRight}
              aria-label="Next Testimonial"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-black/20 text-foreground hover:border-gold-main hover:bg-gold-main hover:text-black shadow-sm cursor-pointer'
                  : 'border-black/5 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slider Horizontal Container */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
        >
          {testimonials.map((item) => {
            if (item.type === 'press') {
              return (
                <div
                  key={item.id}
                  className="bg-brand-cream-warm rounded-2xl p-8 md:p-10 w-[300px] sm:w-[360px] md:w-[420px] flex-none snap-start flex flex-col items-center justify-center text-center shadow-sm border border-border-luxury relative overflow-hidden"
                >
                  <span className="text-[11px] uppercase tracking-widest text-gold-dark font-bold mb-2">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-none mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-700 font-light max-w-xs">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="w-16 h-0.5 bg-gold-main/60 mt-5" />
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="bg-brand-cream-warm rounded-2xl p-6 md:p-8 w-[300px] sm:w-[340px] md:w-[380px] flex-none snap-start flex flex-col justify-between shadow-sm border border-border-luxury"
              >
                <div>
                  <div className="flex text-gold-main text-sm mb-4">
                    {'★'.repeat(item.rating)}
                  </div>
                  <p className="font-sans text-sm md:text-base text-foreground leading-relaxed font-light mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border-luxury">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200 border-2 border-white shadow-xs">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-foreground">{item.author}</p>
                    <p className="text-xs text-gray-600">{item.stay}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── INLINE FORM: SHARE YOUR PATRON EXPERIENCE ──────────────────────── */}
        <div className="mt-14 p-6 sm:p-8 md:p-10 rounded-3xl bg-brand-cream-warm border border-border-luxury shadow-sm relative overflow-hidden">
          {/* Subtle Top Gold Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-main to-transparent" />

          <div className="max-w-4xl mx-auto">
            {/* Header of Form */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-dark font-bold block mb-1">
                  Patron Community
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Share Your Villa Experience
                </h3>
                <p className="text-sm text-gray-700 font-light mt-1">
                  Rate your stay, the hospitality of our private chefs, and your overall estate experience.
                </p>
              </div>

              {/* Star Rating Selector */}
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-xs text-gray-700 font-medium mb-1.5 uppercase tracking-wider">
                  Your Overall Rating: <span className="text-gold-dark font-bold font-serif">{formData.rating} / 5</span>
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <span
                        className={
                          (hoverRating || formData.rating) >= star
                            ? 'text-gold-main'
                            : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Success notification banner */}
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-3 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>
                  <strong>Thank you!</strong> Your rating &amp; testimonial have been added to the slider above.
                </span>
              </div>
            )}

            {/* Error banner */}
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                {errorMsg}
              </div>
            )}

            {/* Input Fields Grid */}
            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="e.g. Rohini Deshmukh"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-border-luxury text-foreground placeholder-gray-400 text-sm focus:outline-none focus:border-gold-main focus:ring-1 focus:ring-gold-main transition-colors shadow-2xs"
                  />
                </div>

                {/* 2. Villa / Destination Stayed */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Villa or Destination
                  </label>
                  <input
                    type="text"
                    name="stay"
                    value={formData.stay}
                    onChange={handleInputChange}
                    placeholder="e.g. The Cloud Retreat, Lonavla"
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-border-luxury text-foreground placeholder-gray-400 text-sm focus:outline-none focus:border-gold-main focus:ring-1 focus:ring-gold-main transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* 3. Review Comments Textarea */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  Your Review &amp; Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="quote"
                  rows={3}
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Tell us about the private pool, culinary experience, views, and concierge hospitality during your stay..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border border-border-luxury text-foreground placeholder-gray-400 text-sm focus:outline-none focus:border-gold-main focus:ring-1 focus:ring-gold-main transition-colors resize-none shadow-2xs"
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  Verified patron reviews help our community discover exceptional private stays.
                </p>
                <button
                  type="submit"
                  suppressHydrationWarning
                  className="btn-primary w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Brand Names Press Strip */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-10 pt-12 mt-12 border-t border-gray-200/80">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-500">
            As seen on
          </span>
          {pressBrands.map((press) => (
            <span key={press.name} className={press.style}>
              {press.name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
