'use client';

import React from 'react';

/**
 * AdminButton Component
 * Reusable button for LuxeEstate Admin Dashboard.
 * Variants: primary (Gold gradient), secondary (Dark elevated), outline (Gold border)
 */
export default function AdminButton({
  children,
  variant = 'primary',
  className = '',
  icon = null,
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-gradient-to-r from-gold-light via-gold-main to-gold-dark text-black font-bold shadow-lg hover:brightness-110 shadow-gold-main/20',
    secondary:
      'bg-[#1e2337] hover:bg-[#252b44] text-white border border-white/10 hover:border-white/20',
    outline:
      'bg-transparent border border-gold-main/50 text-gold-light hover:bg-gold-main hover:text-black',
    danger:
      'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="ml-2 flex items-center">{icon}</span>}
    </button>
  );
}
