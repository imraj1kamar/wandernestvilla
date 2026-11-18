'use client';

import React from 'react';

/**
 * AdminInput Component
 * Reusable text/date/search input field with dark luxury aesthetic.
 */
export default function AdminInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className = '',
  iconRight = null,
  iconLeft = null,
  required = false,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
            {iconLeft}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-[#1e2337] border border-white/10 rounded-xl py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-main/70 focus:ring-1 focus:ring-gold-main/30 transition-all font-sans ${
            iconLeft ? 'pl-10' : 'pl-3.5'
          } ${iconRight ? 'pr-10' : 'pr-3.5'} ${className}`}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
            {iconRight}
          </div>
        )}
      </div>
    </div>
  );
}
