'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealOnScroll
 * Ultra-smooth, luxury scroll-triggered fade-up motion.
 * Uses gentle distance and a soft decelerating curve for a calm, comfortable feel.
 */
export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  duration = 1200,
  yOffset = 30,
  once = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Viewport position check
    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Triggers gently as soon as top enters 40px into the viewport
      if (rect.top <= viewportHeight - 40 && rect.bottom >= 0) {
        setIsVisible(true);
        if (once) {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
          if (observer) observer.disconnect();
        }
      } else if (!once && rect.top > viewportHeight) {
        setIsVisible(false);
      }
    };

    // Passive scroll listener with requestAnimationFrame throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // IntersectionObserver (primary trigger)
    let observer = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once) {
                observer.unobserve(entry.target);
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
              }
            } else if (!once) {
              setIsVisible(false);
            }
          });
        },
        {
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.02,
        }
      );

      observer.observe(el);
    }

    // Attach scroll and resize listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check on mount
    const timer = setTimeout(() => {
      checkVisibility();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
        opacity: isVisible ? 1 : 0,
      }}
      className={`w-full will-change-[opacity,transform] ${
        isVisible ? '' : 'pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}
