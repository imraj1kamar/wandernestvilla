'use client';

import React from 'react';

/**
 * AdminSelect Component
 * Reusable dark luxury select dropdown for LuxeEstate Admin.
 */
export default function AdminSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  className = '',
  required = false,
  children,
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
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full appearance-none bg-[#1e2337] border border-white/10 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-gold-main/70 focus:ring-1 focus:ring-gold-main/30 transition-all font-sans cursor-pointer ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#1e2337] text-gray-400">
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value ?? opt}
                  value={opt.value ?? opt}
                  className="bg-[#1e2337] text-white py-1.5"
                >
                  {opt.label ?? opt}
                </option>
              ))
            : children}
        </select>
        {/* Custom Chevron Down SVG */}
        <div className="absolute right-3.5 text-gray-400 pointer-events-none flex items-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
